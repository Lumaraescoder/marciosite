import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST - Cria uma nova ordem PayPal
 */
export async function POST(request) {
  try {
    const { amount, bookingData } = await request.json();

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const environment = process.env.PAYPAL_ENVIRONMENT || "sandbox";

    console.log("Environment:", environment);
    console.log("Client ID exists:", !!clientId);
    console.log("Client Secret exists:", !!clientSecret);

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: "PayPal credentials not configured" },
        { status: 500 }
      );
    }

    const baseUrl =
      environment === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    // Obtém o access token
    const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    });

    const tokenRaw = await tokenRes.text();
    console.log("PayPal token response body:", tokenRaw);

    if (!tokenRes.ok) {
      throw new Error(`PayPal token error: ${tokenRes.status} ${tokenRaw}`);
    }

    const { access_token } = JSON.parse(tokenRaw);
    const amountValue = (amount / 100).toFixed(2);

    // Cria a ordem
    const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: `booking_${Date.now()}`,
            custom_id: `booking_${Date.now()}`,
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
            description: `Tour: ${bookingData.tourTitle}`,
          },
        ],
        application_context: {
          brand_name: "KM Hills Adventures",
          locale: "pt-BR",
          user_action: "PAY_NOW",
        },
      }),
      cache: "no-store",
    });

    const orderRaw = await orderRes.text();
    console.log("PayPal create order response body:", orderRaw);

    if (!orderRes.ok) {
      throw new Error(`PayPal create order failed: ${orderRes.status} ${orderRaw}`);
    }

    const data = JSON.parse(orderRaw);
    const approveLink = data.links?.find((l) => l.rel === "approve")?.href;

    return NextResponse.json({
      success: true,
      orderId: data.id,
      status: data.status,
      approveLink,
    });
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
 * PUT - Captura uma ordem PayPal já aprovada
 */
export async function PUT(request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const environment = process.env.PAYPAL_ENVIRONMENT || "sandbox";

    console.log("Environment:", environment);
    console.log("Client ID exists:", !!clientId);
    console.log("Client Secret exists:", !!clientSecret);

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: "PayPal credentials not configured" },
        { status: 500 }
      );
    }

    const baseUrl =
      environment === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    // Obtém o access token
    const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    });

    const tokenRaw = await tokenRes.text();
    console.log("PayPal token response body:", tokenRaw);

    if (!tokenRes.ok) {
      throw new Error(`PayPal token error: ${tokenRes.status} ${tokenRaw}`);
    }

    const { access_token } = JSON.parse(tokenRaw);

    // Captura a ordem
    const captureRes = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const captureRaw = await captureRes.text();
    console.log("PayPal capture response body:", captureRaw);

    if (!captureRes.ok) {
      throw new Error(`PayPal capture failed: ${captureRes.status} ${captureRaw}`);
    }

    const data = JSON.parse(captureRaw);
    const capture = data.purchase_units?.[0]?.payments?.captures?.[0];

    if (data.status === "COMPLETED") {
      return NextResponse.json({
        success: true,
        status: data.status,
        transactionId: capture?.id,
        amount: capture?.amount,
      });
    }

    if (data.status === "APPROVED") {
      return NextResponse.json(
        { error: "Order approved but not captured", status: data.status },
        { status: 202 }
      );
    }

    return NextResponse.json(
      { error: "Order capture failed", status: data.status },
      { status: 400 }
    );
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
  try {
    const orderId = new URL(request.url).searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const environment = process.env.PAYPAL_ENVIRONMENT || "sandbox";

    console.log("Environment:", environment);
    console.log("Client ID exists:", !!clientId);
    console.log("Client Secret exists:", !!clientSecret);

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: "PayPal credentials not configured" },
        { status: 500 }
      );
    }

    const baseUrl =
      environment === "live"
        ? "https://api-m.paypal.com"
        : "https://api-m.sandbox.paypal.com";

    // Obtém o access token
    const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      cache: "no-store",
    });

    const tokenRaw = await tokenRes.text();
    console.log("PayPal token response body:", tokenRaw);

    if (!tokenRes.ok) {
      throw new Error(`PayPal token error: ${tokenRes.status} ${tokenRaw}`);
    }

    const { access_token } = JSON.parse(tokenRaw);

    // Consulta a ordem
    const orderRes = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    });

    const orderRaw = await orderRes.text();
    console.log("PayPal get order response body:", orderRaw);

    if (!orderRes.ok) {
      throw new Error(`PayPal get order failed: ${orderRes.status} ${orderRaw}`);
    }

    const data = JSON.parse(orderRaw);

    return NextResponse.json({
      success: true,
      orderId: data.id,
      status: data.status,
      amount: data.purchase_units?.[0]?.amount,
    });
  } catch (error) {
    console.error("❌ Error fetching PayPal order:", error);
    return NextResponse.json(
      {
        error: "Error fetching PayPal order",
        details: error.message,
      },
      { status: 500 }
    );
  }
}