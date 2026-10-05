# Peyma · پیما

Habit tracker with heatmaps, Trophy Road worlds, Insights dashboard, a focus Timer with presets, Persian/English UI, Jalali calendar and dark/light theme.

```bash
npm install
npm run dev      # development
npm run build    # production build -> dist/
```

- Data is stored in `localStorage` (key `peyma.v1`); use Settings → Backup / Restore to move it.
- `src/lib/core.js` holds the pure logic (dates, Jalali conversion, streaks, trophy formula, worlds).
- `src/store.jsx` holds state, theme, language, routing and toasts. Pages live in `src/components/`.
