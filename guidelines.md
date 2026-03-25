# Fitness Design System Guidelines

This package (`@laurelma/fitness`) provides a production-ready React design system for fitness tracking applications. Always import from the package root.

```tsx
import { Button, WorkoutCard, tokens } from '@laurelma/fitness'
import '@laurelma/fitness/dist/fitness.css'
```

---

## CSS Setup

Import the stylesheet once at the root of the app (e.g. `main.tsx`):

```tsx
import '@laurelma/fitness/dist/fitness.css'
```

This provides all CSS custom property tokens (`--color-*`, `--space-*`, etc.) and base resets.

---

## UI Primitives

### Button
Use for all interactive actions.
- `variant="primary"` — main CTA (e.g. "Start Workout", "Save Goal")
- `variant="secondary"` — secondary actions alongside a primary
- `variant="ghost"` — low-emphasis actions, icon-only buttons, toolbar items
- `variant="danger"` — destructive actions (delete, remove)
- `size` accepts `"sm"`, `"md"` (default), `"lg"`

```tsx
<Button variant="primary" size="md" onClick={handleSave}>Save Workout</Button>
```

### Card / CardHeader / CardBody / CardFooter
Container for grouped content. Always prefer `Card` over bare `div` for content blocks.
- `variant="default"` — standard surface
- `variant="elevated"` — adds shadow, use for featured/highlighted content
- `variant="flat"` — no border or shadow, use inside other cards

```tsx
<Card variant="elevated">
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

### Badge
Short status labels, categories, or metadata. Not for interactive elements — use `Button` instead.
- `variant` maps to workout categories: `"strength"`, `"cardio"`, `"hiit"`, `"flexibility"`, `"rest"`, `"custom"`
- `size` accepts `"sm"`, `"md"`

```tsx
<Badge variant="strength">Strength</Badge>
```

### Input
All text input fields. Required props: `id`, `label`.
- Pass `state="error"` and `errorMessage` to show inline validation errors
- `size` accepts `"sm"`, `"md"`, `"lg"`

```tsx
<Input id="goal-name" label="Goal Name" placeholder="e.g. Run 5K" />
```

### Progress
Horizontal progress bar for completion percentages.
- `value` is 0–100
- `color` accepts `"brand"`, `"success"`, `"warning"`, `"danger"`
- `size` accepts `"sm"`, `"md"`, `"lg"`

```tsx
<Progress value={72} color="brand" size="md" />
```

### Avatar / AvatarGroup
Represents a user by image, initials, or icon fallback.
- Use `AvatarGroup` only when showing 2 or more users together
- `status` accepts `"online"`, `"offline"`, `"busy"` — only show status on a single `Avatar`

```tsx
<Avatar src="/profile.jpg" name="Alex Smith" size="md" status="online" />
<AvatarGroup avatars={users} max={4} />
```

### Modal
Focused overlays for confirmations, detail views, and forms.
- `size` accepts `"sm"`, `"md"`, `"lg"`, `"xl"`
- Always pass a descriptive `title`
- Do not nest modals

```tsx
<Modal isOpen={open} onClose={handleClose} title="Log Workout" size="md">
  {/* content */}
</Modal>
```

---

## Fitness Domain Components

### WorkoutCard
Displays a single workout session card. Requires a full `Workout` object.

```tsx
import type { Workout } from '@laurelma/fitness'
<WorkoutCard workout={workout} onClick={(w) => navigate(`/workouts/${w.id}`)} />
```

### StatCard
Displays a single KPI metric. Use in rows of 3–4 on dashboard/summary screens.
- Show a `delta` (percentage change) when comparing to a previous period
- Use `iconColor` to match the workout category colour token

```tsx
<StatCard label="Workouts This Week" value={5} unit="sessions" delta={25} />
<StatCard label="Calories Burned" value="1,840" unit="kcal" delta={-8} />
```

### GoalCard
Displays a fitness goal with a progress bar and status badge. Requires a full `Goal` object.

```tsx
import type { Goal } from '@laurelma/fitness'
<GoalCard goal={goal} />
```

### PRList
Displays an ordered list of personal records with improvement deltas. Pass an array of `PersonalRecord` objects.
- `maxItems` defaults to 5; reduce for compact layouts

```tsx
import type { PersonalRecord } from '@laurelma/fitness'
<PRList records={records} maxItems={3} />
```

---

## Design Tokens

All tokens are available as CSS custom properties. Use them in inline styles or CSS modules:

| Category | Prefix | Example |
|---|---|---|
| Colors | `--color-*` | `--color-brand`, `--color-fg-default` |
| Category colors | `--color-cat-*` | `--color-cat-strength`, `--color-cat-cardio` |
| Typography | `--font-*`, `--text-*`, `--fw-*` | `--text-md`, `--fw-semibold` |
| Spacing | `--space-*` | `--space-4`, `--space-8` |
| Border radius | `--radius-*` | `--radius-md`, `--radius-full` |
| Shadows | `--shadow-*` | `--shadow-sm`, `--shadow-md` |

---

## TypeScript Types

All types are exported from the package root:

```tsx
import type {
  Workout,
  WorkoutCategory,
  Exercise,
  Goal,
  PersonalRecord,
  DifficultyLevel,
} from '@laurelma/fitness'
```
