# Contributing to Forkaway 🤝

Thank you for your interest in contributing to Forkaway! This document provides guidelines and instructions for contributing.

## Development Setup 🛠️

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/forkaway.git
   cd forkaway
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment**
   - Follow the README.md instructions to set up your GitHub token
   - The token needs `repo` and `delete_repo` permissions

4. **Run in Development**
   ```bash
   npm run dev
   ```

## Project Structure 📁

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

## Pull Request Process 📝

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary
   - Update documentation if needed

3. **Test Your Changes**
   - Ensure the code runs without errors
   - Test edge cases
   - Verify error handling

4. **Commit Your Changes**
   ```bash
   git commit -m "Add: brief description of your changes"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

## Code Style Guidelines 📋

- Use TypeScript features appropriately
- Follow consistent naming conventions
- Add type definitions where needed
- Keep functions focused and modular
- Use meaningful variable names
- Add error handling for API calls

## Testing 🧪

- Test your changes thoroughly
- Consider edge cases
- Verify error scenarios
- Test with different GitHub configurations

## Documentation 📚

When adding or modifying features:
- Update README.md if needed
- Add JSDoc comments for functions
- Update usage examples
- Document any new dependencies

## Questions or Problems? 🤔

- Check existing issues first
- Open a new issue if needed
- Provide detailed information
- Include error messages and logs

## License 📄

By contributing, you agree that your contributions will be licensed under the MIT License. 