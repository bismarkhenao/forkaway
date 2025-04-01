// Only load .env file in non-test environments
if (process.env.NODE_ENV !== 'test') {
  import('dotenv/config').catch((err) => {
    console.error('Error loading .env file:', err);
  });
}

import { Octokit } from '@octokit/rest';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import cliProgress from 'cli-progress';
import { sanitizeErrorMessage } from '@src/utils/security';

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
  console.error(chalk.white("   echo 'export GITHUB_TOKEN=your_token' >> ~/.zshrc"));
  console.error(chalk.gray('\n   For bash:'));
  console.error(chalk.white("   echo 'export GITHUB_TOKEN=your_token' >> ~/.bashrc"));
  console.error(chalk.cyan('4. 🔄 Reload your configuration:'));
  console.error(chalk.white('   source ~/.zshrc  # or source ~/.bashrc\n'));
  console.log(chalk.cyan('─'.repeat(50)));
  process.exit(1);
}

// Create the default Octokit instance
const defaultOctokit = new Octokit({
  auth: githubToken,
});

export interface Repository {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
}

export interface GithubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
}

export const CONFIRMATION_PHRASE = 'DELETE ALL FORKS';

export async function getForksList(octokit: Octokit = defaultOctokit): Promise<Repository[]> {
  try {
    console.log(chalk.blue('\n🔍 Scanning your GitHub account for forks...'));
    let allForks: Repository[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await octokit.request('GET /user/repos', {
        affiliation: 'owner',
        sort: 'updated',
        per_page: 100,
        page,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      const forks = response.data
        .filter((repo: GithubRepo) => repo.fork)
        .map((repo: GithubRepo) => ({
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          fork: repo.fork,
        }));

      allForks = [...allForks, ...forks];
      hasMore = response.data.length === 100;
      page++;
    }

    if (allForks.length === 0) {
      console.log(chalk.yellow('\n📭 No fork repositories found in your account.'));
      console.log(
        chalk.gray(
          '\nTip: Forks are created when you click the "Fork" button on a GitHub repository.'
        )
      );
    }

    return allForks;
  } catch (error) {
    console.error(chalk.red('\n❌ Error accessing GitHub:'), sanitizeErrorMessage(error));
    console.log(chalk.yellow('\n👉 Tips:'));
    console.log(chalk.gray('• Verify your internet connection'));
    console.log(chalk.gray('• Check if your token has the correct permissions'));
    console.log(chalk.gray('• Ensure GitHub services are available\n'));
    return [];
  }
}

export async function deleteFork(
  fullName: string,
  octokit: Octokit = defaultOctokit
): Promise<{ success: boolean; error?: string }> {
  try {
    const [owner, repo] = fullName.split('/');
    await octokit.request('DELETE /repos/{owner}/{repo}', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });
    return { success: true };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    const errorMessage = err.response?.data?.message || 'Unknown error';
    console.error(chalk.red(`Error deleting fork ${fullName}:`), errorMessage);
    return { success: false, error: errorMessage };
  }
}

export async function confirmDeleteAll(forksCount: number): Promise<boolean> {
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
      },
    },
  ]);

  if (confirmPhrase === CONFIRMATION_PHRASE) {
    const { finalConfirmation } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'finalConfirmation',
        message: chalk.bgRed.white.bold('🚨 Final Warning: Proceed with deleting ALL forks?'),
        default: false,
      },
    ]);

    return finalConfirmation;
  }

  return false;
}

export async function main(octokit: Octokit = defaultOctokit) {
  console.log(chalk.cyan('\n📦 Welcome to Forkaway - Your GitHub Fork Manager'));
  console.log(chalk.cyan('─'.repeat(50)));
  console.log(chalk.blue('\n🔍 Scanning your GitHub account...'));

  const forks = await getForksList(octokit);

  if (forks.length === 0) {
    return;
  }

  console.log(chalk.green(`\n✨ Found ${chalk.bold(forks.length)} fork repositories`));

  const filteredForks = forks;

  const { deleteAll } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'deleteAll',
      message: chalk.yellow(
        '🗑️  Would you like to delete all forks? (Multiple confirmations required)'
      ),
      default: false,
    },
  ]);

  let selectedForks: string[] = [];

  if (deleteAll) {
    const confirmed = await confirmDeleteAll(forks.length);
    if (confirmed) {
      selectedForks = filteredForks.map((fork) => fork.full_name);
    } else {
      console.log(chalk.yellow('\n↩️  Bulk deletion cancelled. Switching to selective mode...'));
    }
  }

  if (!deleteAll || selectedForks.length === 0) {
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedForks',
        message: chalk.cyan(
          '📋 Select repositories to delete (Space to select, Enter to confirm):'
        ),
        choices: filteredForks.map((fork) => ({
          name: `${chalk.green(fork.full_name)} ${chalk.gray('→')} ${chalk.white(fork.description || 'No description')}`,
          value: fork.full_name,
        })),
      },
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

  const selectedRepos = forks.filter((fork) => selectedForks.includes(fork.full_name));
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
      message: chalk.red.bold('⚠️ Confirm Deletion'),
      default: false,
    },
  ]);

  if (!confirmAnswer.confirm) {
    console.log(chalk.yellow('\n✋ Operation cancelled. No repositories were deleted.'));
    return;
  }

  console.log(chalk.cyan('\n🗑️  Starting Deletion Process...'));

  const progressBar = new cliProgress.SingleBar({
    format:
      chalk.cyan('Deleting repositories |') +
      '{bar}' +
      chalk.cyan('| {percentage}% || {value}/{total} Repositories'),
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true,
  });

  let successCount = 0;
  let failCount = 0;
  const errors: Array<{ repo: string; error: string }> = [];

  progressBar.start(selectedForks.length, 0);

  for (const fullName of selectedForks) {
    const spinner = ora({
      text: chalk.blue(`Processing ${chalk.bold(fullName)}`),
      spinner: 'dots',
    }).start();

    try {
      const result = await deleteFork(fullName, octokit);
      if (result.success) {
        spinner.succeed(chalk.green(`Deleted ${chalk.bold(fullName)}`));
        successCount++;
      } else {
        spinner.fail(chalk.red(`Failed to delete ${chalk.bold(fullName)}`));
        errors.push({ repo: fullName, error: result.error || 'Unknown error' });
        failCount++;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        spinner.fail(chalk.red(`Failed to delete ${chalk.bold(fullName)}`));
        errors.push({ repo: fullName, error: error.message });
      } else {
        spinner.fail(chalk.red(`Failed to delete ${chalk.bold(fullName)}`));
        errors.push({ repo: fullName, error: 'Unknown error' });
      }
      failCount++;
    }

    progressBar.increment();
  }

  progressBar.stop();

  console.log(chalk.cyan('\n─'.repeat(50)));
  console.log(chalk.green.bold('\n✨ Operation Summary:'));
  console.log(chalk.green(`✅ Successfully deleted: ${successCount} repositories`));

  if (failCount > 0) {
    console.log(chalk.red(`❌ Failed to delete: ${failCount} repositories`));
    console.log(chalk.yellow('\nFailed Repositories:'));
    errors.forEach(({ repo, error }) => {
      console.log(chalk.red(`• ${chalk.bold(repo)}: ${error}`));
    });
  }

  console.log(chalk.cyan('\nThank you for using Forkaway! 👋\n'));
}

// Only run main if this file is being run directly
if (import.meta.url === new URL(import.meta.url).href) {
  main();
}
