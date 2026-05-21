# Accessibility

## Standards

This application targets WCAG 2.1 Level AA compliance.

## Practices Applied

### Semantic HTML

- Pages use `<article>`, `<section>`, `<header>`, `<main>`, and `<nav>` elements.
- Headings follow a logical hierarchy (h1 > h2 > h3).

### ARIA Attributes

- Buttons that toggle state include `aria-expanded`.
- Form inputs are linked to labels via `id` / `for`.
- Invalid inputs include `aria-invalid="true"`.
- The toast container uses `aria-live="assertive"` and `aria-atomic="true"`.
- The loading spinner uses `role="status"` and `aria-live="polite"`.
- Icon-only buttons include `aria-label`.

### Keyboard Navigation

- All interactive elements are reachable and operable via keyboard.
- Focus is managed correctly when modals or dropdowns open and close.
- The language switcher dropdown closes on Escape (via `ClickOutsideDirective`).

### Color Contrast

- Text on white backgrounds meets a minimum contrast ratio of 4.5:1.
- Interactive states (hover, focus) are visually distinct.
- Error states use both color (red) and iconography to convey state.

### Responsive Design

- Layout adapts from 320px (small phone) to 4K displays.
- Touch targets meet the minimum 44x44px guideline on mobile.
- The navigation collapses to a hamburger menu on screens below 768px.

## Known Limitations

- The language switcher flags (emoji) may not render consistently across all operating systems.
- Screen reader announcements for dynamic content updates depend on the `aria-live` region in the toast component.
