import { jest } from '@jest/globals';
import { Octokit } from '@octokit/rest';
import { getForksList, deleteFork } from '../index.js';

// Mock environment variables
process.env.GITHUB_TOKEN = 'mock-token';

// Mock console functions to prevent output during tests
console.log = jest.fn();
console.error = jest.fn();

// Mock Octokit
type MockResponse = {
  data: any;
  status: number;
  headers: Record<string, string>;
  url: string;
};

const mockRequest = jest.fn().mockImplementation(async () => ({
  data: {},
  status: 200,
  headers: {},
  url: ''
})) as jest.MockedFunction<(route: string, options?: any) => Promise<MockResponse>>;

// Create mock Octokit instance
const mockOctokit = {
  request: mockRequest
} as unknown as Octokit;

describe('GitHub Fork Operations', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

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

      mockRequest.mockImplementationOnce(async () => ({
        data: mockRepos,
        status: 200,
        headers: {},
        url: 'https://api.github.com/user/repos'
      }));

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
      mockRequest.mockImplementationOnce(async () => ({
        status: 204,
        data: {},
        headers: {},
        url: 'https://api.github.com/repos/user/repo1'
      }));

      const result = await deleteFork('user/repo1', mockOctokit);

      expect(result).toBe(true);
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
      mockRequest.mockRejectedValueOnce(new Error('Deletion failed'));

      const result = await deleteFork('user/repo1', mockOctokit);

      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
    });
  });
}); 