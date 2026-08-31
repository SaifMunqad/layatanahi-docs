---
id: support.dev_routes.currency_exchange_sync_calculation_diagnostic
title: "Currency Exchange Sync & Calculation Diagnostic"
section: support
directory: dev_routes
link: "/system/support/currency-sync-check"
path: ["System Support","Dev Routes","Currency Engine"]
---

# Currency Exchange Sync & Calculation Diagnostic

The '/system/support/currency-sync-check' diagnostic provides real-time verification of the platform's multi-currency engine. It fetches live rates from the external exchange rate provider against base currency AFN, inspects the latest records stored in the 'hourly_currency_prices' table, and runs sample rate conversions (such as 100 USD to AFN and 100 EUR to AFN) via 'CustomerAfnPricingService'.

Adding the query parameter '?run_job=1' (e.g. '/system/support/currency-sync-check?run_job=1') triggers immediate execution of the background 'SyncHourlyCurrencyPricesJob', enabling technicians to force rate updates and inspect database persistence without waiting for scheduled cron cycles.
