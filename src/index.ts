#!/usr/bin/env node

import { Octokit } from 'octokit';
import inquirer from 'inquirer';
import inquirerAutocomplete from 'inquirer-autocomplete-prompt';
import chalk from 'chalk';

// Register the autocomplete prompt
inquirer.registerPrompt('autocomplete', inquirerAutocomplete);

// Get GitHub token from environment variables
const githubToken = process.env.GITHUB_TOKEN;

if (!githubToken) {
  console.log(chalk.cyan('\n📦 Welcome to Forkaway - Your GitHub Fork Manager'));
  console.log(chalk.cyan('─'.repeat(50)));
  console.error(chalk.red.bold('\n❌ Configuration Error: GITHUB_TOKEN not found'));
  console.error(chalk.yellow('\nTo get started, you need to:'));
  console.error(chalk.cyan('1. 🔑 Generate a token at https://github.com/settings/tokens'));
  console.error(chalk.cyan('2. 🔒 Enable these permissions:'));
  console.error(chalk.gray('   • repo (Full control of private repositories)'));
  console.error(chalk.gray('   • delete_repo (Delete repositories)'));
  console.error(chalk.cyan('3. 💻 Add this to your shell configuration:'));
  console.error(chalk.gray('\n   For zsh:'));
  console.error(chalk.white('   echo \'export GITHUB_TOKEN=your_token\' >> ~/.zshrc'));
  console.error(chalk.gray('\n   For bash:'));
  console.error(chalk.white('   echo \'export GITHUB_TOKEN=your_token\' >> ~/.bashrc'));
  console.error(chalk.cyan('4. 🔄 Reload your configuration:'));
  console.error(chalk.white('   source ~/.zshrc  # or source ~/.bashrc\n'));
  console.log(chalk.cyan('─'.repeat(50)));
  process.exit(1);
}

const octokit = new Octokit({
  auth: githubToken
});

interface Repository {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
}

interface GithubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
}

async function getForksList(): Promise<Repository[]> {
  try {
    console.log(chalk.blue('\n🔍 Scanning your GitHub account for forks...'));
    const response = await octokit.request('GET /user/repos', {
      affiliation: 'owner',
      sort: 'updated',
      per_page: 100,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    const forks = response.data
      .filter((repo: GithubRepo) => repo.fork)
      .map((repo: GithubRepo) => ({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        fork: repo.fork
      }));

    return forks;
  } catch (error) {
    console.error(chalk.red('\n❌ Error accessing GitHub:'), error);
    console.log(chalk.yellow('\n👉 Tips:'));
    console.log(chalk.gray('• Verify your internet connection'));
    console.log(chalk.gray('• Check if your token has the correct permissions'));
    console.log(chalk.gray('• Ensure GitHub services are available\n'));
    return [];
  }
}

async function deleteFork(fullName: string): Promise<boolean> {
  try {
    const [owner, repo] = fullName.split('/');
    await octokit.request('DELETE /repos/{owner}/{repo}', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    return true;
  } catch (error) {
    console.error(chalk.red(`Error deleting fork ${fullName}:`), error);
    return false;
  }
}

const CONFIRMATION_PHRASE = "I'm sure I want to delete all forks";

async function confirmDeleteAll(forksCount: number): Promise<boolean> {
  console.log(chalk.bgRed.white.bold('\n⚠️  CAUTION: Mass Deletion Requested'));
  console.log(chalk.cyan('─'.repeat(50)));
  console.log(chalk.red.bold('🗑️  You are about to delete ALL your fork repositories!'));
  console.log(chalk.yellow(`📊 Total repositories affected: ${chalk.bold(forksCount)}`));
  console.log(chalk.red('\n⚠️  This action:'));
  console.log(chalk.gray('• Cannot be undone'));
  console.log(chalk.gray('• Will permanently delete all selected forks'));
  console.log(chalk.gray('• May affect your project references'));
  
  console.log(chalk.cyan('\n🔒 Security Verification Required'));
  console.log(chalk.yellow(`Please type: ${chalk.bold.white('"' + CONFIRMATION_PHRASE + '"')}`));

  const { confirmPhrase } = await inquirer.prompt([
    {
      type: 'input',
      name: 'confirmPhrase',
      message: chalk.yellow('➤ Confirmation phrase:'),
      validate: (input: string) => {
        if (input === CONFIRMATION_PHRASE) {
          return true;
        }
        return chalk.red('❌ Phrase does not match. Please try again.');
      }
    }
  ]);

  if (confirmPhrase === CONFIRMATION_PHRASE) {
    const { finalConfirmation } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'finalConfirmation',
        message: chalk.bgRed.white.bold('🚨 Final Warning: Proceed with deleting ALL forks?'),
        default: false
      }
    ]);

    return finalConfirmation;
  }

  return false;
}

