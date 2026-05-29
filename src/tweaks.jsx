/* ============================================================
   Tweaks — accent palette, theme depth, headline, motion
   ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#4ea1ff", "#7fc0ff", "#2b6fd6"],
  "depth": "Mitternacht",
  "headline": "mit oder ohne Schaden.",
  "calmMotion": false
}/*EDITMODE-END*/;

function hexToRgba(hex, a) {
  const x = hex.replace("#", "");
  const r = parseInt(x.slice(0, 2), 16), g = parseInt(x.slice(2, 4), 16), b = parseInt(x.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function Root() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement.style;
    const [a, a2, deep] = t.accent;
    r.setProperty("--accent", a);
    r.setProperty("--accent-2", a2);
    r.setProperty("--accent-deep", deep);
    r.setProperty("--accent-glow", hexToRgba(a, 0.45));
  }, [t.accent]);

  React.useEffect(() => {
    const r = document.documentElement.style;
    if (t.depth === "Tiefnavy") {
      r.setProperty("--ink-950", "#08121c"); r.setProperty("--ink-900", "#0a1622");
      r.setProperty("--ink-850", "#0e1c2b"); r.setProperty("--ink-800", "#122436");
    } else {
      r.setProperty("--ink-950", "#0b1118"); r.setProperty("--ink-900", "#0e1520");
      r.setProperty("--ink-850", "#121c27"); r.setProperty("--ink-800", "#172232");
    }
  }, [t.depth]);

  React.useEffect(() => {
    document.documentElement.classList.toggle("calm-motion", !!t.calmMotion);
  }, [t.calmMotion]);

  window.__amsHeadline = t.headline;

  return h(React.Fragment, null,
    h(App, { key: t.headline }),
    h(CookieBanner),
    h(TweaksPanel, null,
      h(TweakSection, { label: "Marke" }),
      h(TweakColor, { label: "Akzentfarbe", value: t.accent, options: [
        ["#4ea1ff", "#7fc0ff", "#2b6fd6"],
        ["#d8b15e", "#ecd49a", "#b58e3a"],
        ["#4fc9a0", "#86e0c2", "#2f9c79"],
        ["#9a7bff", "#c0adff", "#6f4fe0"],
      ], onChange: (v) => setTweak("accent", v) }),
      h(TweakRadio, { label: "Hintergrund", value: t.depth, options: ["Mitternacht", "Tiefnavy"], onChange: (v) => setTweak("depth", v) }),
      h(TweakSection, { label: "Inhalt" }),
      h(TweakText, { label: "Headline-Akzent", value: t.headline, onChange: (v) => setTweak("headline", v) }),
      h(TweakSection, { label: "Bewegung" }),
      h(TweakToggle, { label: "Ruhiger Modus", value: t.calmMotion, onChange: (v) => setTweak("calmMotion", v) })));
}

window.Root = Root;
