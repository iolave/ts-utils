# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]
- Golang-like error handling utilities entrypoint is now `@iolave/utils/results`.
- JSON utilities:
    - `parse`: a safe JSON.parse alternative.

## [v1.0.1]
### Fixed
- `functions` jsdoc annoations typos.

## [v1.0.0]

### Added
- Golang-like error handling utilities:
    - `Result` and `PResult` types to represent safe results.
    - `safePromise` method to convert promises to safe ones.
    - `safe` method to convert sync method to safe ones.
    - `Ok` method that safe return a value.
    - `Err` method that safe return an error.

[unreleased]: https://github.com/iolave/ts-utils/compare/v1.0.0...staging
[v1.0.0]: https://github.com/iolave/ts-utils/releases/tag/v1.0.0
