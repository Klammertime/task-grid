# 🧾 Git Commit Message Guidelines

This project follows a **semantic commit convention** inspired by [Conventional Commits](https://www.conventionalcommits.org/).

Using meaningful prefixes improves collaboration, readability, and changelogs.

---

## 🔤 Prefix Glossary

| Prefix      | Use Case                                                       |
|-------------|----------------------------------------------------------------|
| `feat:`     | New feature or functional capability                           |
| `fix:`      | Bug fix that resolves unexpected behavior                      |
| `build:`    | Tooling or dependency changes (e.g. Vite, Yarn, Turbo)         |
| `chore:`    | Minor maintenance (e.g. folder creation, configs, metadata)    |
| `docs:`     | Documentation or README updates                                |
| `style:`    | Pure UI/style changes (no logic affected)                      |
| `refactor:` | Code restructuring without changing behavior                   |
| `test:`     | Adding or fixing tests                                         |
| `perf:`     | Performance optimization (e.g. memoization, virtualization)    |

---

## 🧪 Example Commit Messages

```bash
feat(grid): add editable cell component
fix(api): resolve user list 500 error
build: configure turborepo and yarn workspaces
chore: scaffold monorepo folder structure
docs: write architecture and assumptions docs
refactor(cell): extract user display logic into UserRenderer
style(ui): improve spacing between avatar components
