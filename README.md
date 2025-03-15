# Forkaway

A TypeScript CLI tool to manage and remove your GitHub fork repositories safely and interactively.

## Features

- 🔍 Lists all your GitHub fork repositories
- ✅ Interactive selection of forks to delete
- 🛡️ Confirmation step before deletion
- 🔒 Secure token management via environment variables
- 🎯 Only shows fork repositories (not original repositories)
- 📋 Interactive multi-select interface
- ⚡ Fast and efficient GitHub API usage

## Installation

```bash
npm install -g forkaway
```

## Setup

1. Create a GitHub Personal Access Token:
   1. Go to GitHub Settings > Developer settings > [Personal access tokens](https://github.com/settings/tokens)
   2. Click "Generate new token (classic)"
   3. Give it a name (e.g., "Fork Remover")
   4. **Required Permissions (Scopes):**
      - `repo` (Full control of private repositories)
      - `delete_repo` (Delete repositories)
      > ⚠️ **Important**: The `delete_repo` scope is REQUIRED to delete repositories. Without this scope, the deletion operations will fail with a 403 error.
   5. Click "Generate token"
   6. Copy the token (you won't be able to see it again!)

2. Add the token to your shell configuration:

   **For zsh users (recommended):**
   ```bash
   echo 'export GITHUB_TOKEN=your_github_personal_access_token' >> ~/.zshrc
   source ~/.zshrc
   ```

   **For bash users:**
   ```bash
   echo 'export GITHUB_TOKEN=your_github_personal_access_token' >> ~/.bashrc
   source ~/.bashrc
   ```

   > 🔒 **Security Note**: Storing the token in your shell configuration is more secure than keeping it in project files, as it prevents accidental commits of sensitive information.

## Usage

### Basic Usage

Simply run:
```bash
forkaway
```

### Interactive Interface

When you run `forkaway`, you'll see an interactive interface that:

1. 🔄 **Lists Your Forks**
   - Shows all your fork repositories
   - Displays repository names and descriptions
   - Only includes actual forks (not original repositories)

2. ✨ **Selection Interface**
   - Use arrow keys (↑/↓) to navigate
   - Press SPACE to select/deselect repositories
   - Press A to select all
   - Press I to invert selection
   - Press ENTER when done selecting

3. ✅ **Confirmation Step**
   - Reviews your selection
   - Shows how many forks will be deleted
   - Requires explicit confirmation to proceed

4. 📊 **Progress Display**
   - Shows real-time progress of deletions
   - Indicates success (✅) or failure (❌) for each operation
   - Provides immediate feedback

### Example Session

```bash
$ forkaway

Fetching your fork repositories...
Found 5 fork repositories.

? Select the forks you want to delete:
❯ ◯ user/old-project-fork (A fork of a deprecated project)
  ◯ user/test-fork (Testing repository)
  ◯ user/outdated-library-fork (Old library fork)
  ◯ user/prototype-fork (Project prototype)
  ◯ user/example-fork (Example implementation)

[Space to select, A to toggle all, I to invert selection]

? Are you sure you want to delete 3 fork(s)? (y/N)

Deleting selected forks...
Deleting user/old-project-fork... ✅
Deleting user/test-fork... ✅
Deleting user/outdated-library-fork... ✅

Operation completed.
```

### When to Use

Use `forkaway` when you want to:
- Clean up old and unused fork repositories
- Remove multiple forks in bulk
- Safely manage your GitHub forks
- Declutter your GitHub profile

### Best Practices

1. 🔍 **Review Carefully**: Always double-check the repositories you're about to delete
2. 🔄 **Recent Changes**: Consider checking if you have any unpushed changes before deleting
3. 🔒 **Token Security**: Never share or expose your GitHub token
4. ⚠️ **Permanent Action**: Remember that deletion is permanent and cannot be undone

## Development

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

## Troubleshooting

### Common Issues

1. **"Must have admin rights to Repository" Error**
   - This means your token doesn't have the `delete_repo` scope
   - Solution: Generate a new token with both `repo` and `delete_repo` scopes

2. **"Not Found" Error**
   - This could mean the token doesn't have the `repo` scope
   - Solution: Ensure your token has the `repo` scope enabled

3. **"Bad Credentials" Error**
   - This means your token is invalid or expired
   - Solution: Generate a new token and update it in your shell configuration

4. **Token Not Found Error**
   - This means the `GITHUB_TOKEN` environment variable is not set
   - Solution: Make sure you've added the export command to your shell configuration and sourced it

### Still Having Issues?

- Check our [Issues page](https://github.com/bismarkhenao/forkaway/issues) for known problems
- Open a new issue if you encounter an unreported problem
- Make sure you're using a supported Node.js version (>=16)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

If you find this tool helpful, please consider:
- Starring the repository ⭐
- Sharing it with others 🔄
- Contributing to its development 🛠️ 