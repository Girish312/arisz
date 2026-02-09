# Contributing to ARISZ

Thank you for your interest in contributing to ARISZ! This document provides guidelines and instructions for contributing.

## 🎯 Ways to Contribute

- **Bug Reports**: Found a bug? Let us know!
- **Feature Requests**: Have an idea? We'd love to hear it!
- **Code Contributions**: Submit pull requests
- **Documentation**: Improve our docs
- **Testing**: Help test new features
- **Design**: UI/UX improvements

## 🐛 Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

**Good Bug Report Includes:**
1. Clear, descriptive title
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Screenshots (if applicable)
6. Environment details (browser, OS, etc.)

**Template:**

```markdown
## Bug Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable, add screenshots.

## Environment
- Browser: Chrome 120
- OS: macOS 14
- Version: 1.0.0
```

## 💡 Suggesting Features

We welcome feature suggestions! Please provide:

1. **Use Case**: Why is this feature needed?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Other solutions you've considered
4. **Additional Context**: Screenshots, mockups, etc.

## 🔧 Development Setup

### Prerequisites

- Node.js 18+ installed
- Git installed
- PostgreSQL installed (or Docker)
- Code editor (VS Code recommended)

### Setup Steps

1. **Fork the repository**

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/arisz.git
   cd arisz
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Setup environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

5. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- No `any` types (use `unknown` if needed)
- Properly type all function parameters and returns

```typescript
// Good
function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// Bad
function calculateTotal(items: any): any {
  return items.reduce((sum: any, item: any) => sum + item.price, 0)
}
```

### React Components

- Use functional components
- Use hooks for state and effects
- Keep components small and focused
- Extract reusable logic into custom hooks

```typescript
// Good
interface TaskCardProps {
  task: Task
  onUpdate: (task: Task) => void
}

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  // ...
}

// Bad
export function TaskCard(props: any) {
  // ...
}
```

### File Naming

- Components: PascalCase (`TaskCard.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- API routes: lowercase (`route.ts`)
- Types: PascalCase (`Task.ts`)

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Max line length: 100 characters
- Use meaningful variable names

```typescript
// Good
const completedTasks = tasks.filter(task => task.status === 'COMPLETED')

// Bad
const ct = tasks.filter(t => t.s === 'COMPLETED')
```

### Comments

- Use JSDoc for functions
- Comment complex logic
- Avoid obvious comments

```typescript
/**
 * Calculates the completion rate for a given set of tasks
 * @param tasks - Array of tasks to analyze
 * @returns Completion rate as a percentage (0-100)
 */
function calculateCompletionRate(tasks: Task[]): number {
  if (tasks.length === 0) return 0
  const completed = tasks.filter(t => t.status === 'COMPLETED').length
  return (completed / tasks.length) * 100
}
```

## 🌿 Git Workflow

### Branch Naming

- Feature: `feature/add-dark-mode`
- Bug fix: `fix/login-error`
- Documentation: `docs/update-readme`
- Refactor: `refactor/task-component`

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**

```bash
feat(tasks): add drag and drop reordering
fix(auth): resolve session timeout issue
docs(api): update endpoint documentation
style(ui): improve button hover states
```

### Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean code
   - Add tests if applicable
   - Update documentation

3. **Test locally**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Use a descriptive title
   - Reference related issues
   - Describe what changed and why
   - Add screenshots for UI changes

### Pull Request Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123

## Screenshots (if applicable)
[Add screenshots]

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests pass

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Generate coverage report
npm test:coverage
```

### Writing Tests

```typescript
import { describe, it, expect } from 'vitest'
import { calculateCompletionRate } from './analytics'

describe('calculateCompletionRate', () => {
  it('should return 0 for empty array', () => {
    expect(calculateCompletionRate([])).toBe(0)
  })

  it('should calculate correct percentage', () => {
    const tasks = [
      { status: 'COMPLETED' },
      { status: 'COMPLETED' },
      { status: 'PENDING' },
    ]
    expect(calculateCompletionRate(tasks)).toBe(66.67)
  })
})
```

## 📚 Documentation

When adding features:
1. Update README.md if needed
2. Update API.md for API changes
3. Add JSDoc comments
4. Update CHANGELOG.md

## 🎨 UI/UX Guidelines

- Follow existing design patterns
- Use Tailwind utility classes
- Ensure responsive design
- Test on multiple screen sizes
- Maintain accessibility (ARIA labels)
- Support dark mode

## 🔍 Code Review

What we look for:
- Code quality and readability
- Proper error handling
- Performance considerations
- Security best practices
- Test coverage
- Documentation

## 🚀 Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create git tag
4. Merge to main
5. Vercel auto-deploys

## 📖 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## ❓ Questions?

- Check existing [Issues](https://github.com/yourusername/arisz/issues)
- Start a [Discussion](https://github.com/yourusername/arisz/discussions)
- Read the [Documentation](README.md)

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the issue, not the person
- Help others learn and grow

## 🙏 Thank You!

Your contributions make ARISZ better for everyone!

---

**Happy Contributing!** 🎉
