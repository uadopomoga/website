export const prerender = false; // Important line!

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    console.log('=== API endpoint called ===');

    // Try multiple ways to access the environment variable
    const resendApiKey =
      import.meta.env.RESEND_API_KEY ||
      process.env.RESEND_API_KEY ||
      (locals as any)?.runtime?.env?.RESEND_API_KEY;

    console.log('Environment variable check:', {
      fromImportMeta: !!import.meta.env.RESEND_API_KEY,
      fromProcess: !!process.env.RESEND_API_KEY,
      fromLocals: !!(locals as any)?.runtime?.env?.RESEND_API_KEY,
      hasAnyKey: !!resendApiKey,
    });

    if (!resendApiKey) {
      console.error(
        'RESEND_API_KEY environment variable is not set in any location'
      );
      return new Response(
        JSON.stringify({
          message: `Email service not configured`,
          debug: 'RESEND_API_KEY not found in environment',
        }),
        {
          status: 500,
          statusText: 'Email service configuration error',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    console.log('API key found, initializing Resend...');

    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    console.log('Received data:', {
      name: name?.toString(),
      email: email?.toString(),
      message: message?.toString().substring(0, 50) + '...',
    });

    if (!name || !email || !message) {
      console.log('Missing required fields');
      return new Response(
        JSON.stringify({
          message: `Fill out all fields.`,
        }),
        {
          status: 400,
          statusText: 'Did not provide the right data',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const sendResend = await resend.emails.send({
      from: 'contact@dev.uadopomoga.com.ua', // Using the verified domain
      to: 'denisrondalev@gmail.com',
      subject: `Guest ${name} from UAdopomoga`,
      html: `
        <h2>New message from UAdopomoga</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log('Resend response:', {
      success: !!sendResend.data,
      id: sendResend.data?.id,
      error: sendResend.error,
    });

    // If the message was sent successfully, return a 200 response
    if (sendResend.data) {
      console.log('Email sent successfully');
      return new Response(
        JSON.stringify({
          message: `Message successfully sent!`,
        }),
        {
          status: 200,
          statusText: 'OK',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } else {
      console.log('Email send failed:', sendResend.error);
      console.error(
        'Resend error details:',
        JSON.stringify(sendResend.error, null, 2)
      );

      return new Response(
        JSON.stringify({
          message: `Message received! We'll get back to you soon.`,
          note: 'Email delivery issue logged for admin review',
        }),
        {
          status: 200,
          statusText: 'OK',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('Unhandled error in API endpoint:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return new Response(
      JSON.stringify({
        message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        debug: process.env.NODE_ENV === 'development' ? error : undefined,
      }),
      {
        status: 500,
        statusText: 'Internal Server Error',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
