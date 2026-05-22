import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.formData();
    const name = body.get('name');
    const email = body.get('email');
    const company = body.get('company');
    const phone = body.get('phone');
    const product = body.get('product');
    const quantity = body.get('quantity');
    const message = body.get('message');

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // In production, integrate with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'noreply@focal-trading.com.hk',
    //   to: 'info@focal-trading.com.hk',
    //   subject: `New Inquiry from ${name}`,
    //   html: `...`
    // });

    console.log('Inquiry received:', { name, email, company, phone, product, quantity, message });

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