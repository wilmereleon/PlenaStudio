# Contributing to Plena Studio

First off, thank you for considering contributing to Plena Studio! 🎉

The following is a set of guidelines for contributing to this e-commerce jewelry platform. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Styleguides](#styleguides)
- [Additional Notes](#additional-notes)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs**
* **Include your environment details** (OS, Node.js version, Docker version)

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**
* **List some other applications where this enhancement exists**

### 🚀 Pull Requests

The process described here has several goals:

- Maintain code quality
- Fix problems that are important to users
- Engage the community in working toward the best possible product
- Enable a sustainable system for maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. **Follow all instructions in the template**
2. **Follow the styleguides**
3. **After you submit your pull request**, verify that all status checks are passing

## Styleguides

### 📝 Git Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

**Examples:**
```
feat(cart): add product quantity validation
fix(auth): resolve JWT token expiration issue
docs(readme): update installation instructions
test(components): add unit tests for Product component
```

### 💻 TypeScript Styleguide

- Use **TypeScript** for all new code
- Follow **strict mode** TypeScript configuration
- Use **interfaces** for object types
- Use **enums** for constants
- Add **JSDoc comments** for public APIs
- Use **meaningful variable names**

```typescript
// ✅ Good
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// ❌ Bad
interface CI {
  i: number;
  n: string;
  p: number;
  q: number;
}
```

### ⚛️ React Component Styleguide

- Use **functional components** with hooks
- Use **TypeScript interfaces** for props
- Add **JSDoc comments** for component documentation
- Use **meaningful component names**
- Follow **single responsibility principle**

```tsx
/**
 * Product component displays individual jewelry item
 * @param product - Product data object
 * @param onAddToCart - Callback when product is added to cart
 */
interface ProductProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const Product: React.FC<ProductProps> = ({ product, onAddToCart }) => {
  // Component implementation
};
```

### 🎨 CSS/SCSS Styleguide

- Use **Bootstrap 5** utility classes when possible
- Use **BEM methodology** for custom CSS
- Use **CSS modules** or **styled-components** for component-specific styles
- Follow **mobile-first** responsive design

```css
/* ✅ Good - BEM methodology */
.product-card {}
.product-card__image {}
.product-card__title {}
.product-card--featured {}

/* ❌ Bad */
.productCard {}
.product_image {}
.title {}
```

### 🔧 API Styleguide

- Use **RESTful conventions**
- Use **proper HTTP status codes**
- Use **consistent naming** (camelCase for JSON)
- Add **proper error handling**
- Use **TypeScript interfaces** for request/response types

```typescript
// ✅ Good
interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}
```

### 🧪 Testing Styleguide

- Write **unit tests** for all components
- Write **integration tests** for API endpoints
- Use **descriptive test names**
- Follow **AAA pattern** (Arrange, Act, Assert)
- Aim for **80%+ code coverage**

```typescript
// ✅ Good
describe('CartContext', () => {
  it('should add product to cart when addToCart is called', () => {
    // Arrange
    const product = mockProduct;
    
    // Act
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addToCart(product);
    });
    
    // Assert
    expect(result.current.items).toContain(product);
  });
});
```

## 🛠️ Development Workflow

### Setting Up Development Environment

1. **Fork and clone the repository**
```bash
git clone https://github.com/your-username/plena-studio.git
cd plena-studio
```

2. **Install dependencies**
```bash
npm install
cd Backend && npm install && cd ..
```

3. **Set up Docker environment**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

4. **Run tests**
```bash
npm test
```

### Making Changes

1. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**
3. **Add tests for your changes**
4. **Run the test suite**
```bash
npm test
npm run test:coverage
```

5. **Commit your changes**
```bash
git add .
git commit -m "feat(scope): your descriptive commit message"
```

6. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

7. **Open a Pull Request**

### 📋 Pull Request Checklist

Before submitting your pull request, please make sure:

- [ ] **Tests pass**: All existing and new tests pass
- [ ] **Code coverage**: Maintain or improve code coverage
- [ ] **TypeScript**: All TypeScript files compile without errors
- [ ] **Linting**: Code follows the established style guidelines
- [ ] **Documentation**: README and other docs are updated if needed
- [ ] **Commit messages**: Follow conventional commit format
- [ ] **No breaking changes**: Unless discussed and approved
- [ ] **Performance**: Changes don't negatively impact performance

## 📚 Additional Notes

### 🏷️ Issue and Pull Request Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

### 🎯 Development Focus Areas

We're particularly interested in contributions in these areas:

- **Performance optimizations**
- **Accessibility improvements**
- **Test coverage improvements**
- **Documentation enhancements**
- **Bug fixes**
- **Security improvements**

### 🤝 Community

- Join our discussions in GitHub Discussions
- Ask questions in GitHub Issues
- Follow the project for updates

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- CHANGELOG.md for significant contributions
- GitHub contributors page

Thank you for contributing to Plena Studio! 🎉
