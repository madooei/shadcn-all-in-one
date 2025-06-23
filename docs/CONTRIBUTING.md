# Contributing

Thank you for your interest in contributing to the Shadcn All In One package!

## Development Process

This project uses the basic [GitHub Flow](https://guides.github.com/introduction/flow/):

1. Fork the repository and create your branch from `master`
2. Make your changes following the development workflow
3. Run the validation pipeline: `npm run validate`
4. Open a pull request and describe your changes

Please keep your contributions minimal and focused. Update or add tests as needed.

### Before Contributing

1. Read the [Development Guide](packages/shadcn-all-in-one/DEVELOPMENT.md) for technical details
2. Understand the project philosophy of providing comprehensive shadcn UI components in one package
3. Ensure your changes align with the package's goals of completeness and tree-shaking optimization
4. Consider shadcn UI patterns and React best practices

### Testing Requirements

- All new components must include comprehensive tests using React Testing Library
- Type constraint testing should be included for TypeScript features
- Run `npm run validate` before submitting changes
- Maintain or improve test coverage
- Test component rendering, props, and user interactions
- Follow the current minimal "hello world" test approach for new components

### Documentation Updates

- Update relevant documentation when making component changes
- Keep the multi-file knowledge base structure intact
- Ensure shadcn UI component examples remain current and functional
- Update component prop documentation when APIs change
- Update the README.md with any new components or features

### Shadcn UI-Specific Guidelines

- Follow shadcn UI patterns and component structure
- Use class-variance-authority for component variants
- Ensure components work with the deep entry points architecture
- Maintain Tailwind CSS compatibility and styling guidelines
- Preserve tree-shaking optimization for individual component imports
- Follow the established file organization in `src/components/ui/`
- Use the `cn` utility from `@/lib/utils` for className merging
- Extend React HTML attributes appropriately for each component

### Additional Component Guidelines

When adding new components beyond shadcn UI:

- Place them in `src/components/` (not in `ui/`)
- Follow the same patterns as Icons and TooltipButton
- Update exports in `src/index.ts` and `tsup.config.ts`
- Add package.json exports for individual imports
- Include comprehensive documentation and examples

### Code Quality

- Follow the established ESLint and Prettier configuration
- Use TypeScript strict mode and proper type definitions
- Ensure all components are properly typed with React.forwardRef when appropriate
- Maintain consistent naming conventions with shadcn UI
- Use proper React patterns (hooks, context, etc.) when needed
