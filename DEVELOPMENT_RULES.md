# Development Rules for Svelte & SvelteKit Project

## Code Style & Syntax

### 1. Use Latest Svelte Syntax

- **Always use the latest Svelte 5+ syntax and features**
- Prefer `$effect()` over `onMount()` for reactive side effects
- Use `bind:this` for direct DOM element references
- Utilize `$state`, `$derived`, and `$effect` for reactivity
- Avoid deprecated lifecycle methods when possible

### 2. Component Structure

- Follow the standard order: `<script>`, HTML markup, `<style>`
- Use TypeScript for type safety
- Keep components focused and single-responsibility

### 3. Styling Guidelines

- Use component-scoped styles with `<style>` blocks
- Follow the project's color scheme (green: rgb(0, 77, 0), orange: #ff8c00)
- Ensure accessibility with proper contrast ratios
- Support responsive design with media queries
- Include accessibility features (aria-labels, focus management)

### 4. Best Practices

- Write clean, readable code in English
- Use semantic HTML elements
- **Prefer native HTML features over framework solutions when they provide stable, simple functionality without additional complexity**
- **Maximize browser capabilities and use cross-browser compatible features when they work reliably across major browsers**
- Implement proper error handling
- Follow SvelteKit conventions for routing and data loading
- Optimize for performance and user experience

### 5. Accessibility

- Include proper ARIA labels
- Ensure keyboard navigation works
- Support screen readers
- Provide high contrast mode support
- Respect `prefers-reduced-motion` preferences

## File Organization

- Keep related files together
- Use descriptive file and component names
- Follow SvelteKit routing conventions
- Organize imports logically

## Code Quality

- Write self-documenting code
- Use meaningful variable and function names
- Keep functions small and focused
- Avoid deep nesting
- Comment complex logic when necessary
