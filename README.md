# Satellite Hops Game 🛰️

A 3D jumping game built with Pixi.js and crisp-game-lib.

## 🎮 Game Description

Jump between pillars in 3D space while collecting yellow platforms for score multipliers!

## 🔧 CI/CD Integration

This project implements **3 CI/CD tools** using GitHub Actions:

### 1. ESLint (授業内ツール)
- **Purpose**: JavaScript code quality and style checking
- **Configuration**: `.eslintrc.json`
- **Benefits**: Catches syntax errors and enforces consistent code style

### 2. HTMLHint (授業内ツール)
- **Purpose**: HTML validation and best practices checking
- **Configuration**: `.htmlhintrc`
- **Benefits**: Ensures valid HTML structure and accessibility

### 3. ⭐ Lighthouse CI (★授業外ツール)
- **Purpose**: Performance, accessibility, and SEO analysis
- **Configuration**: `lighthouserc.json`
- **Benefits**: 
  - Monitors frontend performance automatically
  - Detects performance regressions
  - Provides actionable insights for optimization
  - Generates detailed reports on accessibility and SEO

## 🚀 Local Development

### Prerequisites
- Node.js 18 or higher
- npm

### Setup
```bash
# Install dependencies
npm install

# Run linters locally
npm run lint        # Run ESLint
npm run lint:html   # Run HTMLHint
```

### Testing Lighthouse CI locally
```bash
# Install Lighthouse CI globally
npm install -g @lhci/cli

# Start a local server
npx http-server . -p 8080

# In another terminal, run Lighthouse
lhci autorun
```

## 📊 CI/CD Workflow

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and pull request:

1. **ESLint Job**: Checks JavaScript code quality
2. **HTMLHint Job**: Validates HTML structure
3. **Lighthouse CI Job**: Analyzes performance and generates reports

All results are visible in the GitHub Actions tab with detailed logs and artifacts.

## 📁 Project Structure

```
.
├── index.html          # Main HTML file
├── main.js             # Game logic
├── jsconfig.json       # JavaScript configuration
├── package.json        # Dependencies and scripts
├── .eslintrc.json      # ESLint configuration
├── .htmlhintrc         # HTMLHint configuration
├── lighthouserc.json   # Lighthouse CI configuration
└── .github/
    └── workflows/
        └── ci.yml      # GitHub Actions workflow
```

## 🎯 Evaluation Points (評価ポイント)

✅ **3つのCIツールを統合**
- ESLint (JavaScript Linter)
- HTMLHint (HTML Validator)
- Lighthouse CI (Performance Analysis)

✅ **授業外のツールを1つ含む**
- Lighthouse CI は授業で扱っていないツール

✅ **自動化されたチェック**
- すべてのCIがGitHub Actions上で自動実行
- 結果はActions タブで確認可能

## 📝 License

MIT
