export const prerender = false; // Important line!

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('API endpoint called');

    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    console.log('Received data:', { name, email, message });

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
      from: 'support@resend.dev',
      to: 'o.u.prihodko@gmail.com',
      subject: `Sumbission from ${name}`,
      html: `<p>Hi ${name},</p><p>Your message was received.</p>`,
    });

    console.log('Resend response:', sendResend);

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
      // If there was an error sending the message, return a 500 response
      return new Response(
        JSON.stringify({
          message: `Message failed to send: ${sendResend.error}`,
        }),
        {
          status: 500,
          statusText: `Internal Server Error: ${sendResend.error}`,
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
