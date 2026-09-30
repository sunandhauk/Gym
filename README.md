# Iron Pulse Fitness — React Frontend

This is a React (Vite) conversion of the original multi-page HTML/CSS/vanilla-JS
Iron Pulse Fitness site. All five pages, the shared modals, the BMI/goal
calculators, the class-booking schedule, and the member portal (bookings,
workout + water logger, saved profile) have been rebuilt as React components,
with `react-router-dom` handling page navigation and the same `localStorage`
keys (`ironpulse_*`) preserving member data across sessions.

## Structure
```
src/
  main.jsx              entry point
  App.jsx                router + shared layout (navbar, footer, modals, toast)
  styles.css              original stylesheet, unchanged
  context/StoreContext.jsx  global state (bookings, workouts, water, membership,
                             profile, favorites) + localStorage persistence
  data/                    programs, trainers, and class-schedule data
  hooks/useReveal.js       scroll-reveal + hero counter animation (IntersectionObserver)
  components/              Navbar, Footer, Toast, Testimonials, FinalCta, modals/
  pages/                   Home, Programs, Trainers, Membership, Portal
```

## Run it locally
```bash
npm install
npm run dev
```
Then open the printed local URL (typically http://localhost:5173).

## Build for production
```bash
npm run build
npm run preview
```

## Notes on the conversion
- Every `document.getElementById` / manual DOM-manipulation pattern from the
  original `app.js` was replaced with React state (`useState`) and context
  (`useStore()` in `StoreContext.jsx`), so components re-render declaratively
  instead of being imperatively patched.
- The four modals (program detail, trainer consultation, checkout, digital
  pass) are mounted once in `App.jsx` and controlled by a single `modal`
  value in the store, mirroring the "modals live on every page" structure of
  the original site.
- Routing uses `react-router-dom`; in-page anchors like `/#about` and
  `/membership#schedule` scroll to the matching element after navigating.
- `styles.css` was carried over as-is — all class names match what the
  components render, so no visual changes were needed.
