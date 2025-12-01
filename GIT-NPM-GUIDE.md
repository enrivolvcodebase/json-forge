# Git and NPM Publishing Guide

## Current Status
✅ Git repository initialized
✅ All files committed locally
✅ Remote origin configured: https://github.com/enrivolv/json-forge.git

## Step 1: Create GitHub Repository

### Option A: Via GitHub Website
1. Go to: https://github.com/new
2. Settings:
   - Repository name: `json-forge`
   - Owner: `enrivolv`
   - Description: "A powerful JSON parser and TypeScript/JavaScript model generator"
   - Visibility: **Public** (required for NPM)
   - **DO NOT** initialize with README, .gitignore, or license (already included)
3. Click "Create repository"

### Option B: If you have personal access token
You can authenticate and push directly:
```powershell
git push -u origin master
```
(You'll be prompted for username and password/token)

## Step 2: Push to GitHub

Once the repository is created on GitHub, run:

```powershell
# Push the code
git push -u origin master

# Verify it was pushed
git remote show origin
```

## Step 3: Prepare for NPM Publishing

### 3.1: Update package.json version if needed
The current version is 1.0.0 - keep it or update:
```powershell
npm version patch  # For bug fixes (1.0.0 -> 1.0.1)
npm version minor  # For new features (1.0.0 -> 1.1.0)
npm version major  # For breaking changes (1.0.0 -> 2.0.0)
```

### 3.2: Build the project
```powershell
npm run build
```

### 3.3: Test before publishing
```powershell
npm test
```

### 3.4: Login to NPM
```powershell
npm login
```
You'll need:
- NPM username
- Password
- Email
- 2FA code (if enabled)

### 3.5: Publish to NPM
```powershell
# For scoped package (@enrivolv/json-forge), make it public
npm publish --access public
```

## Step 4: Verify Publication

After publishing:
1. Check NPM: https://www.npmjs.com/package/@enrivolv/json-forge
2. Test installation: `npm install @enrivolv/json-forge`

## Quick Commands Reference

```powershell
# Push to GitHub (after creating repo on GitHub)
git push -u origin master

# Build project
npm run build

# Run tests
npm test

# Login to NPM
npm login

# Publish to NPM
npm publish --access public

# Create a git tag for the version
git tag v1.0.0
git push origin v1.0.0
```

## Troubleshooting

### GitHub Authentication Issues
If you get authentication errors:
1. Use Personal Access Token (PAT) instead of password
2. Generate token at: https://github.com/settings/tokens
3. Scopes needed: `repo`, `write:packages`
4. Use token as password when prompted

### NPM Publishing Issues
- Ensure you're logged in: `npm whoami`
- Package name not available? Check if name is taken: https://www.npmjs.com/package/@enrivolv/json-forge
- Need to update package name in package.json if taken

## After Publishing

1. Create a GitHub Release:
   - Go to: https://github.com/enrivolv/json-forge/releases/new
   - Tag: v1.0.0
   - Title: "v1.0.0 - Initial Release with Nested Structures Support"
   - Description: Use content from CHANGELOG.md

2. Update README badges (they'll work after publishing)

3. Share the package:
   - NPM: https://www.npmjs.com/package/@enrivolv/json-forge
   - GitHub: https://github.com/enrivolv/json-forge

## Current Files Status
- ✅ All source files committed
- ✅ Tests passing (15/15)
- ✅ Documentation complete
- ✅ Examples included
- ✅ Package ready for publishing
