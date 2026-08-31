---
id: support.ai_diagnostics.api_v1_heartbeat_ping
title: "API V1 Heartbeat & Ping"
section: support
directory: ai_diagnostics
link: "/api/system/support/v1/test"
path: ["System Support","API Diagnostics","V1 Heartbeat"]
---

# API V1 Heartbeat & Ping

The '/api/system/support/v1/test' endpoint serves as a lightweight API heartbeat. It returns a JSON object confirming 'success: true' along with the precise ISO-8601 server timestamp.

Automated uptime monitors, health checks, and staging deployment verification scripts use this endpoint to confirm server availability and response latency.
