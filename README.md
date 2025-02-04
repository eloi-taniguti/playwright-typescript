# Playwright TypeScript Project

This is a Playwright project written in TypeScript. Playwright is a framework for Web Testing and Automation. It allows testing across different browsers and devices with a single API.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/playwright-typescript.git
    ```
2. Navigate to the project directory:
    ```sh
    cd playwright-typescript
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Running Tests

To run the tests, use the following command:
```sh
npx playwright test
```
or
```sh
npm run playwright
```


### Writing Tests

Tests are located in the `tests` directory. You can create new test files with the `.spec.ts` extension.


### Configuration

Configuration is handled in the `playwright.config.ts` file. You can customize browser settings, test directories, and more.

### Folder Structure

```
playwright-typescript/
├── tests/              # Test files
├── playwright.config.ts # Playwright configuration
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
