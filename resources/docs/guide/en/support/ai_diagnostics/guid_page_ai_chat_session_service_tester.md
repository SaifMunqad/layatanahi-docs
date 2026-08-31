---
id: support.ai_diagnostics.ai_chat_session_service_tester
title: "AI Chat Session Service Tester"
section: support
directory: ai_diagnostics
link: "/api/system/support/v1/ai/openrouter/chat/test-chat-session-service"
path: ["System Support","AI Diagnostics","Chat Session"]
---

# AI Chat Session Service Tester

The '/api/system/support/v1/ai/openrouter/chat/test-chat-session-service' endpoint executes a multi-turn conversation test through the 'ChatSessionService'.

It simulates session ID generation, appends test user and assistant message pairs, validates session storage keys, and returns the formatted history structure, ensuring conversation context persistence across Octane web requests.
