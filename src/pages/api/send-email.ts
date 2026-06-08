import type { APIRoute } from 'astro';

// Using Resend service (free tier available)
// Sign up at: https://resend.com
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;
const FROM_EMAIL = import.meta.env.FROM_EMAIL || 'noreply@shravanboloor.com';

export const POST: APIRoute = async (context) => {
  try {
    // If no API key, still save to DB but don't send email
    if (!RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured - skipping email notification');
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Form saved to database (email not configured)',
        }),
        { status: 200 }
      );
    }

    const body = await context.request.json();
    const { to, subject, name, email, message, phone, company, purpose } = body;

    // Create email body
    const emailBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      <p><strong>Purpose:</strong> ${purpose || 'Not specified'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>This is an automated message from your portfolio contact form.</small></p>
    `;

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: to,
        subject: subject,
        html: emailBody,
        reply_to: email, // User can reply directly to the sender
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      // Don't fail the form submission if email fails
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Form saved (email failed but non-critical)',
        }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent and form saved',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    // Return success anyway - form was already saved to DB
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Form saved to database',
      }),
      { status: 200 }
    );
  }
};
