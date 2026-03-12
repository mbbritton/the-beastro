# Testing Documentation

## Overview

The Beastro application has comprehensive test coverage including unit tests, end-to-end tests, and accessibility tests.

## Test Structure

```
tests/
├── unit/               # Jest unit tests
│   ├── app.test.js     # Application logic tests
│   └── utils.test.js   # Utility function tests
└── e2e/                # Playwright E2E tests
    ├── navigation.spec.js    # Navigation flow tests
    ├── form.spec.js          # Form submission tests
    ├── gallery.spec.js       # Pet gallery tests
    ├── accessibility.spec.js # Accessibility tests
    └── performance.spec.js   # Performance tests
```

## Running Tests

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### End-to-End Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run specific test file
npx playwright test tests/e2e/form.spec.js

# Run tests in a specific browser
npx playwright test --project=chromium
```

## Test Coverage Goals

- **Unit Tests**: 80%+ code coverage
- **E2E Tests**: All critical user paths covered
- **Accessibility**: WCAG 2.1 AA compliance

## Writing Tests

### Unit Test Example

```javascript
describe('SecurityUtils', () => {
  test('should sanitize HTML input', () => {
    const input = '<script>alert("xss")</script>';
    const result = SecurityUtils.sanitizeText(input);
    expect(result).not.toContain('<script>');
  });
});
```

### E2E Test Example

```javascript
test('should submit form successfully', async ({ page }) => {
  await page.goto('/');
  await page.fill('#petName', 'Fluffy');
  await page.click('button[type="submit"]');
  await expect(page.locator('#qSuccess')).toBeVisible();
});
```

## Test Categories

### 1. Unit Tests

Test individual functions and utilities in isolation:
- HTML sanitization
- Form validation
- Input length limits
- Accessibility utilities
- Performance utilities

### 2. Integration Tests

Test how components work together:
- Form submission flow
- Pet card rendering
- Navigation interactions

### 3. End-to-End Tests

Test complete user workflows:
- Navigating through the site
- Filling and submitting forms
- Viewing pet gallery
- Mobile navigation

### 4. Accessibility Tests

Ensure WCAG compliance:
- Keyboard navigation
- Screen reader support
- ARIA attributes
- Focus management
- Heading hierarchy

### 5. Performance Tests

Verify performance standards:
- Page load time
- Image lazy loading
- Resource optimization
- Scroll performance

## Continuous Integration

Tests run automatically on:
- Every push to main/develop branches
- Every pull request
- Pre-deployment validation

See `.github/workflows/ci.yml` for CI/CD configuration.

## Test Fixtures

Test data is defined in:
- `tests/unit/app.test.js` - Mock PETS data
- Real data from `data.js` used in E2E tests

## Debugging Tests

### Unit Tests

```bash
# Run tests in debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

### E2E Tests

```bash
# Run with headed browser (see what's happening)
npx playwright test --headed

# Run with debug mode
npx playwright test --debug

# Generate trace
npx playwright test --trace on
```

## Coverage Reports

After running `npm run test:coverage`, view the report:

```bash
open coverage/lcov-report/index.html
```

## Best Practices

1. **Test Naming**: Use descriptive test names that explain what is being tested
2. **Isolation**: Each test should be independent
3. **Setup/Teardown**: Use `beforeEach` and `afterEach` for setup
4. **Assertions**: Make clear, specific assertions
5. **Edge Cases**: Test both happy path and error cases
6. **Accessibility**: Include accessibility checks in E2E tests

## Common Issues

### Playwright browser not installed
```bash
npx playwright install
```

### Port 8080 already in use
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

### Tests timing out
Increase timeout in test file:
```javascript
test.setTimeout(30000); // 30 seconds
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
