export const prerender = false; // Important line!

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('API endpoint called');

    // Check if RESEND_API_KEY exists
    if (!import.meta.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY environment variable is not set');
      return new Response(
        JSON.stringify({
          message: `Email service not configured`,
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

    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    console.log('Received data:', {
      name: name?.toString(),
      email: email?.toString(),
      message: message?.toString().substring(0, 50) + '...',
    });

    // Making sure values are not empty

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

    console.log('Attempting to send email via Resend');

    // Sending information to Resend
    const sendResend = await resend.emails.send({
      from: 'dev.uadopomoga.com.ua',
      to: 'o.u.prihodko@gmail.com',
      subject: `New submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
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

      // Return success to user but log the error for debugging
      // In production, you might want to save to database or alternative logging
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
          status: 200, // Return 200 so user doesn't see error
          statusText: 'OK',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    console.error('Unhandled error in API endpoint:', error);
    return new Response(
      JSON.stringify({
        message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
