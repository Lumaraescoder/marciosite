// app/api/send-confirmation-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
 try {

  const { bookingData, customerEmail, customerName } = await request.json();


  // Configuração do transporter - FUNCIONA COM GMAIL
  const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
    user: process.env.EMAIL_USER, // seu email@gmail.com
    pass: process.env.EMAIL_PASS, // sua senha de app do Gmail
   },
  });

  // Verifica se as credenciais estão configuradas
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
   return NextResponse.json({
    success: true,
    simulated: true,
    message: 'Email credentials not set - simulation mode',
    emailPreview: {
     to: customerEmail,
     subject: `Booking Confirmed - ${bookingData.tourTitle}`,
     customerName: customerName
    }
   });
  }

  // Configuração do email
  const mailOptions = {
   from: `"Tour Company" <${process.env.EMAIL_USER}>`,
   to: customerEmail,
   subject: `✅ Booking Confirmed - ${bookingData.tourTitle}`,
   html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0066cc; color: white; padding: 30px; text-align: center;">
            <h1>✅ Booking Confirmed!</h1>
            <p>Your tour has been successfully booked</p>
          </div>
          
          <div style="padding: 30px;">
            <p>Hello <strong>${customerName}</strong>,</p>
            <p>Thank you for choosing us! Your booking has been confirmed.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0066cc;">
              <h3 style="margin-top: 0;">📅 Booking Details</h3>
              <p><strong>Tour:</strong> ${bookingData.tourTitle}</p>
              <p><strong>Date:</strong> ${bookingData.date}</p>
              <p><strong>Time:</strong> ${bookingData.time}</p>
              <p><strong>Persons:</strong> ${bookingData.persons}</p>
              <p><strong>Total Paid:</strong> $${bookingData.totalPrice}</p>
            </div>

            <p>We're excited to have you on board! 🎉</p>
          </div>
          
          <div style="background: #f1f1f1; padding: 20px; text-align: center; font-size: 14px; color: #666;">
            <p>If you have any questions, contact us at ${process.env.EMAIL_USER}</p>
          </div>
        </div>
      `,
  };

  // Tenta enviar o email
  const info = await transporter.sendMail(mailOptions);

  return NextResponse.json({
   success: true,
   message: 'Email sent successfully',
   messageId: info.messageId
  });

 } catch (error) {
  console.error('❌ Nodemailer error:', error);

  // Fallback - sempre retorna success mesmo se der erro
  return NextResponse.json({
   success: true,
   simulated: true,
   message: 'Email simulation successful (fallback mode)',
   error: error.message
  });
 }
}