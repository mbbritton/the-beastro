# Contributing to The Beastro

Thank you for your interest in contributing to The Beastro! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/the-beastro.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### 1. Setup

```bash
npm install
npm run serve
```

The site will be available at http://localhost:8080

### 2. Make Changes

- Follow existing code style and conventions
- Write clean, readable code
- Add comments for complex logic
- Keep functions small and focused

### 3. Testing

Run tests before submitting:

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

### 4. Commit

Use clear, descriptive commit messages:

```bash
git commit -m "Add: Feature description"
git commit -m "Fix: Bug description"
git commit -m "Update: Documentation improvement"
```

### 5. Push and Submit PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Standards

### JavaScript

- Use ES6+ features
- No inline event handlers
- Sanitize all user input
- Use `const` and `let`, not `var`
- Add semicolons
- Use camelCase for variables and functions

### HTML

- Semantic HTML5 elements
- Proper accessibility attributes (ARIA)
- All form inputs have labels
- Images have alt text

### CSS

- Use CSS custom properties (variables)
- Mobile-first responsive design
- Consistent naming conventions
- No !important unless absolutely necessary

## Security Guidelines

1. **Never trust user input** - Always sanitize
2. **No inline scripts** - Use external JS files
3. **Use DOMPurify** - For any dynamic HTML
4. **Validate forms** - Both client and server-side
5. **Follow CSP** - Content Security Policy

## Accessibility Requirements

- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- Screen reader compatibility
- Proper focus management
- Color contrast ratios meet standards

## Testing Requirements

- Write unit tests for new functions
- Add E2E tests for user workflows
- Maintain 80%+ code coverage
- Test accessibility features
- All tests must pass before merging

## Pull Request Process

1. Update README.md if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update documentation
5. Request review from maintainers
6. Address review feedback
7. Squash commits if requested

## Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] No console errors
- [ ] Accessibility verified
- [ ] Security considerations addressed

## Bug Reports

When reporting bugs, include:

1. Description of the issue
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Browser/OS information

## Feature Requests

When suggesting features:

1. Describe the feature
2. Explain the use case
3. Provide examples
4. Consider security implications
5. Consider accessibility impact

## Code Review Process

- Reviews typically within 2-3 days
- Two approvals required for merge
- CI/CD tests must pass
- No merge conflicts

## Questions?

Open an issue or reach out to maintainers.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT).
