#!/usr/bin/env node

import { Octokit } from 'octokit';
import inquirer from 'inquirer';
import * as dotenv from 'dotenv';
import { config } from './config';

// Load environment variables from .env file as fallback
dotenv.config();

// Get GitHub token from environment variables
const githubToken = process.env.GITHUB_TOKEN;

if (!githubToken) {
  console.error('\n❌ Error: GITHUB_TOKEN is not set in environment variables');
  console.error('\nTo fix this, add the following to your ~/.zshrc or ~/.bashrc:');
  console.error('\n  export GITHUB_TOKEN=your_github_personal_access_token');
  console.error('\nMake sure to:');
  console.error('1. Generate a token at https://github.com/settings/tokens');
  console.error('2. Enable both repo and delete_repo scopes');
  console.error('3. Add the export command to your shell configuration');
  console.error('4. Reload your shell or run: source ~/.zshrc\n');
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
    const response = await octokit.request('GET /user/repos', {
      affiliation: 'owner',
      sort: 'updated',
      per_page: 100,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    return response.data
      .filter((repo: GithubRepo) => repo.fork)
      .map((repo: GithubRepo) => ({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        fork: repo.fork
      }));
  } catch (error) {
    console.error('Error fetching forks:', error);
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
    console.error(`Error deleting fork ${fullName}:`, error);
    return false;
  }
}

async function main() {
  console.log('Fetching your fork repositories...');
  
  const forks = await getForksList();
  
  if (forks.length === 0) {
    console.log('No fork repositories found.');
    return;
  }

  console.log(`Found ${forks.length} fork repositories.`);

  const answers = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedForks',
      message: 'Select the forks you want to delete:',
      choices: forks.map(fork => ({
        name: `${fork.full_name} (${fork.description || 'No description'})`,
        value: fork.full_name
      }))
    }
  ]);

  const selectedForks = answers.selectedForks as string[];

  if (selectedForks.length === 0) {
    console.log('No forks selected for deletion.');
    return;
  }

  const confirmAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Are you sure you want to delete ${selectedForks.length} fork(s)?`,
      default: false
    }
  ]);

  if (!confirmAnswer.confirm) {
    console.log('Operation cancelled.');
    return;
  }

  console.log('\nDeleting selected forks...');
  
  for (const fullName of selectedForks) {
    process.stdout.write(`Deleting ${fullName}... `);
    const success = await deleteFork(fullName);
    console.log(success ? '✅' : '❌');
  }

  console.log('\nOperation completed.');
}

main().catch(console.error); 