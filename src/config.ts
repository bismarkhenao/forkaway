export const config = {
  // GitHub API version
  apiVersion: '2022-11-28',
  
  // Maximum number of repositories to fetch per page
  perPage: 100,
  
  // Default sort order for repositories
  defaultSort: 'updated' as const
}; 