type Env = {
  MOONSHOT_API_KEY?: string;
  KIMI_API_KEY?: string;
  KIMI_MODEL?: string;
};

export async function onRequestGet(context: any): Promise<Response> {
  const env: Env = context.env || {};
  const online = Boolean(env.MOONSHOT_API_KEY || env.KIMI_API_KEY);

  return new Response(JSON.stringify({
    status: "ok",
    brain_online: online,
    ai_provider: online ? "kimi" : "missing",
    model: online ? (env.KIMI_MODEL || "kimi-k3") : "none",
    runtime: "cloudflare-pages-functions",
    guard: {
      owner_approval: "REQUIRED",
      dangerous_action: "DENY",
    },
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
