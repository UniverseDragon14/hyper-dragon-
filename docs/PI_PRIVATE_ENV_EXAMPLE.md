# Raspberry Pi Private Environment Example

Create `~/hyper-dragon-/.env` with permissions `600`.

```dotenv
UD_BRAIN_TOKEN=<private>
UD_BRAIN_ENDPOINT=<private>
UD_BRAIN_MODEL_ID=<private>
UD_BRAIN_OUTPUT_FIELD=max_tokens
UD_BRAIN_MAX_OUTPUT_TOKENS=1200
UD_BRAIN_REQUEST_TIMEOUT_MS=120000
UD_BRAIN_EXTRA_JSON={}
MQTT_ENABLED=false
```

Never replace `<private>` in committed files. Real values belong only in the local `.env` or encrypted cloud bindings.
