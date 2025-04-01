/**
 * Sanitizes error messages to remove sensitive information
 * @param error - The error object or message to sanitize
 * @returns A sanitized error message
 */
export function sanitizeErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error
      .replace(/ghp_[a-zA-Z0-9]+/g, '[REDACTED_TOKEN]')
      .replace(/[a-f0-9]{40,}/g, '[REDACTED_HASH]');
  }

  if (error instanceof Error) {
    return error.message
      .replace(/ghp_[a-zA-Z0-9]+/g, '[REDACTED_TOKEN]')
      .replace(/[a-f0-9]{40,}/g, '[REDACTED_HASH]');
  }

  return 'An unknown error occurred';
}
