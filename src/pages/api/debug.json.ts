export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const resendApiKey =
    import.meta.env.RESEND_API_KEY ||
    process.env.RESEND_API_KEY ||
    (locals as any)?.runtime?.env?.RESEND_API_KEY;

  return new Response(
    JSON.stringify({
      importMeta: {
        hasKey: !!import.meta.env.RESEND_API_KEY,
        keyPrefix: import.meta.env.RESEND_API_KEY
          ? import.meta.env.RESEND_API_KEY.substring(0, 5) + '...'
          : 'NOT_SET',
        mode: import.meta.env.MODE || 'unknown',
      },
      processEnv: {
        hasKey: !!process.env.RESEND_API_KEY,
        keyPrefix: process.env.RESEND_API_KEY
          ? process.env.RESEND_API_KEY.substring(0, 5) + '...'
          : 'NOT_SET',
      },
      cloudflareEnv: {
        hasKey: !!(locals as any)?.runtime?.env?.RESEND_API_KEY,
        keyPrefix: (locals as any)?.runtime?.env?.RESEND_API_KEY
          ? (locals as any)?.runtime?.env?.RESEND_API_KEY.substring(0, 5) +
            '...'
          : 'NOT_SET',
      },
      final: {
        hasAnyKey: !!resendApiKey,
        keyPrefix: resendApiKey
          ? resendApiKey.substring(0, 5) + '...'
          : 'NOT_SET',
      },
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
