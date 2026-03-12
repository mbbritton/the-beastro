# The Beastro

Every pet has a flavor. Let's find yours.

A one-of-a-kind dining experience web application where our chef studies your pet's soul and crafts a dish worthy of their entire personality.

## Features

- 🐾 Pet questionnaire for personalized dining experience
- 👨‍🍳 Gallery of pet-inspired culinary creations
- 🍽️ Responsive, accessible design
- 🔒 Security-hardened with CSP and input sanitization
- ✅ Comprehensive test coverage
- ⚡ Optimized for performance

## Setup

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start local development server
npm run dev

# Server will be available at http://localhost:8080
```

### Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run end-to-end tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

### Building for Production

```bash
# Build minified CSS and JS
npm run build

# Minified files will be in dist/
```

### Performance Testing

```bash
# Run Lighthouse performance audit
npm run lighthouse
```

## Project Structure

```
the-beastro/
├── index.html          # Main HTML file
├── style.css           # Styles
├── app.js              # Application logic
├── data.js             # Pet data
├── public/             # Static assets
│   └── images/         # Pet images
├── tests/              # Test files
│   ├── unit/           # Jest unit tests
│   └── e2e/            # Playwright E2E tests
├── dist/               # Built/minified files
└── _headers            # Security headers config
```

## Deployment

This application is designed for static hosting on platforms like:
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

Security headers are configured in `_headers` for Netlify/Cloudflare or `.htaccess` for Apache servers.

## Security

- Content Security Policy (CSP) implemented
- HTML sanitization with DOMPurify
- Form input validation and sanitization
- Security headers configured
- No inline event handlers

See [SECURITY.md](SECURITY.md) for details.

## Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- Focus management
- Proper ARIA labels

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT
