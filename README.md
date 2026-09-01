# Layatanahi Docs

> A modern, multi-language documentation platform for the **Layatanahi** business & commerce ecosystem, built with **Laravel 13**, **Inertia.js**, and **React 19 (TypeScript)**.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Tech Stack](#2-tech-stack)
3. [System Architecture](#3-system-architecture)
4. [Requirements](#4-requirements)
5. [Installation From Scratch](#5-installation-from-scratch)
   - [5.1 Install PHP](#51-install-php)
   - [5.2 Install Composer](#52-install-composer)
   - [5.3 Install Node.js](#53-install-nodejs)
   - [5.4 Install npm / pnpm / yarn](#54-install-npm--pnpm--yarn)
   - [5.5 Install the Laravel Installer (optional)](#55-install-the-laravel-installer-optional)
   - [5.6 Clone & Bootstrap the Project](#56-clone--bootstrap-the-project)
6. [Environment Configuration](#6-environment-configuration)
7. [Running the Application](#7-running-the-application)
8. [Project Directory Structure](#8-project-directory-structure)
9. [Backend Structure](#9-backend-structure)
10. [Routing Structure](#10-routing-structure)
11. [Frontend Structure](#11-frontend-structure)
12. [Layout Structure](#12-layout-structure)
13. [How the Documentation System Works](#13-how-the-documentation-system-works)
14. [Authentication & Security](#14-authentication--security)
15. [Multi-Language Guides](#15-multi-language-guides)
16. [Database](#16-database)
17. [Testing & Code Quality](#17-testing--code-quality)
18. [Build & Deployment](#18-build--deployment)
19. [Troubleshooting](#19-troubleshooting)
20. [Useful Commands Reference](#20-useful-commands-reference)
21. [License](#21-license)

---

## 1. Introduction

**Layatanahi Docs** is the official documentation website for the Layatanahi platform — a
comprehensive business and commerce ecosystem that covers customer portals, business
operations (purchasing, inventory, sales, storefronts), support tooling, legal pages, and a
public API.

The application is a **single-page application (SPA)** experience powered by
[Inertia.js](https://inertiajs.com), which bridges a **Laravel** backend with a
**React** frontend without the need for a separate REST/GraphQL layer for page rendering.
Server-side controllers return Inertia responses that mount React page components; each
documentation page renders **Markdown** content into styled, navigable articles complete
with a table of contents ("On this page"), sidebar navigation, and full-text search.

Key characteristics:

- **Server-driven routing** with Laravel, consumed type-safely on the frontend via
  [Laravel Wayfinder](https://github.com/laravel/wayfinder).
- **Markdown-based content** co-located with each React page for easy editing.
- **Multi-language guide content** (English, Dari `fa_AF`, and Pashto `ps`).
- **Full authentication suite** via [Laravel Fortify](https://laravel.com/docs/fortify):
  registration, login, email verification, password reset, two-factor authentication, and
  **passkeys** (WebAuthn).
- **Modern tooling**: Vite, Tailwind CSS v4, Radix UI / shadcn-style components, and the
  React Compiler.

---

## 2. Tech Stack

| Layer            | Technology                                                                 |
|------------------|----------------------------------------------------------------------------|
| Language (BE)    | PHP `^8.3`                                                                  |
| Framework (BE)   | Laravel `^13.17`                                                            |
| SPA Bridge       | Inertia.js `^3.0` (`inertiajs/inertia-laravel` + `@inertiajs/react`)       |
| Auth             | Laravel Fortify `^1.37` + `@laravel/passkeys` (WebAuthn) + 2FA             |
| Type-safe routes | Laravel Wayfinder `^0.1.14` + `@laravel/vite-plugin-wayfinder`             |
| Language (FE)    | TypeScript `^5.7`                                                           |
| UI Library       | React `^19.2`                                                              |
| Styling          | Tailwind CSS `^4.0` (`@tailwindcss/vite`)                                   |
| Components       | Radix UI primitives + shadcn-style `components/ui`                          |
| Icons            | `lucide-react`                                                             |
| Build Tool       | Vite `^8` via `vite-plus` (`vp`) + `laravel-vite-plugin`                    |
| Database         | SQLite (default) — swappable to MySQL/PostgreSQL                           |
| Testing          | PHPUnit `^12`                                                              |
| Static Analysis  | Larastan / PHPStan                                                         |
| Code Style       | Laravel Pint (PHP) + Vite/Prettier-style formatting (JS/TS)               |
| REPL / Console   | Laravel Tinker                                                            |

---

## 3. System Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                              Browser                                   │
│  React 19 SPA (TypeScript)  ──  Inertia client  ──  Vite HMR assets    │
└───────────────▲───────────────────────────────────────▲───────────────┘
                │ Inertia page visits (XHR / full loads)  │  static assets
                │                                          │
┌───────────────┴──────────────────────────────────────────────────────┐
│                            Laravel 13 (PHP 8.3)                        │
│                                                                        │
│  routes/web.php ─▶ Docs Controllers ─▶ Inertia::render('docs/...')     │
│  routes/settings.php ─▶ Settings Controllers (auth-protected)          │
│  Fortify ─▶ auth actions (login, register, 2FA, passkeys)              │
│                                                                        │
│  HandleInertiaRequests middleware ─▶ shares props (auth user, etc.)    │
└───────────────▲──────────────────────────────────────────────────────┘
                │
        ┌───────┴────────┐
        │  SQLite / RDBMS │  (users, passkeys, sessions, jobs, cache)
        └────────────────┘
```

**Request lifecycle (documentation page):**

1. A browser navigates to e.g. `/business/purchase/overview`.
2. Laravel matches the route in `routes/web.php` → `BusinessController@purchaseOverview`.
3. The controller returns `Inertia::render('docs/business/purchase/overview', [...])`.
4. Inertia resolves the React page component
   `resources/js/pages/docs/business/purchase/overview.tsx`.
5. `app.tsx` wraps the page in the **DocsLayout** (because the name starts with `docs/`).
6. The page imports its co-located Markdown (`overview.md?raw`), parses it with
   `useMarkdown`, publishes the headings to the table-of-contents context, and renders the
   article.

---

## 4. Requirements

Make sure the following are available on your machine before installing the project:

| Tool          | Minimum Version | Notes                                            |
|---------------|-----------------|--------------------------------------------------|
| PHP           | 8.3             | With `mbstring`, `openssl`, `pdo_sqlite`, `curl`, `xml`, `ctype`, `fileinfo`, `tokenizer`, `bcmath` extensions |
| Composer      | 2.x             | PHP dependency manager                           |
| Node.js       | 20.x LTS or 22.x| Required by Vite 8                               |
| npm / pnpm / yarn | latest      | JavaScript package manager (choose one)          |
| SQLite        | 3.x             | Default database driver                          |
| Git           | 2.x             | To clone the repository                          |

> The project ships a `pnpm-workspace.yaml`, so **pnpm** is fully supported; `npm` and
> `yarn` lockfiles (`package-lock.json`, `yarn.lock`) are also present, so any of the three
> package managers works.

---

## 5. Installation From Scratch

This section walks through a complete environment setup on a fresh machine. Commands are
given for **Linux/macOS** and **Windows** where relevant.

### 5.1 Install PHP

**Ubuntu / Debian:**

```bash
sudo apt update
sudo apt install -y php8.3 php8.3-cli php8.3-mbstring php8.3-xml \
  php8.3-curl php8.3-sqlite3 php8.3-bcmath php8.3-zip
php -v   # verify
```

**macOS (Homebrew):**

```bash
brew install php@8.3
php -v
```

**Windows:**

- Download PHP 8.3 (thread-safe) from <https://windows.php.net/download>, or use
  [Laravel Herd](https://herd.laravel.com/) which bundles PHP, Composer, and Node.
- Add the PHP directory to your `PATH` and enable the extensions listed in
  [Requirements](#4-requirements) inside `php.ini`.

### 5.2 Install Composer

**Linux/macOS:**

```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
sudo mv composer.phar /usr/local/bin/composer
php -r "unlink('composer-setup.php');"
composer --version
```

**Windows:** download and run the installer from
<https://getcomposer.org/Composer-Setup.exe>.

### 5.3 Install Node.js

Use the official installer, or a version manager (recommended):

**nvm (Linux/macOS):**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# restart your shell, then:
nvm install 22
nvm use 22
node -v
```

**Windows:** use [nvm-windows](https://github.com/coreybutler/nvm-windows) or the installer
from <https://nodejs.org>.

### 5.4 Install npm / pnpm / yarn

- **npm** ships with Node.js — nothing to install.
- **pnpm** (recommended for this repo):

  ```bash
  npm install -g pnpm
  pnpm -v
  ```

- **yarn:**

  ```bash
  npm install -g yarn
  yarn -v
  ```

### 5.5 Install the Laravel Installer (optional)

Only needed if you plan to scaffold new Laravel projects. It is **not required** to run this
project.

```bash
composer global require laravel/installer
# ensure Composer's global bin is on your PATH:
#   export PATH="$PATH:$HOME/.composer/vendor/bin"   (or ~/.config/composer/vendor/bin)
laravel --version
```

### 5.6 Clone & Bootstrap the Project

```bash
git clone <repository-url> Layatanahi_Docs
cd Layatanahi_Docs
```

The fastest path uses the built-in Composer `setup` script, which installs PHP + JS
dependencies, prepares `.env`, generates the app key, runs migrations, and builds assets:

```bash
composer run setup
```

Or perform the steps manually:

```bash
# 1. PHP dependencies
composer install

# 2. Environment file
cp .env.example .env          # Windows: copy .env.example .env

# 3. Application key
php artisan key:generate

# 4. Create the SQLite database file (if missing)
touch database/database.sqlite   # Windows: type nul > database\database.sqlite

# 5. Run migrations
php artisan migrate

# 6. JavaScript dependencies (pick one)
pnpm install      # or: npm install    | yarn install

# 7. Build front-end assets (production) OR run the dev server (section 7)
pnpm run build    # or: npm run build   | yarn build
```

---

## 6. Environment Configuration

Configuration lives in the `.env` file (copied from `.env.example`). Important keys:

| Variable                | Default                 | Purpose                                      |
|-------------------------|-------------------------|----------------------------------------------|
| `APP_NAME`              | `Laravel`               | Also used as the SPA title (`VITE_APP_NAME`) |
| `APP_ENV`               | `local`                 | Environment name                             |
| `APP_KEY`               | *(generated)*           | Encryption key — set via `key:generate`      |
| `APP_DEBUG`             | `true`                  | Verbose errors in development                |
| `APP_URL`               | `http://localhost:8000` | Base URL                                     |
| `APP_LOCALE`            | `en`                    | Default application locale                   |
| `APP_FALLBACK_LOCALE`   | `en`                    | Fallback locale                              |
| `DB_CONNECTION`         | `sqlite`                | Database driver                              |
| `SESSION_DRIVER`        | `database`              | Session storage                              |
| `QUEUE_CONNECTION`      | `database`              | Queue backend                                |
| `CACHE_STORE`           | `database`              | Cache backend                                |
| `MAIL_MAILER`           | `log`                   | Mail transport (emails logged by default)    |

To switch to **MySQL/PostgreSQL**, set `DB_CONNECTION=mysql` (or `pgsql`) and provide
`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`, then re-run
`php artisan migrate`.

### Frontend environment variables

Vite exposes variables prefixed with `VITE_` to the browser bundle. The most important one
is `VITE_APP_NAME`, which is derived from `APP_NAME` and used as the SPA document title
suffix (see `app.tsx`).

---

## 7. Running the Application

### Development (recommended)

The project bundles a single command that starts **all** development processes concurrently
— the PHP server, the queue listener, real-time logs (Pail), and the Vite dev server with
Hot Module Replacement:

```bash
composer run dev
```

Under the hood this runs `php artisan dev`, which uses `concurrently` to launch:

| Process        | Command                     | Purpose                              |
|----------------|-----------------------------|--------------------------------------|
| Web server     | `php artisan serve`         | Serves the Laravel app on `:8000`    |
| Queue worker   | `php artisan queue:listen`  | Processes background jobs            |
| Log viewer     | `php artisan pail`          | Streams application logs to console  |
| Asset bundler  | `vp dev` (Vite)             | Compiles & hot-reloads JS/CSS        |

You can also run the pieces manually in separate terminals:

```bash
php artisan serve       # http://localhost:8000
pnpm run dev            # Vite dev server + HMR (or: npm run dev / yarn dev)
```

Then open <http://localhost:8000> in your browser.

### Production

```bash
pnpm run build          # compile & minify assets into public/build
php artisan serve       # or serve public/ via nginx/apache/php-fpm
```

For **server-side rendering (SSR)** assets:

```bash
pnpm run build:ssr
```

---

## 8. Project Directory Structure

```
Layatanahi_Docs/
├── app/                        # PHP application code (PSR-4: App\)
│   ├── Actions/Fortify/        # Fortify user-creation & password-reset actions
│   ├── Concerns/               # Reusable validation-rule traits
│   ├── Console/Commands/       # Custom Artisan commands
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Docs/           # Documentation page controllers
│   │   │   └── Settings/       # Profile & security controllers
│   │   ├── Middleware/         # HandleInertiaRequests, HandleAppearance
│   │   └── Requests/Settings/  # Form-request validation classes
│   ├── Models/                 # Eloquent models (User)
│   └── Providers/              # AppServiceProvider, FortifyServiceProvider
├── bootstrap/                  # Framework bootstrap & cached files
├── config/                     # Configuration files
├── database/
│   ├── factories/              # Model factories
│   ├── migrations/             # Schema migrations
│   ├── seeders/                # Database seeders
│   └── database.sqlite         # Default SQLite database file
├── public/                     # Web root; compiled assets in public/build
├── resources/
│   ├── css/                    # Tailwind entry stylesheet
│   ├── docs/guide/{en,fa_AF,ps}/  # Multi-language guide Markdown content
│   └── js/                     # React/TypeScript frontend (see §11)
├── routes/
│   ├── web.php                 # Public docs & dashboard routes
│   ├── settings.php            # Auth-protected settings routes
│   └── console.php             # Artisan console routes
├── storage/                    # Logs, compiled views, file cache
├── tests/                      # PHPUnit Feature & Unit tests
├── artisan                     # Artisan CLI entry point
├── composer.json               # PHP dependencies & scripts
├── package.json                # JS dependencies & scripts
├── vite.config.ts              # Vite build configuration
├── tsconfig.json               # TypeScript configuration
├── phpstan.neon                # Larastan/PHPStan configuration
├── phpunit.xml                 # PHPUnit configuration
└── pint.json                   # Laravel Pint (code style) configuration
```

---

## 9. Backend Structure

### Controllers (`app/Http/Controllers`)

All documentation controllers live under `App\Http\Controllers\Docs` and follow the same
pattern: each action returns an Inertia response that names a React page component and passes
a small set of props (`section`, `page`).

| Controller             | Responsibility                                             |
|------------------------|-----------------------------------------------------------|
| `LayatanahiController` | Overview, Credits, Team, Idea, Features pages             |
| `CustomerController`   | Customer Overview, Portal, Account Center                 |
| `BusinessController`   | Purchase / Inventory / Sale / Store / Public sub-sections |
| `SupportController`    | Help Center, Knowledge Base, Contact Team                 |
| `LegalController`      | Privacy Policy, Terms of Service, Return Policy           |
| `ApiController`        | API Overview, Authentication, Reference                   |

`App\Http\Controllers\Settings` holds `ProfileController` and `SecurityController` for the
authenticated user settings area.

Example action:

```php
public function purchaseOverview()
{
    return Inertia::render('docs/business/purchase/overview', [
        'section' => 'Business',
        'page'    => 'Purchase Overview',
    ]);
}
```

### Middleware (`app/Http/Middleware`)

- **`HandleInertiaRequests`** — shares global props (e.g. the authenticated user, app name,
  flash messages) with every Inertia page and defines the root Blade view.
- **`HandleAppearance`** — persists the light/dark **appearance** preference (cookie) so the
  correct theme is applied on the very first render.

### Actions & Concerns

- **`app/Actions/Fortify/CreateNewUser`** and **`ResetUserPassword`** implement Fortify's
  pluggable user-management contracts.
- **`app/Concerns/PasswordValidationRules`** and **`ProfileValidationRules`** centralize
  validation rules reused across form requests and actions.

### Providers

- **`AppServiceProvider`** — general application bootstrapping.
- **`FortifyServiceProvider`** — wires up Fortify features (registration, 2FA, passkeys) and
  binds the custom actions above.

### Models

- **`User`** — implements Fortify's `PasskeyUser` contract and uses the
  `PasskeyAuthenticatable` and `TwoFactorAuthenticatable` traits, enabling WebAuthn passkeys
  and two-factor authentication out of the box.

---

## 10. Routing Structure

Routes are defined in `routes/web.php` (public) and `routes/settings.php` (authenticated).
Named route groups keep URLs and route names organized by section.

### Public documentation routes (`routes/web.php`)

| Method | URL                              | Route name                   | Handler                                |
|--------|----------------------------------|------------------------------|----------------------------------------|
| GET    | `/`                              | `home`                       | `Inertia → docs/home`                  |
| GET    | `/customer/overview`             | `customer.overview`          | `CustomerController@overview`          |
| GET    | `/customer/portal`               | `customer.portal`            | `CustomerController@portal`            |
| GET    | `/customer/account-center`       | `customer.account-center`    | `CustomerController@accountCenter`     |
| GET    | `/business/purchase/overview`    | `business.purchase.overview` | `BusinessController@purchaseOverview`  |
| GET    | `/business/purchase/listing`     | `business.purchase.listing`  | `BusinessController@purchaseListing`   |
| GET    | `/business/purchase/demo`        | `business.purchase.demo`     | `BusinessController@purchaseDemo`      |
| GET    | `/business/inventory/*`          | `business.inventory.*`       | `BusinessController@inventory*`        |
| GET    | `/business/sale/*`               | `business.sale.*`            | `BusinessController@sale*`             |
| GET    | `/business/store/*`              | `business.store.*`           | `BusinessController@store*`            |
| GET    | `/business/public/*`             | `business.public.*`          | `BusinessController@public*`           |
| GET    | `/support/help-center`           | `support.help-center`        | `SupportController@helpCenter`         |
| GET    | `/support/knowledge-base`        | `support.knowledge-base`     | `SupportController@knowledgeBase`      |
| GET    | `/support/contact-team`          | `support.contact-team`       | `SupportController@contactTeam`        |
| GET    | `/layatanahi/{overview…features}`| `layatanahi.*`               | `LayatanahiController@*`               |
| GET    | `/legal/privacy-policy`          | `legal.privacy-policy`       | `LegalController@privacyPolicy`        |
| GET    | `/legal/terms-of-service`        | `legal.terms-of-service`     | `LegalController@termsOfService`       |
| GET    | `/legal/return-policy`           | `legal.return-policy`        | `LegalController@returnPolicy`         |
| GET    | `/api/overview`                  | `api.overview`               | `ApiController@overview`               |
| GET    | `/api/authentication`            | `api.authentication`         | `ApiController@authentication`         |
| GET    | `/api/reference`                 | `api.reference`              | `ApiController@reference`              |
| GET    | `/dashboard`                     | `dashboard`                  | `Inertia → dashboard` *(auth+verified)*|

Each `business` sub-section (`purchase`, `inventory`, `sale`, `store`, `public`) exposes the
same three actions: `overview`, `listing`, and `demo`.

### Authenticated settings routes (`routes/settings.php`)

| Method | URL                    | Route name              | Notes                              |
|--------|------------------------|-------------------------|------------------------------------|
| GET    | `/settings`            | *(redirect)*            | Redirects to `/settings/profile`   |
| GET    | `/settings/profile`    | `profile.edit`          | `auth`                             |
| PATCH  | `/settings/profile`    | `profile.update`        | `auth`                             |
| DELETE | `/settings/profile`    | `profile.destroy`       | `auth`, `verified`                 |
| GET    | `/settings/security`   | `security.edit`         | `auth`, `verified`, `RequirePassword` |
| PUT    | `/settings/password`   | `user-password.update`  | `auth`, `verified`, `throttle:6,1` |
| GET    | `/settings/appearance` | `appearance.edit`       | `auth`, `verified`                 |
| GET    | `/.well-known/passkey-endpoints` | `well-known.passkeys` | WebAuthn discovery endpoint |

### Type-safe routes on the frontend (Wayfinder)

[Laravel Wayfinder](https://github.com/laravel/wayfinder) generates TypeScript route helpers
from the PHP route definitions. They are emitted into `resources/js/routes/` and
`resources/js/actions/`, and consumed like:

```ts
import business from '@/routes/business';

business.purchase.overview().url;   // "/business/purchase/overview"
```

This guarantees the frontend and backend never drift out of sync — renaming a route in PHP
regenerates the TypeScript helper.

---

## 11. Frontend Structure

The React/TypeScript app lives in `resources/js`:

```
resources/js/
├── app.tsx                     # Inertia bootstrap + layout resolver
├── pages/                      # Inertia page components (mirror route names)
│   ├── docs/                   # Documentation pages
│   │   ├── home.tsx
│   │   ├── _docs-page.tsx      # Shared page renderer (Markdown → article + TOC)
│   │   ├── layatanahi/         # overview/credits/team/idea/features (.tsx + .md)
│   │   ├── customer/
│   │   ├── business/           # purchase / inventory / sale / store / public
│   │   ├── support/
│   │   ├── legal/
│   │   └── api/
│   ├── auth/                   # Login, register, password reset, 2FA pages
│   └── settings/               # Profile, security, appearance pages
├── layouts/                    # Page layout wrappers (see §12)
├── components/
│   ├── ui/                     # shadcn-style Radix primitives (button, dialog…)
│   └── layout/docs/            # Docs shell, sidebar, header, TOC, search, article
├── hooks/                      # Reusable React hooks
├── lib/                        # markdown.tsx (parser/renderer), utils.ts
├── routes/                     # Wayfinder-generated route helpers
├── actions/                    # Wayfinder-generated controller-action helpers
├── wayfinder/                  # Wayfinder runtime types & helpers
└── types/                      # Shared TypeScript types
```

### Page ↔ Markdown pairing

Each documentation page is a thin `.tsx` wrapper that imports a co-located `.md` file as a
raw string and hands it to a shared renderer:

```tsx
// resources/js/pages/docs/business/purchase/overview.tsx
import BusinessPage from '@/pages/docs/business/_business-page';
import markdown from './overview.md?raw';

export default function PurchaseOverviewPage() {
    return <BusinessPage markdown={markdown} />;
}
```

`_business-page.tsx` delegates to the generic `_docs-page.tsx`, which:

1. Parses the Markdown via `useMarkdown()` (`lib/markdown.tsx`).
2. Publishes the extracted headings to the TOC context (`usePublishToc`).
3. Sets the browser tab title from the first `# H1` heading.
4. Renders the article body.

### Key hooks (`resources/js/hooks`)

| Hook                     | Purpose                                             |
|--------------------------|-----------------------------------------------------|
| `use-appearance`         | Light/dark/system theme state & persistence         |
| `use-clipboard`          | Copy-to-clipboard for code blocks                   |
| `use-current-url`        | Reactive current URL (active-nav highlighting)      |
| `use-flash-toast`        | Shows Inertia flash messages as toasts (`sonner`)   |
| `use-initials`           | Derives avatar initials from a user name            |
| `use-mobile` / `use-mobile-navigation` | Responsive/mobile-menu helpers        |
| `use-two-factor-auth`    | Two-factor enrollment/challenge helpers             |

---

## 12. Layout Structure

Inertia selects the layout for a page in `app.tsx` based on the **page name prefix**:

```ts
layout: (name) => {
    switch (true) {
        case name === 'welcome':          return null;              // no chrome
        case name.startsWith('docs/'):    return DocsLayout;        // docs shell
        case name.startsWith('auth/'):    return AuthLayout;        // auth screens
        case name.startsWith('settings/'):return [AppLayout, SettingsLayout];
        default:                          return AppLayout;         // app chrome
    }
}
```

### Available layouts (`resources/js/layouts`)

| Layout            | Applied to            | Description                                    |
|-------------------|-----------------------|------------------------------------------------|
| `DocsLayout`      | `docs/*` pages        | The documentation shell (header + sidebar + article + TOC + search) |
| `AuthLayout`      | `auth/*` pages        | Centered auth screens (split/card/simple variants) |
| `AppLayout`       | default & settings    | Application chrome (header or sidebar variant) |
| `SettingsLayout`  | `settings/*` (nested) | Adds the settings sub-navigation inside `AppLayout` |

### Docs layout composition

`DocsLayout` re-exports `docs-shell.tsx`, which assembles the documentation UI from the
`components/layout/docs` building blocks, wrapped in a `TocProvider`:

```
DocsLayout (docs-shell)
└── TocProvider                       (docs-toc-context)
    └── DocsShellContent
        ├── TopBar                    (docs-header)   — logo, search trigger, theme toggle
        ├── Sidebar                   (docs-sidebar)  — section navigation (NAV_SECTIONS)
        ├── Article                   (docs-article)  — renders the page/Markdown body
        ├── TableOfContents           (docs-article)  — "On this page" from headings
        └── SearchModal               (docs-search-modal) — full-text search overlay
```

- **Navigation data** is defined declaratively in `docs-data.ts` as `NAV_SECTIONS`, using
  Wayfinder route helpers so links stay type-safe.
- **The table of contents** is driven by a React context: pages *publish* their headings and
  the shell *reads* them, keeping the article and TOC decoupled.

---

## 13. How the Documentation System Works

1. **Author** writes/edits a Markdown file next to its page component, e.g.
   `resources/js/pages/docs/customer/overview.md`.
2. **Route** — a request to `/customer/overview` is matched in `routes/web.php` and handled
   by `CustomerController@overview`, which returns
   `Inertia::render('docs/customer/overview', [...])`.
3. **Layout resolution** — because the page name starts with `docs/`, `app.tsx` wraps it in
   `DocsLayout`.
4. **Rendering** — the page imports `./overview.md?raw` and passes it to `_docs-page.tsx`.
5. **Parsing** — `useMarkdown()` in `lib/markdown.tsx`:
   - strips YAML front-matter,
   - converts headings, paragraphs, lists, blockquotes, tables, links, images, inline styles,
     and fenced code blocks into React nodes,
   - assigns stable, unique slug `id`s to headings,
   - returns `{ headings, content }`.
6. **Navigation & TOC** — headings are published to the TOC context to build the
   "On this page" list; the sidebar highlights the active entry using the current URL.
7. **Search** — `SearchModal` provides a quick client-side lookup across the navigation.

Because content is plain Markdown co-located with each page, adding a page is as simple as
creating a controller action, a route, a `.tsx` wrapper, a `.md` file, and a `NAV_SECTIONS`
entry.

---

## 14. Authentication & Security

Authentication is powered by **Laravel Fortify** and configured in
`app/Providers/FortifyServiceProvider.php`. Supported flows:

- **Registration & Login** (`app/Actions/Fortify/CreateNewUser`).
- **Email verification** — the `verified` middleware guards sensitive routes.
- **Password reset** (`ResetUserPassword`) and **password confirmation**
  (`RequirePassword` middleware on `security.edit`).
- **Two-factor authentication (2FA)** — TOTP with recovery codes, backed by the
  `two_factor_*` columns on the `users` table.
- **Passkeys (WebAuthn)** via `@laravel/passkeys` and Fortify's `PasskeyUser` contract; the
  `.well-known/passkey-endpoints` route advertises enroll/manage URLs.

Security-relevant middleware & guards:

- `auth`, `verified`, `RequirePassword` protect the settings area.
- `throttle:6,1` rate-limits password updates.
- Passwords are stored `hashed` (see `User::casts()`), and sensitive attributes
  (`password`, `two_factor_secret`, recovery codes, remember token) are hidden from
  serialization via the `#[Hidden]` attribute.

Frontend auth pages live under `resources/js/pages/auth` and use `AuthLayout`; the
`use-two-factor-auth` hook drives 2FA enrollment and challenges.

---

## 15. Multi-Language Guides

In addition to the co-located page Markdown, extended guide content is organized by language
under `resources/docs/guide`:

```
resources/docs/guide/
├── en/        # English
│   ├── business/
│   ├── customer/
│   └── support/
├── fa_AF/     # Dari (Afghan Persian)
│   ├── business/
│   ├── customer/
│   └── support/
└── ps/        # Pashto
    ├── business/
    ├── customer/
    └── support/
```

- The three locales correspond to `APP_LOCALE` / `APP_FALLBACK_LOCALE` (`en` by default).
- Each locale mirrors the same folder layout (`business`, `customer`, `support`) so a guide
  can be translated by adding the equivalent Markdown file under the matching language folder.
- Right-to-left (RTL) languages (`fa_AF`, `ps`) render naturally through the Markdown
  renderer and Tailwind styles.

To add a translation: copy the English Markdown file into the target language folder
(`fa_AF/…` or `ps/…`), keeping the same relative path and filename, then translate the body.

---

## 16. Database

The default connection is **SQLite** (`database/database.sqlite`). Schema is managed with
migrations in `database/migrations`:

| Migration                                        | Creates / modifies                         |
|--------------------------------------------------|--------------------------------------------|
| `0001_01_01_000000_create_users_table`           | `users` (+ password reset, sessions)       |
| `0001_01_01_000001_create_cache_table`           | `cache`, `cache_locks`                     |
| `0001_01_01_000002_create_jobs_table`            | `jobs`, `job_batches`, `failed_jobs`       |
| `2024_01_01_000000_create_passkeys_table`        | `passkeys` (WebAuthn credentials)          |
| `2025_08_14_170933_add_two_factor_columns_to_users_table` | 2FA columns on `users`            |

Common database commands:

```bash
php artisan migrate            # apply pending migrations
php artisan migrate:fresh      # drop all tables and re-run migrations
php artisan migrate:fresh --seed  # ...and run seeders
php artisan db:seed            # run seeders only
php artisan tinker             # interactive REPL
```

Because sessions, cache, and queues default to the `database` driver, they also live in the
same database.

---

## 17. Testing & Code Quality

### Tests

Tests use **PHPUnit** and are split into `tests/Feature` and `tests/Unit`. Feature tests
cover authentication (login, registration, email verification, password reset, 2FA,
password confirmation), the dashboard, and settings (profile update, security).

```bash
php artisan test               # run the full suite
php artisan test --filter=Auth # run a subset
composer run test              # config:clear → pint check → phpstan → tests
```

### Static analysis

```bash
composer run types:check       # phpstan analyse (Larastan), config in phpstan.neon
pnpm run types:check           # tsc --noEmit (TypeScript type checking)
```

### Code style / linting

```bash
composer run lint              # Laravel Pint (auto-fix), config in pint.json
composer run lint:check        # Pint in --test mode (no changes)
pnpm run check                 # Vite/ESLint-style checks for JS/TS
pnpm run check:fix             # ...with auto-fix
```

### Continuous integration

```bash
composer run ci:check          # npm run check + tsc + full test pipeline
```

---

## 18. Build & Deployment

1. **Install production dependencies**

   ```bash
   composer install --no-dev --optimize-autoloader
   pnpm install --frozen-lockfile
   ```

2. **Build assets**

   ```bash
   pnpm run build          # or pnpm run build:ssr for SSR
   ```

3. **Configure environment** — set `APP_ENV=production`, `APP_DEBUG=false`, a strong
   `APP_KEY` (`php artisan key:generate`), the production `APP_URL`, and real database/mail
   credentials.

4. **Cache configuration** for performance:

   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan event:cache
   ```

5. **Run migrations**

   ```bash
   php artisan migrate --force
   ```

6. **Serve** the app with nginx/apache + PHP-FPM pointing at the `public/` directory, and run
   a queue worker (`php artisan queue:work`) if background jobs are used.

> **Docker/Sail:** the project includes `laravel/sail`. You can spin up a containerized
> environment with `php artisan sail:install` and `./vendor/bin/sail up` if preferred.

---

## 19. Troubleshooting

| Symptom                                             | Fix                                                                 |
|-----------------------------------------------------|---------------------------------------------------------------------|
| `No application encryption key has been specified`  | Run `php artisan key:generate`.                                     |
| `database.sqlite` not found / `no such table`       | `touch database/database.sqlite` then `php artisan migrate`.        |
| Blank page / assets 404                             | Run `pnpm run dev` (dev) or `pnpm run build` (prod).                |
| Vite manifest not found                             | Build assets or start the Vite dev server.                         |
| Wayfinder route helper missing/outdated             | Restart `pnpm run dev` (the Wayfinder Vite plugin regenerates them). |
| `class "..." not found` after pulling changes       | `composer dump-autoload`.                                          |
| Stale config after `.env` change                    | `php artisan config:clear` (and `optimize:clear`).                 |
| Permission errors on `storage/` or `bootstrap/cache`| Ensure the web user can write to those directories.               |
| Node/Vite errors on install                         | Use Node 20 LTS or 22 and reinstall dependencies.                  |

Clear all caches at once:

```bash
php artisan optimize:clear
```

---

## 20. Useful Commands Reference

### Composer scripts

| Command                  | Description                                             |
|--------------------------|---------------------------------------------------------|
| `composer run setup`     | One-shot bootstrap: install, `.env`, key, migrate, build |
| `composer run dev`       | Start server + queue + logs + Vite (via `artisan dev`)  |
| `composer run test`      | config:clear → Pint check → PHPStan → PHPUnit           |
| `composer run lint`      | Auto-fix PHP code style (Pint)                          |
| `composer run lint:check`| Check PHP code style without changes                    |
| `composer run types:check`| Run PHPStan static analysis                            |
| `composer run ci:check`  | Full CI pipeline                                        |

### npm / pnpm / yarn scripts

| Command                | Description                                      |
|------------------------|--------------------------------------------------|
| `pnpm run dev`         | Vite dev server with HMR                          |
| `pnpm run build`       | Production asset build                            |
| `pnpm run build:ssr`   | Production build + SSR bundle                     |
| `pnpm run check`       | Lint/format checks for JS/TS                      |
| `pnpm run check:fix`   | Lint/format with auto-fix                         |
| `pnpm run types:check` | TypeScript type check (`tsc --noEmit`)           |

### Common Artisan commands

| Command                       | Description                          |
|-------------------------------|--------------------------------------|
| `php artisan serve`           | Start the PHP dev server             |
| `php artisan migrate`         | Run migrations                       |
| `php artisan migrate:fresh`   | Rebuild the schema                   |
| `php artisan db:seed`         | Run seeders                          |
| `php artisan tinker`          | Interactive REPL                     |
| `php artisan route:list`      | List all registered routes           |
| `php artisan queue:work`      | Process queued jobs                  |
| `php artisan pail`            | Tail application logs                 |
| `php artisan optimize:clear`  | Clear all cached config/routes/views |

---

## 21. License

This project is released under the **MIT License**. See the `license` field in
`composer.json`. The Laravel framework is likewise open-sourced under the
[MIT license](https://opensource.org/licenses/MIT).
