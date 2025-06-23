export const prerender = false; // Important line!

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  console.log('API endpoint called');

  const data = await request.formData();
  const name = data.get('name');
  const email = data.get('email');
  const message = data.get('message');

  console.log('Received data:', { name, email, message });

  // Making sure values are not empty

  if (!name || !email || !message) {
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
  } // Sending information to Resend

  const sendResend = await resend.emails.send({
    from: 'support@resend.dev',
    to: 'o.u.prihodko@gmail.com',
    subject: `Sumbission from ${name}`,
    html: `<p>Hi ${name},</p><p>Your message was received.</p>`,
  }); // If the message was sent successfully, return a 200 response

  if (sendResend.data) {
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
    ); // If there was an error sending the message, return a 500 response
  } else {
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
};
