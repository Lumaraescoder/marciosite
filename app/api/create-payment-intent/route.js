import { NextResponse } from 'next/server';
import { stripe } from '../../lib/stripe';

export async function POST(request) {
 try {

  const { amount, bookingData } = await request.json();

  // Cria o Payment Intent REAL no Stripe
  const paymentIntent = await stripe.paymentIntents.create({
   amount: amount,
   currency: 'eur',
   automatic_payment_methods: {
    enabled: true,
   },
   metadata: {
    tourTitle: bookingData.tourTitle || 'No title',
    persons: bookingData.persons?.toString() || '1',
    date: bookingData.date || 'No date',
    time: bookingData.time || 'No time',
   },
  });


  return NextResponse.json({
   success: true,
   clientSecret: paymentIntent.client_secret,
   paymentIntentId: paymentIntent.id
  });

 } catch (error) {
  console.error('❌ Error creating payment intent:', error);
  return NextResponse.json(
   {
    error: 'Error creating payment intent',
    details: error.message
   },
   { status: 500 }
  );
 }
}

export async function GET() {
 return NextResponse.json({
  message: 'create-payment-intent API is working!',
  timestamp: new Date().toISOString()
 });
}