import { jest, beforeEach, afterAll, beforeAll } from '@jest/globals';

// Increase timeout for all tests
jest.setTimeout(10000);

// Mock console methods globally
const mockConsole = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

// Replace console methods with mocks
global.console = { ...console, ...mockConsole };

// Setup global mocks before all tests
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Clear all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Restore all mocks after all tests
afterAll(() => {
  jest.restoreAllMocks();
});

// Mock environment variables before any imports
process.env.NODE_ENV = 'test';
process.env.GITHUB_TOKEN = 'mock-token-for-testing';
