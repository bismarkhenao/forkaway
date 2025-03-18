import { jest, describe, it, expect } from '@jest/globals';
import { Octokit } from '@octokit/rest';
import { getForksList, deleteFork } from '@src/index.ts';

interface MockResponse {
  data: any;
  status: number;
  headers: Record<string, any>;
  url: string;
}

type MockRequestFn = (url: string, options?: any) => Promise<MockResponse>;

const mockRequest = jest.fn() as jest.MockedFunction<MockRequestFn>;
const mockOctokit = {
  request: mockRequest
} as unknown as Octokit;

const mockPrompt = jest.fn() as jest.MockedFunction<(questions: any[]) => Promise<any>>;
jest.mock('inquirer', () => ({
  prompt: mockPrompt,
  registerPrompt: jest.fn()
}));

describe('GitHub Fork Operations', () => {
  describe('getForksList', () => {
    it('should return a list of forks', async () => {
      const mockRepos = [
        {
          name: 'repo1',
          full_name: 'user/repo1',
          description: 'Test repo 1',
          html_url: 'https://github.com/user/repo1',
          fork: true
        },
        {
          name: 'repo2',
          full_name: 'user/repo2',
          description: null,
          html_url: 'https://github.com/user/repo2',
          fork: false
        }
      ];

      mockRequest.mockResolvedValueOnce({
        data: mockRepos,
        status: 200,
        headers: {},
        url: 'https://api.github.com/user/repos'
      });

      const forks = await getForksList(mockOctokit);

      expect(forks).toHaveLength(1);
      expect(forks[0]).toEqual({
        name: 'repo1',
        full_name: 'user/repo1',
        description: 'Test repo 1',
        html_url: 'https://github.com/user/repo1',
        fork: true
      });
      expect(mockRequest).toHaveBeenCalledWith('GET /user/repos', expect.any(Object));
    });

    it('should handle errors gracefully', async () => {
      mockRequest.mockRejectedValueOnce(new Error('API Error'));

      const forks = await getForksList(mockOctokit);

      expect(forks).toEqual([]);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('deleteFork', () => {
    it('should successfully delete a fork', async () => {
      mockRequest.mockResolvedValueOnce({
        status: 204,
        data: {},
        headers: {},
        url: 'https://api.github.com/repos/user/repo1'
      });

      const result = await deleteFork('user/repo1', mockOctokit);

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
      expect(mockRequest).toHaveBeenCalledWith(
        'DELETE /repos/{owner}/{repo}',
        expect.objectContaining({
          owner: 'user',
          repo: 'repo1',
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
      );
    });

    it('should handle deletion errors', async () => {
      const errorMessage = 'Repository not found';
      mockRequest.mockRejectedValueOnce({
        response: {
          data: { message: errorMessage }
        }
      });

      const result = await deleteFork('user/repo1', mockOctokit);

      expect(result.success).toBe(false);
      expect(result.error).toBe(errorMessage);
      expect(console.error).toHaveBeenCalled();
    });
  });
}); 