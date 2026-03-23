# 🏛️ Art Vault

Art Vault is a web application that lets you explore and discover 
artworks from The Metropolitan Museum of Art's open collection of 
over 471,000 pieces spanning 5,000 years of human history.

## Purpose
To make world-class art accessible and explorable through an 
interactive, filterable, and searchable interface — right in the browser.

## API Used
**The Metropolitan Museum of Art Collection API**  
https://metmuseum.github.io/  
Free and open access. No authentication or API key required.

## Features Planned

### Milestone 2 — API Integration
- Search artworks across the full Met collection by keyword
- Display artwork cards with image, title, artist, department, and year
- Batch fetch artwork details using Promise.all() for parallel requests
- Loading indicator while data is being fetched
- Responsive grid layout across mobile, tablet, and desktop

### Milestone 3 — Core Features
- Filter results by department (e.g. Egyptian Art, Modern Art, Asian Art)
- Sort artworks by creation year (oldest to newest / newest to oldest)
- Search within loaded results by title or artist name
- Dark / Light mode toggle with saved preference via localStorage

### Milestone 4 — Deployment & Finalisation
- Fully updated documentation
- Deployed and accessible via a live URL

## Technologies
- HTML
- CSS
- JavaScript
- Metropolitan Museum of Art REST API

## Setup and Running
No installation or build steps required.

1. Clone the repository:
   git clone https://github.com/vishal-k-crypto/art-vault

2. Open index.html in any modern web browser.

That's it — the app runs entirely in the browser with no dependencies.