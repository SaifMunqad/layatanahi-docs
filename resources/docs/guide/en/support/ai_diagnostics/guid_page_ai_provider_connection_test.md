---
id: support.ai_diagnostics.ai_provider_connection_test
title: "AI Provider Connection Test"
section: support
directory: ai_diagnostics
link: "/api/system/support/v1/ai/test"
path: ["System Support","AI Diagnostics","Connection Test"]
---

# AI Provider Connection Test

The '/api/system/support/v1/ai/test' endpoint validates connectivity between Layatanahi and the upstream AI engine (OpenRouter / external LLM providers).

It tests API authentication credentials ('OPENROUTER_API_KEY'), model routing configurations ('OPENROUTER_MODEL'), network latency, and JSON response formatting before chat sessions are initiated by end users.
