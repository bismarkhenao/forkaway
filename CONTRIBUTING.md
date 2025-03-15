# Contributing to Forkaway

First off, thank you for considering contributing to Forkaway! It's people like you that make Forkaway such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps which reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- Use a clear and descriptive title
- Provide a step-by-step description of the suggested enhancement
- Provide specific examples to demonstrate the steps
- Describe the current behavior and explain which behavior you expected to see instead
- Explain why this enhancement would be useful

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

1. Clone the repository:
   ```bash
   git clone https://github.com/bismarkhenao/forkaway.git
   cd forkaway
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a branch:
   ```bash
   git checkout -b feature/my-feature
   # or
   git checkout -b fix/my-fix
   ```

4. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/my-feature
   ```

### Commit Messages

We follow conventional commits for our commit messages:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that do not affect the meaning of the code
- `refactor:` - A code change that neither fixes a bug nor adds a feature
- `perf:` - A code change that improves performance
- `test:` - Adding missing tests or correcting existing tests
- `chore:` - Changes to the build process or auxiliary tools

Example: `feat: add support for GitHub Enterprise`

### TypeScript Style Guide

- Use TypeScript's strict mode
- Define types for all variables and function parameters
- Use interfaces for object shapes
- Use enums for fixed sets of values
- Document public APIs with JSDoc comments

### Testing

- Write unit tests for new features
- Update tests when you change existing functionality
- Run the test suite before submitting a PR:
  ```bash
  npm test
  ```

### Documentation

- Update the README.md if you change functionality
- Comment your code where necessary
- Use JSDoc for function documentation
- Keep the API documentation up to date

## Project Structure

```
forkaway/
├── src/             # Source code
├── dist/            # Compiled code
├── tests/           # Test files
├── .github/         # GitHub specific files
├── docs/            # Documentation
└── package.json     # Project manifest
```

## Questions?

Feel free to open an issue with the tag `question` if you have any questions about contributing.

## License

By contributing, you agree that your contributions will be licensed under its MIT License. 