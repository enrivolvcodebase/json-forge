# Publishing to NPM

## Package Name: @enrivol/json-forge

### Why "json-forge"?

The name **"json-forge"** was carefully chosen to:

1. **Convey Purpose**: "Forge" represents crafting, creating, and building - perfect for a tool that forges robust models from raw JSON
2. **Professional Image**: Suggests reliability, quality craftsmanship, and industrial strength
3. **Brand Recognition**: Easy to remember, pronounce, and search for
4. **Market Appeal**: Sounds professional and enterprise-ready
5. **SEO-Friendly**: Great for NPM package discovery

### Scoped Package Benefits

Using `@enrivol/json-forge` provides:
- **Brand Association**: Links directly to Enrivol IT Company
- **Name Availability**: Easier to get preferred names
- **Professional Appearance**: Shows organizational backing
- **Trust Factor**: Users trust scoped packages from known companies

## Pre-Publishing Checklist

Before publishing to NPM, ensure:

- [ ] All tests pass: `npm test`
- [ ] Build succeeds: `npm run build`
- [ ] Package.json version is correct
- [ ] README.md is complete
- [ ] LICENSE file is present
- [ ] CHANGELOG.md is updated
- [ ] .npmignore or files field is configured
- [ ] You're logged into NPM: `npm login`

## Publishing Steps

### 1. Initial Setup

```bash
# Login to NPM (if not already logged in)
npm login

# Verify you're logged in
npm whoami
```

### 2. Prepare the Package

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Check what will be published
npm pack --dry-run
```

### 3. Publish to NPM

```bash
# For first-time publish
npm publish --access public

# For updates
npm version patch  # or minor, or major
npm publish
```

### 4. Verify Publication

```bash
# Check on NPM
npm view @enrivol/json-forge

# Install and test
mkdir test-install
cd test-install
npm init -y
npm install @enrivol/json-forge
```

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes, backward compatible

```bash
# Patch release (1.0.0 -> 1.0.1)
npm version patch

# Minor release (1.0.0 -> 1.1.0)
npm version minor

# Major release (1.0.0 -> 2.0.0)
npm version major
```

## Marketing the Package

### NPM Keywords

The package includes optimized keywords:
- json, parser, typescript, javascript
- model-generator, code-generation
- type-safe, json-to-model
- schema, enrivol

### GitHub Repository

- Create GitHub repo: `https://github.com/enrivol/json-forge`
- Add badges to README
- Set up GitHub Actions for CI/CD
- Enable GitHub Discussions for community

### Promotion Channels

1. **NPM Registry**: Automatically listed
2. **GitHub**: Star, watch, fork features
3. **Dev.to / Medium**: Write introduction article
4. **Reddit**: r/typescript, r/javascript
5. **Twitter/X**: Announce release
6. **LinkedIn**: Company announcement

## Support and Maintenance

- Monitor GitHub issues
- Respond to user questions
- Regular updates and security patches
- Maintain documentation
- Build community around the package

## Success Metrics

Track:
- Weekly downloads on NPM
- GitHub stars and forks
- Issue resolution time
- Community engagement
- Package dependents

---

**Good luck with your NPM package launch!**

Built with ❤️ by Enrivol IT Company
