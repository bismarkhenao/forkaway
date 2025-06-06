# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.3.0](https://github.com/bismarkhenao/forkaway/compare/v1.2.0...v1.3.0) (2025-04-01)


### Features

* implement pagination for fetching user forks in GitHub API ([8e216fe](https://github.com/bismarkhenao/forkaway/commit/8e216fe18ffa8b2b5c5e593bc810c669e96d9da8))

## [1.2.0](https://github.com/bismarkhenao/forkaway/compare/v1.1.0...v1.2.0) (2025-04-01)


### Features

* enhance error handling and provide user tips for empty forks list ([08ef48c](https://github.com/bismarkhenao/forkaway/commit/08ef48cd193804417c1d87b5f9a6668fad36d577))

## [1.1.0](https://github.com/bismarkhenao/forkaway/compare/v1.0.6...v1.1.0) (2025-03-18)


### Features

* add installation script and update README for Node.js requirements ([af6f53f](https://github.com/bismarkhenao/forkaway/commit/af6f53f7499965b3323afb8a7c3bac561c6ef0fd))

### [1.0.6](https://github.com/bismarkhenao/forkaway/compare/v1.0.5...v1.0.6) (2025-03-18)


### Chores

* update package-lock.json with dependency changes ([9b25332](https://github.com/bismarkhenao/forkaway/commit/9b25332c9ceb47119dfbfcd7fe724b34ed7245ff))

### [1.0.5](https://github.com/bismarkhenao/forkaway/compare/v1.0.4...v1.0.5) (2025-03-18)


### Chores

* disable sourcemaps and remove outExtension configuration in tsup.config.ts ([980c1a8](https://github.com/bismarkhenao/forkaway/commit/980c1a84319949dd501585830878ca946e59a055))

### [1.0.4](https://github.com/bismarkhenao/forkaway/compare/v1.0.3...v1.0.4) (2025-03-18)


### Chores

* add ESLint and Prettier configuration files, update package.json scripts, and enhance CI workflow ([aa03673](https://github.com/bismarkhenao/forkaway/commit/aa03673e736c90695c558a88bc916bb3c7b4888c))
* update contributing guidelines, enhance README, and improve TypeScript build setup ([455f26e](https://github.com/bismarkhenao/forkaway/commit/455f26effa99890d62c5ecb7e6aec63ee0660260))
* update package dependencies and add release script ([70eb59c](https://github.com/bismarkhenao/forkaway/commit/70eb59c0c0fcd589eb9a4ded00bc98497ad184d5))

### [1.0.3](https://github.com/bismarkhenao/forkaway/compare/v1.0.2...v1.0.3) (2025-03-17)


### Chores

* add .env.example and .nvmrc files, update Jest configuration, and enhance TypeScript setup for improved development experience ([e1c3746](https://github.com/bismarkhenao/forkaway/commit/e1c3746e79a0a67d26bfdf4e727ccc6ce12e317e))

### [1.0.2](https://github.com/bismarkhenao/forkaway/compare/v1.0.1...v1.0.2) (2025-03-16)


### Chores

* update dependencies in package.json and package-lock.json, including @octokit/rest to version 20.0.0, and various other packages for improved compatibility and features ([58dbfc1](https://github.com/bismarkhenao/forkaway/commit/58dbfc1ec68d085948b6f60ad5652e913a52720a))
* update package-lock.json and package.json to version 1.0.1, remove ts-node-dev dependency ([b3926b6](https://github.com/bismarkhenao/forkaway/commit/b3926b62f1a3e94e14632669b742f8575ef8f05c))

### 1.0.1 (2025-03-16)


### Chores

* **release:** 1.0.1 [skip ci] ([f4b606b](https://github.com/bismarkhenao/forkaway/commit/f4b606b0958295e21b34dabf4a359e0da210faf0))
* **release:** 1.1.0 [skip ci] ([6acc035](https://github.com/bismarkhenao/forkaway/commit/6acc035828368a6e9cf7d7e968b77b3c067bc67b))
* **release:** 1.1.1 [skip ci] ([10bb1fc](https://github.com/bismarkhenao/forkaway/commit/10bb1fcefc5e224c3e2f1e8c8138ae3f1ce032f8))
* **release:** 2.0.0 [skip ci] ([ef8fd54](https://github.com/bismarkhenao/forkaway/commit/ef8fd540eff3b70d39eeadf87c9e89c45621babf))

## 1.0.0 (2024-03-15)

### Features

* Initial release
* CLI tool to manage GitHub fork repositories
* Interactive fork selection and deletion
* Bulk deletion support with confirmation
* Progress bar and colorful output
* Error handling and user guidance 