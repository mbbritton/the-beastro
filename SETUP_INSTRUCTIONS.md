# Setup Instructions

## Prerequisites

You need Node.js installed to run this project. Choose one of these installation methods:

### Option 1: Homebrew (Recommended)
```bash
# Install Homebrew first
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then install Node.js
brew install node
```

### Option 2: Direct Download
1. Visit https://nodejs.org/
2. Download the LTS version for macOS
3. Run the installer
4. Restart your terminal

### Option 3: NVM (Node Version Manager)
```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Install Node.js
nvm install 18
nvm use 18
```

## Verify Installation

After installing Node.js, verify it's working:

```bash
node --version
npm --version
```

You should see version numbers (e.g., v18.x.x).

## Project Setup

Once Node.js is installed:

```bash
# Navigate to project directory
cd /Users/brittonm/CascadeProjects/the-beastro

# Install dependencies
npm install

# Run tests
npm test

# Install Playwright browsers (for E2E tests)
npx playwright install

# Run E2E tests
npm run test:e2e

# Build for production
npm run build

# Start development server
npm run serve
```

## Troubleshooting

### "npm not found" after installation
1. Restart your terminal
2. Try running `source ~/.zshrc` or `source ~/.bash_profile`
3. Verify Node.js is in your PATH: `which node`

### Permission errors
```bash
# If you get permission errors, you might need to fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

### Playwright browser installation issues
```bash
# If Playwright browsers fail to install:
npx playwright install-deps
npx playwright install
```

## Development Workflow

1. Make changes to code
2. Run `npm test` for unit tests
3. Run `npm run test:e2e` for end-to-end tests
4. Run `npm run build` to create production files
5. Run `npm run serve` to test locally
6. Check `IMPLEMENTATION_SUMMARY.md` for deployment instructions

## Support

If you encounter issues:
1. Check Node.js is installed: `node --version`
2. Check npm is working: `npm --version`
3. Check you're in the right directory: `pwd`
4. See the full documentation in README.md and IMPLEMENTATION_SUMMARY.md
