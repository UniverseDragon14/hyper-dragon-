# NOVA Kimi Brain Setup

This repository supports two server runtimes:

1. **Cloudflare Pages Functions** for `hyper.universaldragon.com`
2. **Node/Express** for local Raspberry Pi or another Node host

The browser never receives the Kimi API key.

## Cloudflare Pages

In Cloudflare Dashboard, open the Pages project connected to this repository.

Add these under **Settings → Variables and Secrets**:

| Name | Type | Value |
|---|---|---|
| `MOONSHOT_API_KEY` | Secret | Your Kimi API key |
| `KIMI_MODEL` | Variable | `kimi-k3` |
| `KIMI_BASE_URL` | Variable | `https://api.moonshot.ai/v1` |
| `KIMI_REASONING_EFFORT` | Variable | `max` |
| `NOVA_MAX_COMPLETION_TOKENS` | Variable | `1200` |

Then redeploy the branch. Cloudflare automatically deploys the files under `functions/api/` as `/api/*` routes.

Verify:

```bash
curl https://hyper.universaldragon.com/api/health
```

Expected shape:

```json
{
  "status": "ok",
  "brain_online": true,
  "ai_provider": "kimi",
  "model": "kimi-k3"
}
```

## Node / Raspberry Pi

```bash
cp .env.example .env
nano .env
npm install
npm run dev
```

Put the real key only in `.env`:

```dotenv
MOONSHOT_API_KEY=your_real_key_here
```

`.env` is ignored by Git and must never be pasted into issues, screenshots, frontend code, or chat logs.

## Guard Contract

```text
[GUARD] owner_approval = REQUIRED
[GUARD] dangerous_action = DENY
```

The Brain can explain and propose controlled actions. It must not silently execute dangerous or account-changing actions.
