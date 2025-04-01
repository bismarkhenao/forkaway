import { describe, it, expect } from '@jest/globals';
import { sanitizeErrorMessage } from '@src/utils/security';

describe('security utils', () => {
  describe('sanitizeErrorMessage', () => {
    it('should sanitize GitHub tokens in string errors', () => {
      const error = 'Error with token ghp_abc123def456ghi789jkl012mno345pqr678stu901';
      const sanitized = sanitizeErrorMessage(error);
      expect(sanitized).toBe('Error with token [REDACTED_TOKEN]');
    });

    it('should sanitize GitHub tokens in Error objects', () => {
      const error = new Error('Error with token ghp_abc123def456ghi789jkl012mno345pqr678stu901');
      const sanitized = sanitizeErrorMessage(error);
      expect(sanitized).toBe('Error with token [REDACTED_TOKEN]');
    });

    it('should sanitize long hex strings', () => {
      const error = 'Error with hash 1234567890abcdef1234567890abcdef12345678';
      const sanitized = sanitizeErrorMessage(error);
      expect(sanitized).toBe('Error with hash [REDACTED_HASH]');
    });

    it('should handle unknown error types', () => {
      const error = null;
      const sanitized = sanitizeErrorMessage(error);
      expect(sanitized).toBe('An unknown error occurred');
    });

    it('should handle multiple sensitive patterns', () => {
      const error = `Error with token ghp_abc123def456ghi789jkl012mno345pqr678stu901 and hash 1234567890abcdef1234567890abcdef12345678`;
      const sanitized = sanitizeErrorMessage(error);
      expect(sanitized).toBe('Error with token [REDACTED_TOKEN] and hash [REDACTED_HASH]');
    });
  });
});
