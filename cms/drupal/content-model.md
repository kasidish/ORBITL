# ORBITL Drupal Content Model

## Page

Use for stable pages.

Fields:

- Title
- Body
- Hero subtitle
- Hero image
- CTA label
- CTA link

Suggested pages:

- Home
- About
- Mission
- Contact
- Join

## News

Use for blog-style updates.

Fields:

- Title
- Summary
- Body
- Cover image
- Published date
- Tags
- Related project

Views:

- `/news`: latest news listing
- `/news/[title]`: individual article

## Project

Use for ORBITL work streams and missions.

Fields:

- Title
- Summary
- Body
- Status
- Subsystem
- Cover image
- Gallery
- Start date
- Related news

Suggested statuses:

- Planning
- In progress
- Testing
- Completed

Suggested subsystems:

- Payload
- Structure
- OBC and FSW
- EPS
- ADCS
- Communications
- Business
- Social media

## Join Application

Best handled with Drupal Webform.

Fields:

- Full name
- Email
- University major
- Year of study
- Area of interest
- Message or motivation

Admin workflow:

- Store submissions in Drupal
- Email notification to ORBITL admins
- Export CSV from Drupal when needed

## Contact Message

Best handled with Drupal Webform.

Fields:

- Name
- Email
- Message

Admin workflow:

- Store submissions in Drupal
- Email notification to ORBITL admins
- Optional spam protection

