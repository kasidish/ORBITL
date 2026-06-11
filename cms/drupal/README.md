# ORBITL Drupal Migration

This folder is the starting point for rebuilding ORBITL as a Drupal CMS while the current Vercel/Vite site stays live.

## Why Drupal

Drupal is a better fit for ORBITL than the current custom admin because it already includes:

- Editable pages and news posts
- Admin login and roles
- Media library
- Menus and URL aliases
- Content revisions
- Contact/member form workflows through contributed modules or custom webforms

## Recommended Hosting Shape

Drupal should run on PHP hosting with a database, not the current Vercel static frontend setup.

Use one of these:

- Managed Drupal hosting
- cPanel/PHP hosting with MySQL or MariaDB
- VPS with Nginx or Apache, PHP, Composer, and MariaDB
- Local development with DDEV once Docker is available

## First Local Install Command

Run this only after PHP and Composer are installed:

```powershell
composer create-project drupal/recommended-project orbitl-drupal
cd orbitl-drupal
composer require drush/drush drupal/webform drupal/pathauto drupal/metatag drupal/admin_toolbar
```

Then copy the starter theme from:

```text
cms/drupal/themes/orbitl_theme
```

into:

```text
orbitl-drupal/web/themes/custom/orbitl_theme
```

## Content Types To Create

Create these Drupal content types first:

- Page: for Home, About, Mission, Contact, and static information.
- News: for blog/news updates.
- Project: for satellite projects, milestones, subsystems, and lab work.
- Team Member: optional, for public team profiles.

## Keep The Vercel Site Live

Do not remove the current `web/` app until the Drupal site has:

- Home page
- About page
- Mission page
- News listing
- Contact form
- Join/application form
- Admin login tested
- Domain tested on a staging URL

