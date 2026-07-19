type Env = {
  UD_BRAIN_TOKEN?: string;
  UD_BRAIN_ENDPOINT?: string;
  UD_BRAIN_MODEL_ID?: string;
};

export async function onRequestGet(context: any): Promise<Response> {
  const env: Env = context.env || {};
  const online = Boolean(
    String(env.UD_BRAIN_TOKEN || "").trim() &&
    String(env.UD_BRAIN_ENDPOINT || "").trim() &&
    String(env.UD_BRAIN_MODEL_ID || "").trim(),
  );

  return new Response(JSON.stringify({
    status: "ok",
    system: "UNIVERSAL_DRAGON_ASLAM",
    creator: "ASLAM",
    intelligence: "EVE",
    brain: "EVE_NOVA",
    core: "NOVA_CORE",
    brain_online: online,
    adapter: online ? "PRIVATE_ADAPTER_READY" : "PRIVATE_ADAPTER_UNCONFIGURED",
    runtime: "UNIVERSAL_DRAGON_EDGE",
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
