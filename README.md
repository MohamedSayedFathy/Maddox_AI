
markdown
Copy
# Maddox AI Testing Project

This repository demonstrates a sample web application with automated end-to-end tests using Playwright. Our CI/CD pipeline—configured with GitHub Actions—ensures that every new website added to the repository is automatically built, tested, and only merged into the main branch if all tests pass.

## Overview

The project is split into two main areas:
- **Website Code:** Located in the `website/` directory. This is where each individual website (or site version) is added as its own folder.
- **Testing Code:** The Playwright tests and configuration reside in the `playwright/` folder.

## Automated Tests

Our Playwright tests cover key functionalities of the web applications, including:
- **Login Flow:** Validates that users can log in with the dummy credentials (e.g., `test@maddox123.ai` / `supersecure`).
- **Home Page Interactions:** Verifies that elements such as a counter can be incremented, decremented, and reset.
- **Logout Functionality:** Ensures users are properly logged out and redirected.

## CI/CD Pipeline

The CI pipeline is configured using GitHub Actions (see the workflow file at `.github/workflows/ci.yml`). Key points include:

- **Selective Testing:** The pipeline is set up to detect and test **only the most recently added website directory** within the `website/` folder. This is done by automatically identifying the newest folder (by modification or creation time) and running the build and tests only on that folder.
- **Automated Validation:** When you create or update a website in the `testing` branch, the CI workflow will:
  1. Install dependencies and build the website.
  2. Start the application (using a predefined port or dynamically determined URL).
  3. Run the Playwright tests against the running website.
- **Merge Requirements:** The `main` branch is protected by branch rules that require:
  - Changes must be merged via a pull request.
  - The CI pipeline (i.e., the tests) must pass before a merge is allowed.

## How to Add a New Website for Testing

1. **Work on the Testing Branch:**
   - Create or switch to your `testing` branch.
   - Add your new website by creating a new folder inside the `website/` directory (for example, `website/newSite/`).
   - Ensure that the new website has its own `package.json` and the necessary build/start scripts.

2. **Commit and Push:**
   - Commit your changes to the `testing` branch and push them to GitHub.
   
3. **Create a Pull Request:**
   - Open a pull request from the `testing` branch to the `main` branch.
   - The GitHub Actions pipeline will automatically trigger. It will detect the newest folder (i.e., your newly added website) in the `website/` directory and run the build and tests.
   - If all tests pass, the pull request status will be green and you’ll be able to merge into `main`.
   - If the tests fail, the merge will be blocked by the branch protection rules, and you’ll need to fix the issues before merging.

## Environment Variables

Our Playwright configuration loads settings (such as `BASE_URL`) from a `.env` file in the testing environment. The CI pipeline dynamically updates this file with the URL where the new website is running.

## Branching and Merge Strategy

- **Development in Testing Branch:** All website additions and development work are done in the `testing` branch.
- **Merge via Pull Request:** When you’re ready to update the `main` branch, open a pull request from `testing` to `main`. The CI checks (automated tests) must pass before the PR can be merged.
- **Protected Main Branch:** Direct pushes to `main` are not allowed. This ensures that only thoroughly tested and reviewed changes make it into the production branch.

