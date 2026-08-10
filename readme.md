# Automation Framework: Cucumber - Playwright - TypeScript - PactumJs

## 📌 Overview
This automation framework is built using **Cucumber**, **Playwright**, **PactumJs** and **TypeScript** to automate web applications efficiently. It supports **BDD (Behavior Driven Development)** with feature files and ensures robust browser automation with Playwright. Change

## 🚀 Features
- **Cucumber for BDD**: Uses Gherkin syntax for feature files.
- **Playwright for Web Automation**: Fast and reliable cross-browser testing.
- **Pactum JS**: Robust way of testing API's.
- **TypeScript for Strong Typing**: Ensures maintainability and scalability.
- **Parallel Execution**: Supports running tests concurrently.
- **Headless & Headed Mode**: Run tests with or without a UI.
- **Built-in Reports**: Generate detailed test execution reports.
- **CI/CD Friendly**: Easily integrates with Jenkins, GitHub Actions, etc.

## 📂 Project Structure
```
├── src/test/feature/                       # Feature files (.feature)
├── src/test/steps/                         # Step definitions (.ts)
├── src/test/pages/                         # Page Object Model (.ts)
├── src/test/pactumJS/feature/              # API Feature files (.feature)
├── src/test/pactumJS/steps/                # Pactum Step definitions (.ts)
├── src/test/pactumJS/pages/                # Pactum Page Object Model (.ts)
├── src/test/helper/hooks/                  # Hooks & configuration (.ts)
├── src/test/helper/browser/                # Browser, Context & Page (.ts)
├── src/test/helper/env/                    # Env variables (.ts) and env files (.env)
├── src/test/helper/attachments/            # Images , pdf and other files
├── test-results/                           # Test reports with Screenshots, trace and Video
├── playwright.config.ts                    # Playwright configuration
├── cucumber.js                             # Cucumber configuration
├── package.json                            # Dependencies & scripts
├── tsconfig.json                           # TypeScript configuration
```

## 🛠 Installation
Ensure you have **Node.js** (>=20.x) installed.

```sh
# Clone the repository
git clone <repo-url>
cd <repo-folder>

# Install dependencies
npm install
```

## ⚙️ Configuration
Modify `playwright.config.ts` to customize the browser settings, timeouts, and other Playwright options.

## 🏃 Running Tests
Run tests:
```sh
npm test
```

Run tests in **headed mode** (with UI):
```sh
npm test -- HEAD =headed 
```

Run tests with a specific **tag**:
```sh
npm run test --TAGS="@f1" --ENV=orangeHrmLive
```

Run tests with a specific **env**:
```sh
npm run test  --ENV=orangeHrmLive
```

## 📊 Test Reports
- **Cucumber HTML Report**: Available in `./test-results/` after execution.

## 🤖 CI/CD Integration
Add the following to your **GitHub Actions** workflow:
```yml
- name: Run Playwright Tests
  run: npm test
```

## 👥 Contributors
 **[Karthik K Bhat]** – Maintainer

---
💡 _Happy Testing!_ 🎭✅
