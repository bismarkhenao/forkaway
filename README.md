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

- Node.js (v18 or higher)
- GitHub Personal Access Token (will be prompted during first run)

## Installation 🚀

### Option 1: Using npm (recommended)
```bash
npm install -g forkaway
```

### Option 2: Using curl (universal install)
```bash
curl -o- https://raw.githubusercontent.com/bismarkhenao/forkaway/main/install.sh | bash
```
or using wget:
```bash
wget -qO- https://raw.githubusercontent.com/bismarkhenao/forkaway/main/install.sh | bash
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

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for detailed instructions on how to:

- Set up your development environment
- Make changes
- Run tests
- Submit pull requests
- Follow our coding standards

## License 📄

MIT

## Support 💪

If you encounter any issues or have questions:
- Open an issue at: https://github.com/bismarkhenao/forkaway/issues
- Provide detailed information about the problem
- Include any error messages 