import { NextResponse } from "next/server";

// Helper to obtain OAuth token and call PayPal REST API without SDK
async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const environment = process.env.PAYPAL_ENVIRONMENT || "sandbox";

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials not configured");
  }

  const base = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenUrl = environment === "live"
    ? "https://api-m.paypal.com/v1/oauth2/token"
    : "https://api-m.sandbox.paypal.com/v1/oauth2/token";

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${base}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PayPal token error: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token;
}

function paypalBaseUrl() {
  return (process.env.PAYPAL_ENVIRONMENT || "sandbox") === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

/**
 * POST - Cria uma nova ordem PayPal
 */
export async function POST(request) {
  try {
    const { amount, bookingData } = await request.json();
    const amountValue = (amount / 100).toFixed(2);

    const accessToken = await getPayPalAccessToken();
    const url = `${paypalBaseUrl()}/v2/checkout/orders`;

    const body = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `booking_${Date.now()}`,
          amount: {
            currency_code: "EUR",
            value: amountValue,
            breakdown: {
              item_total: { currency_code: "EUR", value: amountValue },
            },
          },
          items: [
            {
              name: bookingData.tourTitle || "Tour Booking",
              quantity: "1",
              unit_amount: { currency_code: "EUR", value: amountValue },
              description: `${bookingData.persons} person(s) - ${bookingData.date} at ${bookingData.time}`,
            },
          ],
          custom_id: JSON.stringify({
            tourTitle: bookingData.tourTitle,
            persons: bookingData.persons,
            date: bookingData.date,
            time: bookingData.time,
            tourImage: bookingData.tourImage,
          }),
          description: `Tour: ${bookingData.tourTitle}`,
        },
      ],
      application_context: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/booking-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/booking-pages?persons=${bookingData.persons}&hours=${bookingData.hours}&date=${encodeURIComponent(bookingData.date)}&time=${encodeURIComponent(bookingData.time)}&tourTitle=${encodeURIComponent(bookingData.tourTitle)}&tourImage=${encodeURIComponent(bookingData.tourImage)}`,
        brand_name: "ViaTour",
        locale: "pt-BR",
        user_action: "PAY_NOW",
      },
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`PayPal create order failed: ${res.status} ${text}`);
    }

    const data = await res.json();
    const orderId = data.id;
    const status = data.status;
    const approveLink = data.links?.find((l) => l.rel === "approve")?.href;

    return NextResponse.json({ success: true, orderId, status, approveLink });
  } catch (error) {
    console.error("❌ Error creating PayPal order:", error);
    return NextResponse.json(
      {
        error: "Error creating PayPal order",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * POST - Captura uma ordem PayPal já aprovada
 */
export async function PUT(request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const accessToken = await getPayPalAccessToken();
    const url = `${paypalBaseUrl()}/v2/checkout/orders/${orderId}/capture`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`PayPal capture failed: ${res.status} ${text}`);
    }

    const data = await res.json();
    const status = data.status;
    const purchaseUnits = data.purchase_units || [];

    if (status === "COMPLETED") {
      const capture = purchaseUnits[0]?.payments?.captures[0];
      return NextResponse.json({
        success: true,
        status,
        transactionId: capture?.id,
        amount: capture?.amount,
      });
    } else if (status === "APPROVED") {
      return NextResponse.json({ error: "Order approved but not captured", status }, { status: 202 });
    } else {
      return NextResponse.json({ error: "Order capture failed", status }, { status: 400 });
    }
  } catch (error) {
    console.error("❌ Error capturing PayPal order:", error);
    return NextResponse.json(
      {
        error: "Error capturing PayPal order",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET - Verifica o status de uma ordem
 */
export async function GET(request) {
  const searchParams = new URL(request.url).searchParams;
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      {
        error: "Order ID is required",
        message: "create-paypal-order API is working! (Provide ?orderId=... to check order status)",
      },
      { status: 400 }
    );
  }

  try {
    const accessToken = await getPayPalAccessToken();
    const url = `${paypalBaseUrl()}/v2/checkout/orders/${orderId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`PayPal get order failed: ${res.status} ${text}`);
    }

    const data = await res.json();
    const status = data.status;
    const purchaseUnits = data.purchase_units || [];

    return NextResponse.json({ success: true, orderId, status, amount: purchaseUnits[0]?.amount });
  } catch (error) {
    console.error("❌ Error fetching PayPal order:", error);
    return NextResponse.json(
      {
        error: "Error fetching order details",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
