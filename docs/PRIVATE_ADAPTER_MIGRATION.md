# Private Adapter Migration

Replace provider-specific environment names with Universal Dragon names only inside private server configuration.

```text
private token       → UD_BRAIN_TOKEN
private API base    → UD_BRAIN_ENDPOINT
private model ID    → UD_BRAIN_MODEL_ID
output token field  → UD_BRAIN_OUTPUT_FIELD
output limit        → UD_BRAIN_MAX_OUTPUT_TOKENS
extra request JSON  → UD_BRAIN_EXTRA_JSON
```

Do not print the values during migration. After migration, remove obsolete provider-named variables from `.env` and Cloudflare bindings.

Public health and chat responses intentionally expose only:

```text
UNIVERSAL_DRAGON_ASLAM
EVE_NOVA
NOVA_CORE
PRIVATE_ADAPTER_READY
```
