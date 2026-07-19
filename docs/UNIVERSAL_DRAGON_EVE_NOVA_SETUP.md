# Universal Dragon Aslam · EVE NOVA Brain Setup

## Identity hierarchy

```text
Universal Dragon Aslam
└── EVE Intelligence Layer
    └── NOVA Brain Core
        └── Private Adapter
```

The browser, public API responses, dashboard labels, and normal server logs expose only the Universal Dragon identity.

The private adapter token, endpoint, and model identifier stay in server-side environment bindings. They must never be committed to GitHub, pasted into chat, placed in frontend code, or shown in screenshots.

## Private adapter variables

```dotenv
UD_BRAIN_TOKEN=
UD_BRAIN_ENDPOINT=
UD_BRAIN_MODEL_ID=
UD_BRAIN_OUTPUT_FIELD=max_tokens
UD_BRAIN_MAX_OUTPUT_TOKENS=1200
UD_BRAIN_REQUEST_TIMEOUT_MS=120000
UD_BRAIN_EXTRA_JSON={}
```

The adapter must support an OpenAI-compatible `chat/completions` request shape.

`UD_BRAIN_ENDPOINT` may be either the API base URL or the full `chat/completions` URL.

Use `UD_BRAIN_OUTPUT_FIELD=max_completion_tokens` only when the private adapter requires that field.

Optional adapter-specific request properties can be placed in `UD_BRAIN_EXTRA_JSON`. Do not put tokens or passwords in that value.

## Cloudflare Pages

Open the Cloudflare Pages project connected to this repository.

Under **Settings → Variables and Secrets**, store these as encrypted secrets:

| Name | Type |
|---|---|
| `UD_BRAIN_TOKEN` | Secret |
| `UD_BRAIN_ENDPOINT` | Secret |
| `UD_BRAIN_MODEL_ID` | Secret |

Add these runtime controls as variables:

| Name | Suggested value |
|---|---|
| `UD_BRAIN_OUTPUT_FIELD` | `max_tokens` |
| `UD_BRAIN_MAX_OUTPUT_TOKENS` | `1200` |
| `UD_BRAIN_EXTRA_JSON` | `{}` |

Redeploy after changing bindings.

Verify:

```bash
curl -s https://hyper.universaldragon.com/api/health | python3 -m json.tool
```

Expected public shape:

```json
{
  "status": "ok",
  "system": "UNIVERSAL_DRAGON_ASLAM",
  "creator": "ASLAM",
  "intelligence": "EVE",
  "brain": "EVE_NOVA",
  "core": "NOVA_CORE",
  "brain_online": true,
  "adapter": "PRIVATE_ADAPTER_READY"
}
```

The response intentionally contains no external provider or model name.

## Raspberry Pi

```bash
cd ~/hyper-dragon-
cp .env.example .env
chmod 600 .env
```

Enter the private values locally, then start:

```bash
npm install
npm run dev
```

Verify:

```bash
curl -s http://127.0.0.1:3000/api/health | python3 -m json.tool
```

## Guard contract

```text
[GUARD] owner_approval = REQUIRED
[GUARD] dangerous_action = DENY
```

EVE NOVA may explain, plan, simulate, and propose controlled actions. It must not silently perform dangerous, account-changing, destructive, or physical actions.