async function main() {
  console.log(chalk.cyan('\n📦 Welcome to Forkaway - Your GitHub Fork Manager'));
  console.log(chalk.cyan('─'.repeat(50)));
  console.log(chalk.blue('\n🔍 Scanning your GitHub account...'));
  
  const forks = await getForksList();
  
  if (forks.length === 0) {
    console.log(chalk.yellow('\n📭 No fork repositories found in your account.'));
    console.log(chalk.gray('\nTip: Forks are created when you click the "Fork" button on a GitHub repository.'));
    return;
  }

  console.log(chalk.green(`\n✨ Found ${chalk.bold(forks.length)} fork repositories`));

  // Add search functionality
  const { searchMode } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'searchMode',
      message: chalk.yellow('\n🔍 Would you like to search through your forks?'),
      default: false
    }
  ]);

  let filteredForks = forks;
  
  if (searchMode) {
    const searchForks = async (answers: any, input = '') => {
      const searchTerm = input.toLowerCase();
      return forks.filter(fork => 
        fork.name.toLowerCase().includes(searchTerm) ||
        fork.full_name.toLowerCase().includes(searchTerm) ||
        (fork.description && fork.description.toLowerCase().includes(searchTerm))
      ).map(fork => ({
        name: `${chalk.green(fork.full_name)} ${chalk.gray('→')} ${chalk.white(fork.description || 'No description')}`,
        value: fork.full_name,
        short: fork.full_name
      }));
    };

    console.log(chalk.cyan('\n📝 Search Tips:'));
    console.log(chalk.gray('• Type to filter repositories by name or description'));
    console.log(chalk.gray('• Press Enter to see filtered results'));
    console.log(chalk.gray('• Leave empty and press Enter to see all repositories\n'));

    const { searchQuery } = await inquirer.prompt([
      {
        type: 'autocomplete',
        name: 'searchQuery',
        message: chalk.cyan('🔍 Search repositories:'),
        source: searchForks,
        pageSize: 10
      }
    ]);

    // Filter repositories based on search query
    const searchTerm = searchQuery.toLowerCase();
    filteredForks = forks.filter(fork => 
      fork.name.toLowerCase().includes(searchTerm) ||
      fork.full_name.toLowerCase().includes(searchTerm) ||
      (fork.description && fork.description.toLowerCase().includes(searchTerm))
    );

    console.log(chalk.green(`\n✨ Found ${chalk.bold(filteredForks.length)} matching repositories`));
  }

  const { deleteAll } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'deleteAll',
      message: searchMode 
        ? chalk.yellow(`\n🗑️  Delete all ${filteredForks.length} filtered repositories? (No = Select individual repos)`)
        : chalk.yellow('\n🗑️  Would you like to delete all forks? (Multiple confirmations required)'),
      default: false
    }
  ]);

  let selectedForks: string[] = [];

  if (deleteAll) {
    const confirmed = await confirmDeleteAll(searchMode ? 1 : forks.length);
    if (confirmed) {
      selectedForks = filteredForks.map(fork => fork.full_name);
    } else {
      console.log(chalk.yellow('\n↩️  Bulk deletion cancelled. Switching to selective mode...'));
    }
  }

  if (!deleteAll || selectedForks.length === 0) {
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedForks',
        message: chalk.cyan('\n📋 Select repositories to delete (Space to select, Enter to confirm):'),
        choices: filteredForks.map(fork => ({
          name: `${chalk.green(fork.full_name)} ${chalk.gray('→')} ${chalk.white(fork.description || 'No description')}`,
          value: fork.full_name
        }))
      }
    ]);

    selectedForks = answers.selectedForks as string[];
  }

  if (selectedForks.length === 0) {
    console.log(chalk.yellow('\n📭 No repositories selected for deletion.'));
    console.log(chalk.gray('Tip: Use space bar to select repositories, and Enter to confirm.'));
    return;
  }

  console.log(chalk.cyan('\n📋 Review Selected Repositories'));
  console.log(chalk.cyan('─'.repeat(50)));
  
  const selectedRepos = forks.filter(fork => selectedForks.includes(fork.full_name));
  selectedRepos.forEach((fork, index) => {
    console.log(chalk.yellow(`\n${index + 1}. ${chalk.bold(fork.full_name)}`));
    if (fork.description) {
      console.log(chalk.gray(`   📝 ${fork.description}`));
    }
    console.log(chalk.blue(`   🔗 ${fork.html_url}`));
  });
  
  console.log(chalk.cyan('\n' + '─'.repeat(50)));
  console.log(chalk.yellow(`📊 Total selected: ${chalk.bold(selectedForks.length)} repositories`));

  const confirmAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: chalk.red.bold('\n⚠️  Confirm Deletion'),
      default: false
    }
  ]);

  if (!confirmAnswer.confirm) {
    console.log(chalk.yellow('\n✋ Operation cancelled. No repositories were deleted.'));
    return;
  }

  console.log(chalk.cyan('\n🗑️  Processing Deletion...'));
  
  let successCount = 0;
  let failCount = 0;
  
  for (const fullName of selectedForks) {
    process.stdout.write(chalk.cyan(`\n📦 ${chalk.bold(fullName)} `));
    const success = await deleteFork(fullName);
    if (success) {
      console.log(chalk.green('✅ Deleted'));
      successCount++;
    } else {
      console.log(chalk.red('❌ Failed'));
      failCount++;
    }
  }

  console.log(chalk.cyan('\n─'.repeat(50)));
  console.log(chalk.green.bold('\n✨ Operation Summary:'));
  console.log(chalk.green(`✅ Successfully deleted: ${successCount} repositories`));
  if (failCount > 0) {
    console.log(chalk.red(`❌ Failed to delete: ${failCount} repositories`));
  }
  console.log(chalk.cyan('\nThank you for using Forkaway! 👋\n'));
}

main().catch(error => {
  console.error(chalk.red.bold('\n❌ An unexpected error occurred:'));
  console.error(chalk.red(error));
  console.log(chalk.yellow('\n👉 Need help? Open an issue at:'));
  console.log(chalk.blue('https://github.com/bismarkhenao/forkaway/issues\n'));
  process.exit(1);
}); 