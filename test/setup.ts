import { jest } from '@jest/globals';

// Increase timeout for all tests
jest.setTimeout(10000);

// Mock console methods globally
const mockConsole = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn()
};

// Replace console methods with mocks
global.console = { ...console, ...mockConsole };

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Mock environment variables before any imports
process.env.NODE_ENV = 'test';
process.env.GITHUB_TOKEN = 'mock-token-for-testing'; 