# Forkaway 🧹

A CLI tool to help you clean up your GitHub fork repositories efficiently.

## Features ✨

- 🔍 List all your fork repositories
- 🗑️ Delete multiple forks at once
- ✅ Interactive selection with visual feedback
- 📊 Progress tracking with status bars
- 🎯 Bulk or selective deletion options
- 🔒 Secure GitHub token handling
- 💫 Beautiful CLI interface

## Prerequisites 📋

- Node.js (v16 or higher)
- GitHub account
- GitHub Personal Access Token with required permissions

## Installation 🚀

```bash
npm install -g forkaway
```

## Setup 🔧

1. Generate a GitHub token at https://github.com/settings/tokens
2. Enable these permissions:
   - `repo` (Full control of private repositories)
   - `delete_repo` (Delete repositories)
3. Add the token to your shell configuration:

   For zsh:
   ```bash
   echo 'export GITHUB_TOKEN=your_token' >> ~/.zshrc
   source ~/.zshrc
   ```

   For bash:
   ```bash
   echo 'export GITHUB_TOKEN=your_token' >> ~/.bashrc
   source ~/.bashrc
   ```

## Usage 💻

Simply run:
```bash
forkaway
```

The interactive CLI will guide you through:
1. Scanning your GitHub account for forks
2. Choosing between:
   - Deleting all forks (with safety confirmations)
   - Selecting specific forks to delete
3. Reviewing selected repositories
4. Confirming and executing deletions with progress tracking

## Visual Feedback 📊

- Progress bars show deletion status
- Spinners indicate active operations
- Color-coded success/failure messages
- Detailed error reporting
- Operation summary at completion

## Safety Features 🛡️

- Multiple confirmations for bulk deletions
- Review step before final deletion
- Clear error messages
- Ability to cancel at any point

## Contributing 🤝

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Write or update tests
5. Commit using conventional commits:
   ```bash
   # Examples:
   git commit -m "feat: add new cleanup option"
   git commit -m "fix: handle error in fork deletion"
   git commit -m "docs: update installation guide"
   ```
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/). This helps us automatically generate changelogs and version numbers. Common types:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `test:` Adding or updating tests
- `refactor:` Code changes that neither fix bugs nor add features
- `chore:` Changes to build process or auxiliary tools

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/bismarkhenao/forkaway.git
   cd forkaway
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

### Automated Workflows

- Tests run automatically on Pull Requests
- When PRs are merged to main:
  1. Version is automatically bumped based on commit messages
  2. Changelog is automatically updated
  3. New version is published to npm

## License 📄

MIT

## Support 💪

If you encounter any issues or have questions:
- Open an issue at: https://github.com/bismarkhenao/forkaway/issues
- Provide detailed information about the problem
- Include any error messages 