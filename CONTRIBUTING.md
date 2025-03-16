# Contributing to Forkaway

Thank you for your interest in contributing to Forkaway! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

## Development Process

1. **Fork & Clone**
   ```bash
   git clone https://github.com/your-username/forkaway.git
   cd forkaway
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Development**
   - Write code following the project's style
   - Add tests for new features
   - Run tests locally: `npm test`
   - Use TypeScript for type safety

5. **Commit Changes**
   We use [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "type(scope): description"
   ```
   Types:
   - feat: New feature
   - fix: Bug fix
   - docs: Documentation changes
   - test: Adding/updating tests
   - refactor: Code changes (no fixes/features)
   - chore: Build process/tool changes

6. **Push & Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub.

## Pull Request Process

1. **Title**: Use conventional commit format
   - Example: "feat: add bulk deletion confirmation"

2. **Description**:
   - What changes were made
   - Why these changes are needed
   - How to test the changes
   - Screenshots (if UI changes)

3. **Review Process**:
   - Automated tests must pass
   - Code review required
   - Changes requested must be addressed
   - Approval needed before merge

4. **After Merge**:
   - Version bumped automatically
   - Changelog updated
   - Published to npm

## Testing

- Write tests for new features
- Update tests for changes
- Ensure all tests pass locally
- Test files go in `src/__tests__`

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for functions
- Update CHANGELOG.md (done automatically)

## Questions?

Open an issue or ask in the PR comments. We're here to help!

## Project Structure ��

```
forkaway/
├── src/               # Source code
│   └── index.ts      # Main application file
├── dist/             # Compiled code
├── node_modules/     # Dependencies
├── .gitignore       # Git ignore rules
├── package.json     # Project configuration
├── tsconfig.json    # TypeScript configuration
└── README.md        # Documentation
```

## Features and Improvements 🎯

Current features include:
- Fork repository listing
- Bulk deletion with confirmations
- Individual fork selection
- Progress tracking with status bars
- Error handling and reporting

Areas for potential improvement:
- Search functionality
- Sorting and filtering options
- Batch operations
- Additional safety features

## Code Style Guidelines 📋

- Use TypeScript features appropriately
- Follow consistent naming conventions
- Add type definitions where needed
- Keep functions focused and modular
- Use meaningful variable names
- Add error handling for API calls

## License 📄

By contributing, you agree that your contributions will be licensed under the MIT License. 