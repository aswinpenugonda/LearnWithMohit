# LearnWithMohit

A free, static **JEE Mathematics** learning platform — clear concepts, essential formulas, and solved examples. Built with plain HTML, CSS, and JavaScript, and designed to be hosted on **GitHub Pages**.

## Features

- Topic-based learning (Algebra, Calculus, Trigonometry, Coordinate Geometry, Vectors & 3D, Probability)
- Math formulas rendered with [KaTeX](https://katex.org/)
- Client-side search and a lightweight hash-based router (no build step)
- Content stored in a single data file for easy editing

## Project structure

```
LearnWithMohit/
├── index.html          # App shell (header, nav, footer)
├── .nojekyll           # Tells GitHub Pages to serve files as-is
├── css/
│   └── styles.css      # Styles
└── js/
    ├── data.js         # All learning content (edit this to add topics)
    └── app.js          # Router + rendering logic
```

## Run locally

No build step is needed. Any static server works:

```powershell
# Option 1: Python
python -m http.server 8000

# Option 2: Node (if installed)
npx serve .
```

Then open http://localhost:8000

> Tip: open `index.html` via a local server rather than `file://` so the KaTeX CDN and routing behave correctly.

## Add or edit content

All content lives in [js/data.js](js/data.js). Each topic looks like:

```js
{
  id: "algebra",           // used in the URL (#/topic/algebra)
  title: "Algebra",
  icon: "🔢",
  summary: "Short description.",
  concepts: [
    {
      heading: "Quadratic Equations",
      body: "Use \\( ... \\) for inline math.",
      formulas: ["x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}"],
      examples: [{ q: "Question?", a: "Answer." }]
    }
  ]
}
```

Write math in LaTeX: `\( ... \)` for inline and `\[ ... \]` for block.

## Deploy to GitHub Pages

1. Create a new repository (e.g. `LearnWithMohit`) and push this folder.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, pick the `main` branch and `/ (root)` folder.
4. Save. Your site will be available at `https://<username>.github.io/LearnWithMohit/`.

The included `.nojekyll` file ensures GitHub Pages serves all files without Jekyll processing.

## Roadmap (adding a backend later)

The front-end reads content from `window.LWM_DATA`. To move to a server:

1. Build an API that returns the same JSON shape as `data.js`.
2. Replace the data file with a `fetch()` call in `js/app.js` before the first render.

No other structural changes are required.

## License

Free to use for educational purposes.
Learn Math JEE with Mohit
