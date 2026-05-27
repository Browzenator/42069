# $42069 COIN

Neon cyberpunk stoner-degen landing page for **$42069** on Solana.

> light it up · $42069 · pass it on
> // solana · LP burned · 0/0 tax · 4:20 always //

---

## Live

Drop the folder on any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, plain S3). There's no build step — `index.html` is the entry point.

### GitHub Pages
1. Push this folder to `main`.
2. Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `/ (root)` → **Save**.
3. Wait ~1 min, your site is at `https://<user>.github.io/<repo>/`.

### Local preview
Any static server works:

```bash
# python
python3 -m http.server 8080

# or node
npx serve .
```

Then open `http://localhost:8080`.

---

## Project structure

```
.
├── index.html              ← entry point
├── 42069.css               ← all styles (hero, tiles, smoke, marquees, scripture, footer)
├── 42069-fx.js             ← interactive FX (scramble, sys-errors, copy CA, cursor trail, popups)
├── 42069coin-bud-logo.png  ← hero wordmark (transparent BG)
├── 42069-cult-logo.png     ← tile 01 — contract / cult crest
├── owl-graphic.png         ← tile 02 — DEX screen mascot
├── 420-avatar.png          ← tile 03 — @42069_coin avatar (rendered circular)
└── README.md
```

## Sections

| Section | What it does |
|---|---|
| Top marquee | Auto-scrolling ticker tape |
| Hero | Glowing pulsing **42069COIN** wordmark with smoke puffs + contract copy pill |
| Three portals | Tile 01 copy CA · Tile 02 → Dexscreener · Tile 03 → X |
| Scripture | One-block manifesto |
| Bottom marquee | Reverse-scroll ticker |
| Footer | Disclaimer + sign-off |
| Epilepsy modal | "chill the strobe" toggle |

## Links wired in

- **Contract:** `5CxtvaR1SskwLxfzHGurx8Enu8bgSTPyWF3YP4sWpump`
- **Dexscreener:** https://dexscreener.com/solana/dcqnsnwcblgeyw6vgbpnlzrr8pbbjovergra8qapguhw
- **X:** https://x.com/42069_coin

Swap any of those in `index.html` (search for the URL or the CA string).

## Editing tips

- **Change the hero logo:** replace `42069coin-bud-logo.png` (keep transparent background).
- **Tile images:** replace the corresponding `.png` files; aspect ratios are forgiving (the tiles use `object-fit: contain` / `cover`).
- **Color cycling:** the toxic green palette lives in `42069.css` — search for `--toxic`, `--acid`, `--pink`.
- **Reduce motion:** the page respects `prefers-reduced-motion`. There's also an in-page "CHILL THE STROBE" button (epilepsy modal, bottom-right).

## License / disclaimer

> a work of fiction · a real coin · both at once
> all transmissions logged · no financial advice · puff responsibly
