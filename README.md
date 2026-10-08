# Peyma

**Turn daily habits into a journey.** Peyma is a habit tracker that shows your consistency as heatmaps, rewards every check-in with trophies on a Clash Royale-style Trophy Road, and gives you a full insights dashboard to understand your progress.

*"Peyma" (پیما) comes from the Persian verb "paymudan", to travel or traverse. Every day you show up moves you one step further along the road.*

## What is Peyma?

Peyma helps you build good habits and quit bad ones. You add the habits you want to do every day and tick them off each day. Each habit gets a GitHub-style heatmap so you can see your consistency at a glance. As your streaks grow, you earn trophies and unlock new worlds, each with its own theme and short story. Everything runs in the browser, with no account and no backend.

## Features

### Habit tracking
- **Build or quit** habits, with a custom name, description, icon and color (21 colors, 10 icons)
- **One-tap check-in** from the home screen
- **Heatmap per habit** that adapts to your screen width, showing up to a year of history
- **Streaks and streak goals**, with encouraging messages on milestones (3, 7, 14, 30, 50, 100 and 365 days)
- **Habit details page** with a full monthly calendar. Tap a day to toggle it, or press and hold to add a note.
- **Three list views**: heatmap cards, simple checklist and compact rows

### Trophy Road
- **10 worlds**, from the Training Camp to the Legendary Palace, each with its own story, rank title and visual theme (colors, scenery, animated particles)
- The whole page **takes the theme of the world you are in**, and you can tap any world to preview its theme and story
- **Streak multiplier**: the longer a habit's streak, the more trophies each check-in gives
- A **perfect-day bonus** when you complete all your habits in one day
- Trophies are **always recalculated from your history**, so unchecking a day takes its trophies back

| World | Name | Trophies |
|------:|------|---------:|
| 1 | Training Camp | 0 – 50 |
| 2 | Magic Forest | 51 – 120 |
| 3 | Gold Mine | 121 – 220 |
| 4 | Ice Peak | 221 – 360 |
| 5 | Lava Forge | 361 – 550 |
| 6 | Deep Sea | 551 – 800 |
| 7 | Sky Citadel | 801 – 1120 |
| 8 | Moon Temple | 1121 – 1520 |
| 9 | Star Gate | 1521 – 2020 |
| 10 | Legendary Palace | 2021+ |

### Focus timer
- **Quick presets**: 5, 10, 15, 20, 25, 30, 45, 60 and 90 minutes, plus a custom duration
- Optionally **link a habit** to the timer and it is checked off automatically when the timer ends
- Keeps running while you browse other pages, with a live countdown in the header and in the browser tab title
- Sound and vibration when the timer finishes, and your daily focus minutes are saved

### Insights dashboard
- Ranges of **7, 30, 90 or 180 days**, for all habits or a single one
- Stats for check-ins, completion rate, perfect days, active days, daily average, best streak and current streak
- **Charts**: daily check-ins, trophy growth over time, a weekday breakdown and an overall heatmap
- **Highlights** such as your strongest and weakest weekday and the habits that need attention
- A **ranking** of your habits by completion rate

### Customization
- **Languages**: Persian (RTL) and English (LTR)
- **Calendars**: Jalali (Persian) and Gregorian, with a Saturday-first week
- **Themes**: dark, light, or follow the system
- **Responsive** from small phones to wide desktop screens, with a global header and footer navigation on every page

### Your data stays yours
- Everything is stored locally in your browser (`localStorage`)
- No sign-up, no tracking, no server
- **Backup and restore** your data as text from Settings

## Tech stack

- [React 18](https://react.dev) and [Vite 5](https://vite.dev)
- Plain CSS with design tokens for dark and light themes
- No UI or state libraries: the logic lives in `src/lib/core.js` and the app state in `src/store.jsx`

## Getting started

```bash
git clone https://github.com/<your-username>/peyma.git
cd peyma
npm install
npm run dev
```

Open https://peyma-ashkan-akbari-chi.vercel.app/
