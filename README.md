![Branches](./badges/coverage-branches.svg)
![Functions](./badges/coverage-functions.svg)
![Lines](./badges/coverage-lines.svg)
![Statements](./badges/coverage-statements.svg)
![Jest coverage](./badges/coverage-jest%20coverage.svg)
[![Documentation deployement](https://github.com/Toniboy1/sauvetage-admin-app/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Toniboy1/sauvetage-admin-app/actions/workflows/pages/pages-build-deployment)
![Cypress](https://github.com/Toniboy1/sauvetage-admin-app/actions/workflows/cypress.yml/badge.svg)

# Sauvetage Admin App

## Description

Sauvetage Admin App is designed to handle various forms efficiently. With a focus on ease of use, this app integrates several advanced libraries and frameworks to ensure a smooth experience for administrators.

## Version

1.0.0

## Author

Anthony Fasano

## Main Features

- **Form Management:** Streamlined handling of multiple forms.
- **Date Selection:** Integrated with MUI date pickers for effective date management.
- **Data Persistence:** Uses Dexie for indexedDB support.
- **Configuration Saving:** Electron-store is utilized for local storage solutions.

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

## Available Scripts

In the project directory, you can run:

```bash
npm run dev
```

Runs the app in the development mode using Nextron.

```bash
npm run build
```

Builds the app for production to the dist folder using Nextron.

```bash
npm run test
```

Launches the test runner in the interactive watch mode using Jest.

```bash
npm run lint
```

Runs ESLint to check for JavaScript and TypeScript linting errors.

```bash
npm run fix
```

Automatically fixes format and linting issues found by ESLint.

```bash
npm run prettier
```

Formats code according to predefined styles.

```bash
npm run doc
```

Generates code documentation using Typedoc.

## Generate a new release

```bash
grunt-bump
```

## Docs

Technical documentation is availlable [here] https://toniboy1.github.io/sauvetage-admin-app/index.html
