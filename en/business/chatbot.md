---
title: Chatbot
section: business
---

# Chatbot

The Chatbot is an assistant that works inside your business data. Instead of navigating several
screens, you can describe what you need — "how much stock do we have of this model", "show last
week's sales", "create a sale of ten units to this customer" — and the assistant looks the answer up
or prepares a draft for you to confirm.

It is a helper, not an autonomous accountant. Anything that changes money, stock or invoices is
presented as a draft and only becomes a real record when you confirm it.

## What this page is about

- Answering questions about sales, purchases, stock and customers in natural language.
- Preparing sale and purchase drafts with products, quantities, prices and an account.
- Keeping a searchable history of conversations so you can return to previous work.

## Page layout

| Area | What it shows |
| --- | --- |
| Header | History toggle, current branch, clock, and the voice control when enabled |
| History sidebar | Search, new chat, clear history and sessions grouped by today, yesterday and earlier |
| Conversation area | Messages, the assistant's working status, feedback buttons and saved prompts |
| Composer | Text input, optional microphone and the send action |
| Confirmation card | The draft summary with confirm and cancel actions |

The assistant can be opened full screen from the sidebar or as a panel while you work on another page.
Both use the same conversation and the same permissions.

## How to use it

### Ask a question

1. Open **Chatbot**. A welcome screen offers example prompts based on the page you came from.
2. Type your question and send it. The assistant shows what it is doing while it queries the data.
3. Read the answer. Answers respect your branch selection and your capabilities: the assistant cannot
   read a module you cannot read.

### Create a record through a draft

1. Describe the operation, including the counterparty and the products.
2. The assistant replies with a confirmation card containing the entity, the counterparty, quantity
   and unit price, any discount, miscellaneous amount, total, the payment account and a "pay later"
   option.
3. Check every value. You can cancel the draft or open the full sale form to adjust it manually.
4. Confirm. The record is created; the card shows the result and a link to the saved document.

Drafts expire. If a card is older than the session window it is marked expired and must be recreated.

### Use voice

Where voice is enabled, the microphone button starts a live voice session. The header shows the
connection state (connecting, listening, speaking, error). Voice is a convenience layer over the same
text conversation: the transcript is stored as normal messages.

### Manage history

- **New chat** starts a fresh conversation without deleting the old one.
- **Search** filters sessions by title.
- **Rename** and **pin** keep important sessions at the top.
- **Clear history** removes stored sessions after a confirmation. It does not delete any business
  record created earlier.

## What is restricted

- The page requires the `chatbot` page capability. It is universal, so every employee can use it.
- Sending a message and confirming a draft are write actions. Read-only visitors to other pages may
  still use the assistant for questions within the same universal page.
- The assistant never exceeds your permissions. A user without purchase access cannot create a
  purchase draft, and a branch-scope user can only act inside their home branch.
- Conversations are private to the signed-in user and scoped to the active business. Sessions are
  not shared between employees.
- Confirming a draft is final. There is no automatic rollback; correct mistakes with the normal
  edit, return or delete flow of the module.

## Tips and troubleshooting

- **The assistant says it cannot find data.** Check the branch selector and whether you hold the page
  the data belongs to.
- **A draft is rejected on confirm.** The underlying data changed, for example stock ran out or the
  account balance is insufficient. Recreate the draft after fixing the cause.
- **Voice is unavailable.** Voice depends on browser support and on the feature flags enabled for
  your environment; the text chat always remains available.
- **History is empty on a new device.** Local history is stored per browser profile; server-side
  sessions appear once the account is signed in.

## Related pages

- [Make Sale](/docs/business/sale/sell)
- [Make Purchase](/docs/business/purchase/create)
- [Inventory Listing](/docs/business/inventory/listing)
- [Dashboard](/docs/business/home)
