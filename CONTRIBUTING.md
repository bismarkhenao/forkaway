# Contributing to Forkaway 🤝

Thank you for your interest in contributing to Forkaway! This document provides guidelines and instructions for contributing to the project.

## Getting Started 🚀

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/forkaway.git
   cd forkaway
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup 🔧

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   # Copy the example env file
   cp .env.example .env
   
   # Edit .env and add your GitHub token
   # Required permissions: repo, delete_repo
   ```

## Available Scripts 📝

- `npm run build` - Build the project for production
- `npm start` - Build and run the CLI once
- `npm run dev` - Run in development mode with auto-rebuild
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run prepare` - Build before publishing (runs automatically on `npm install`)

## Development Workflow 💻

1. **Making Changes**
   - Make your changes in your feature branch
   - Keep changes focused and atomic
   - Follow the existing code style

2. **Testing**
   ```bash
   # Run tests
   npm test
   # Or in watch mode during development
   npm run test:watch
   ```

3. **Testing Your Changes**
   ```bash
   # Quick test
   npm start
   # Or in development mode with auto-rebuild
   npm run dev
   ```

4. **Committing Changes**
   We use [Conventional Commits](https://www.conventionalcommits.org/). Format your commit messages like this:
   ```bash
   type(scope): description
   ```
   
   Types:
   - `feat:` New features
   - `fix:` Bug fixes
   - `docs:` Documentation changes
   - `test:` Adding or updating tests
   - `refactor:` Code changes that neither fix bugs nor add features
   - `chore:` Changes to build process or auxiliary tools

   Examples:
   ```bash
   git commit -m "feat: add new cleanup option"
   git commit -m "fix: handle error in fork deletion"
   git commit -m "docs: update installation guide"
   ```

5. **Pushing Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Opening a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Submit the PR

## Development Guidelines 📋

### Code Style
- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and small

### Testing
- Write tests for new features
- Update tests for modified features
- Ensure all tests pass before submitting PR
- Use meaningful test descriptions
- Follow the existing test patterns

### Documentation
- Update README.md for user-facing changes
- Add JSDoc comments for new functions
- Update inline comments when modifying code
- Keep documentation up to date

### Pull Request Guidelines
- Keep PRs focused and small
- Include a clear description
- Reference related issues
- Add screenshots for UI changes
- Ensure CI checks pass

## Getting Help 💪

If you need help or have questions:
- Open an issue
- Join our discussions
- Check existing issues and PRs
- Review the documentation

## Code of Conduct 📜

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## License 📄

By contributing, you agree that your contributions will be licensed under the project's MIT License. 