import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const name = body.get('name');
    const email = body.get('email');
    const company = body.get('company') || '';
    const phone = body.get('phone') || '';
    const product = body.get('product') || '';
    const quantity = body.get('quantity') || '';
    const message = body.get('message') || '';

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Honeypot field check — if filled, it's a bot
    const honeypot = body.get('__hp');
    if (honeypot) {
      // Silently accept but don't process — fool the bot
      return NextResponse.json({
        success: true,
        message: 'Thank you! We will reply within 24 hours.',
      });
    }

    console.log('Inquiry received:', { name, email, company, phone, product, quantity, message });

    // Send email via Resend if API key is configured
    if (resend && process.env.INQUIRY_EMAIL_TO) {
      try {
        await resend.emails.send({
          from: 'Focal Trading <noreply@focal-trading.com.hk>',
          to: process.env.INQUIRY_EMAIL_TO,
          subject: `[Website Inquiry] ${name} - ${product || 'General'}`,
          html: `
            <h2>New Inquiry from Website</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company</td><td style="padding: 8px; border: 1px solid #ddd;">${company}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Product</td><td style="padding: 8px; border: 1px solid #ddd;">${product}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Quantity</td><td style="padding: 8px; border: 1px solid #ddd;">${quantity}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td><td style="padding: 8px; border: 1px solid #ddd;">${message}</td></tr>
            </table>
          `,
          reply_to: email,
        });
      } catch (emailError) {
        console.error('Resend email error:', emailError);
        // Don't fail the request if email fails — log and continue
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will reply within 24 hours.',
    });
  } catch (error) {
    console.error('Inquiry error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}