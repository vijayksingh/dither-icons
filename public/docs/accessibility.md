# Accessibility

Label controls, support keyboard input, and respect reduced-motion preferences.

## Label the control

```tsx
<button className="di-trigger" aria-label="Open notifications">
  <BellIcon size={24} texture="solid" />
</button>

<button className="di-trigger">
  <DownloadIcon size={24} texture="solid" />
  Download report
</button>
```

Icons are aria-hidden by default. Label an icon-only button with aria-label, or give the button visible text. Avoid naming the same control twice through both the button and its decorative icon.

## Label a standalone image

```tsx
<NetworkIcon
  size={64}
  title="Connected network"
  animate={false}
/>
```

title supplies an accessible SVG image name and role. Use this for an illustration that carries meaning on its own, rather than for an icon already explained by adjacent text.

## Reduced motion

prefers-reduced-motion: reduce is respected automatically by both the React runtime and the standalone CSS. Active motion is cancelled when that preference changes. You can also set animate={false} for any icon, independent of the system setting.

- Use a real button or link with a visible focus treatment.
- Keep disabled and loading states in the parent control.
- Never communicate a result through motion alone.
- At small sizes, prefer solid or outline and check contrast against the actual surface.
