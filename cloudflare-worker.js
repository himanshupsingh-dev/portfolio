// Himanshu Portfolio — Groq API Proxy Worker
// Deploy this to Cloudflare Workers (free tier)
// Add your Groq key as a secret: npx wrangler secret put GROQ_API_KEY

export default {
  async fetch(request, env) {

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(),
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders() });
    }

    try {
      const body = await request.json();

      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify(body),
      });

      // Stream the Groq response straight back to the browser
      return new Response(groqRes.body, {
        status: groqRes.status,
        headers: {
          'Content-Type': groqRes.headers.get('Content-Type') || 'text/event-stream',
          'Cache-Control': 'no-cache',
          ...corsHeaders(),
        },
      });

    } catch (err) {
      return new Response(
        JSON.stringify({ error: { message: err.message } }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders() } }
      );
    }
  },
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
