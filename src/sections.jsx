/* ============================================================
   Sections: Nav, Hero, Process, Showcase, Benefits,
   Testimonials, Stats, FAQ, FinalCTA, Footer
   ============================================================ */
const { useEffect: uEffect, useState: uState } = React;

function Stars({ n = 5, size = 15 }) {
  return h("span", { className: "stars" },
    Array.from({ length: n }, (_, i) =>
      h("svg", { key: i, width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor" },
        h("path", { d: "M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.6 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z" }))));
}

/* Wort-für-Wort gestaffelter Heading-Reveal */
function AnimHeading({ text, tag, className, baseDelay }) {
  const t = tag || "h2";
  const cls = className || "";
  const delay = baseDelay || 0;
  const words = text.split(" ");
  return h(t, { className: cls },
    words.map((word, i) =>
      h("span", {
        key: i,
        "data-reveal": true,
        style: {
          display: "inline-block",
          marginRight: "0.28em",
          "--reveal-delay": (delay + i * 70) + "ms"
        }
      }, word)));
}

function Nav() {
  const [s, setS] = uState(false);
  uEffect(() => {
    const f = () => setS(window.scrollY > 30);
    window.addEventListener("scroll", f); f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  const jump = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  };
  return h("nav", { className: "nav" + (s ? " scrolled" : "") },
    h("div", { className: "container nav-in" },
      h("a", { className: "nav-logo", href: "#top", onClick: jump("top") },
        h("img", { src: "assets/logo-light.png", alt: "AMS" })),
      h("div", { className: "nav-links" },
        h("a", { href: "#prozess", onClick: jump("prozess") }, "So funktioniert's"),
        h("a", { href: "#vorteile", onClick: jump("vorteile") }, "Vorteile"),
        h("a", { href: "#stimmen", onClick: jump("stimmen") }, "Bewertungen"),
        h("a", { href: "#faq", onClick: jump("faq") }, "FAQ"),
        h("a", { href: "blog.html", style: { color: "var(--accent-2)" } }, "Blog")),
      h("div", { className: "nav-cta" },
        h("span", { className: "nav-phone" }, h(Icons.phone, { size: 16 }), "+49 177 8979287"),
        h("a", { href: "#top", onClick: jump("top"), className: "btn btn-primary", style: { padding: "11px 20px", fontSize: 14 } }, "Fahrzeug bewerten"))));
}

function Hero() {
  const hlEm = window.__amsHeadline || "mit oder ohne Schaden.";
  return h("header", { className: "hero", id: "top" },
    h("div", { className: "hero-stage" }),
    h("div", { className: "hero-grid" }),
    /* Animierte Glow-Orbs */
    h("div", { className: "hero-orb", style: { width: "600px", height: "600px", right: "-8%", top: "-20%", background: "radial-gradient(circle, rgba(78,161,255,.14), transparent 70%)", animation: "orbPulse 9s ease infinite" } }),
    h("div", { className: "hero-orb", style: { width: "380px", height: "380px", left: "3%", bottom: "5%", background: "radial-gradient(circle, rgba(43,111,214,.1), transparent 70%)", animation: "orbPulse 12s ease infinite 2.5s" } }),
    h("div", { className: "container hero-in" },
      h("div", { "data-reveal": true },
        h("div", { className: "hero-badge" }, h("span", { className: "dot" }), "Spezialist für Unfall- & Schadenfahrzeuge"),
        h("h1", null, "Ihr Auto verkaufen — ", h("em", null, hlEm)),
        h("p", { className: "hero-lead" }, "Ob Unfallwagen, Motorschaden oder gepflegter Gebrauchter — bewerten Sie Ihr Fahrzeug kostenlos. Sie erhalten schnellstmöglich Ihr Angebot, prüfen es in Ruhe und bei Zusage holt der Käufer Ihr Auto kostenlos ab."),
        h("div", { className: "hero-points" },
          ["Kostenlose Abholung", "Angebot in kürzester Zeit", "Keine Verhandlung"].map((t) =>
            h("span", { className: "hero-point", key: t }, h(Icons.check, { size: 17, sw: 2.2 }), t))),
        h("div", { className: "hero-actions" },
          h("div", { className: "hero-rating" },
            h(Stars, null),
            h("small", null, h("b", null, "4,9 / 5 · 2.800+ Verkäufe"), "Geprüfte Kundenbewertungen")))),
      h("div", { className: "hero-form-wrap", "data-reveal": true, style: { "--reveal-delay": "140ms" } },
        h("div", { className: "float-tag float-a" },
          h("div", { className: "ic" }, h(Icons.euro, { size: 17 })),
          h("div", { className: "tt" }, h("b", null, "Festpreis-Garantie"), "kein Abzug bei Übergabe")),
        h("div", { className: "float-tag float-b" },
          h("div", { className: "ic" }, h(Icons.truck, { size: 17 })),
          h("div", { className: "tt" }, h("b", null, "Bundesweite Abholung"), "auch nicht fahrbereit")),
        h(ValuationForm),
        h("div", { className: "vform-trust" },
          h("span", null, h(Icons.shield, { size: 15 }), "100 % unverbindlich"),
          h("span", null, h(Icons.clock, { size: 15 }), "Antwort schnellstmöglich"),
          h("span", null, h(Icons.check, { size: 15 }), "DSGVO-konform")))));
}

function Logos() {
  return h("section", { className: "logos" },
    h("div", { className: "container" },
      h("div", { className: "logos-lab", "data-reveal": true }, "Wir kaufen alle Marken — mit oder ohne Schaden"),
      h("div", { className: "logos-row", "data-reveal": true },
        ["Audi", "BMW", "Mercedes-Benz", "VW", "Porsche", "Tesla", "Volvo"].map((b) =>
          h("span", { key: b }, b)))));
}

function Process() {
  return h("section", { className: "sec", id: "prozess" },
    h("div", { className: "container" },
      h("div", { className: "sec-head", "data-reveal": true },
        h("span", { className: "eyebrow" }, "In vier Schritten"),
        h(AnimHeading, { text: "Vom Fahrzeug zur Auszahlung — so einfach.", baseDelay: 100 }),
        h("p", null, "Ein klarer, transparenter Ablauf. Sie geben die Daten ein, wir kümmern uns um den Rest.")),
      h("div", { className: "proc" },
        PROCESS.map((p, i) => h("div", { className: "proc-card", key: p.k, "data-reveal": true, style: { "--reveal-delay": i * 90 + "ms" } },
          h("span", { className: "k" }, p.k),
          h("div", { className: "pic" }, h(Icons[p.icon], { size: 23 })),
          h("h3", null, p.title),
          h("p", null, p.text))))));
}

function Showcase() {
  return h("section", { className: "sec", style: { paddingTop: 0 } },
    h("div", { className: "container showcase" },
      h("div", { className: "showcase-img-wrap", "data-reveal": true },
        h("img", {
          src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
          alt: "Fahrzeugankauf — AutoMitSchaden",
          style: { width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius)", display: "block", aspectRatio: "4/3" },
          loading: "lazy",
          onError: (e) => { e.target.style.display = "none"; e.target.parentElement.classList.add("ph"); e.target.parentElement.setAttribute("data-label", "Fahrzeug-Aufnahme"); }
        })),
      h("div", { "data-reveal": true, style: { "--reveal-delay": "120ms" } },
        h("span", { className: "eyebrow" }, "Warum AutoMitSchaden"),
        h(AnimHeading, { text: "Gebaut für Schadenfälle — nicht dagegen.", className: "sec-head", tag: "h2", baseDelay: 80 }),
        h("div", { className: "showcase-list" },
          [
            { icon: "shield", t: "Spezialisiert auf Schäden", d: "Wir bewerten Unfall-, Motor- und Getriebeschäden präzise — ohne pauschalen Sicherheitsabschlag." },
            { icon: "doc", t: "Komplette Abwicklung", d: "Kaufvertrag, Abmeldung und Transport übernehmen wir. Sie unterschreiben einmal — fertig." },
            { icon: "euro", t: "Ein Preis, der hält", d: "Der Festpreis im Angebot ist der Betrag, den Sie bei Übergabe erhalten. Garantiert." },
          ].map((x) => h("div", { className: "showcase-item", key: x.t },
            h("div", { className: "si" }, h(Icons[x.icon], { size: 20 })),
            h("div", null, h("h4", null, x.t), h("p", null, x.d))))))));
}

function Benefits() {
  return h("section", { className: "sec", id: "vorteile", style: { paddingTop: 30 } },
    h("div", { className: "container" },
      h("div", { className: "sec-head center", "data-reveal": true },
        h("span", { className: "eyebrow" }, "Ihre Vorteile"),
        h(AnimHeading, { text: "Der einfachste Weg, Ihr Fahrzeug zu verkaufen.", baseDelay: 80 }),
        h("p", null, "Kein Inserieren, kein Feilschen, keine Besichtigungen. Nur ein faires Angebot und eine reibungslose Abholung.")),
      h("div", { className: "bgrid", "data-reveal": true },
        BENEFITS.map((b) => h("div", { className: "bcard", key: b.title },
          h("div", { className: "bi" }, h(Icons[b.icon], { size: 22 })),
          h("h3", null, b.title),
          h("p", null, b.text))))));
}

function Stats() {
  const S = [["< 24 h", "Kontaktaufnahme"], ["2.800+", "angekaufte Fahrzeuge"], ["4,9/5", "Kundenbewertung"], ["100 %", "bundesweite Abholung"]];
  return h("section", { className: "sec", style: { paddingTop: 0, paddingBottom: 0 } },
    h("div", { className: "container" },
      h("div", { className: "stats", "data-reveal": true },
        S.map(([v, l], i) => h("div", { className: "stat", key: i }, h("div", { className: "sv" }, v), h("div", { className: "sl" }, l))))));
}

function Testimonials() {
  return h("section", { className: "sec", id: "stimmen" },
    h("div", { className: "container" },
      h("div", { className: "sec-head", "data-reveal": true },
        h("span", { className: "eyebrow" }, "Echte Erfahrungen"),
        h(AnimHeading, { text: "Tausende haben ihr Fahrzeug bereits verkauft.", baseDelay: 80 }),
        h("p", null, "Verkäufer aus ganz Deutschland — vom Motorschaden bis zum gepflegten Gebrauchten.")),
      h("div", { className: "tgrid" },
        TESTIMONIALS.map((t, i) => h("div", { className: "tcard", key: t.name, "data-reveal": true, style: { "--reveal-delay": (i % 2) * 100 + "ms" } },
          h("div", { className: "tmeta" }, h(Stars, { size: 14 }), h("span", { className: "dmg-tag" }, t.dmg)),
          h("p", { className: "tq" }, "\u201E", t.quote, "\u201C"),
          h("div", { className: "tf" },
            h("div", { className: "tav" }, t.name.charAt(0)),
            h("div", { className: "tn" }, h("b", null, t.name), h("span", null, t.car, " · ", t.loc))),
          t.date && h("div", { style: { fontSize: "11.5px", color: "var(--paper-faint)", marginTop: "-6px" } }, t.date))))));
}

function FAQ() {
  const [open, setOpen] = uState(0);
  return h("section", { className: "sec", id: "faq" },
    h("div", { className: "container faq" },
      h("div", { "data-reveal": true },
        h("span", { className: "eyebrow" }, "Häufige Fragen"),
        h(AnimHeading, { text: "Alles, was Sie wissen müssen.", tag: "h2", className: "sec-head", baseDelay: 80 }),
        h("p", { style: { color: "var(--paper-dim)", fontSize: 15.5, lineHeight: 1.6 } }, "Noch Fragen offen? Unser Team ist werktags von 8–20 Uhr für Sie erreichbar."),
        h("a", { href: "#top", className: "btn btn-ghost", style: { marginTop: 22 }, onClick: (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }, "Jetzt Fahrzeug bewerten")),
      h("div", { className: "faq-list", "data-reveal": true },
        FAQS.map((f, i) => h("div", { className: "faq-item" + (open === i ? " open" : ""), key: i },
          h("button", { className: "faq-q", onClick: () => setOpen(open === i ? -1 : i) }, f.q, h("span", { className: "fic" }, h(Icons.plus, { size: 16 }))),
          h("div", { className: "faq-a", style: { maxHeight: open === i ? "260px" : "0" } }, h("div", null, f.a)))))));
}

function FinalCTA() {
  return h("section", { className: "sec", style: { paddingBottom: 40 } },
    h("div", { className: "container" },
      h("div", { className: "fcta", "data-reveal": true },
        h("span", { className: "eyebrow", style: { justifyContent: "center" } }, "Unverbindlich & kostenlos"),
        h(AnimHeading, { text: "Bereit, Ihr Fahrzeug zu verkaufen?", tag: "h2", baseDelay: 80 }),
        h("p", null, "Geben Sie Ihre Fahrzeugdaten ein und erhalten Sie schnellstmöglich ein faires Angebot."),
        h("a", { href: "#top", className: "btn btn-primary", style: { fontSize: 16, padding: "17px 34px" }, onClick: (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }, "Fahrzeug jetzt bewerten", h(Icons.chevron, { size: 18 })))));
}

function Footer() {
  const openConsent = () => {
    if (typeof window.__openCookieBanner === "function") window.__openCookieBanner();
  };
  return h("footer", { className: "footer" },
    h("div", { className: "container" },
      h("div", { className: "foot-top" },
        h("div", { className: "foot-brand" },
          h("img", { src: "assets/logo-light.png", alt: "AMS" }),
          h("p", null, "AutoMitSchaden — die moderne Plattform für den Ankauf Ihres Fahrzeugs in ganz Deutschland.")),
        h("div", { className: "foot-col" }, h("h5", null, "Ankauf"),
          ["Unfallwagen", "Motorschaden", "Getriebeschaden", "Nicht fahrbereit", "Leasingrückläufer"].map((x) => h("a", { key: x, href: "#top" }, x))),
        h("div", { className: "foot-col" }, h("h5", null, "Unternehmen"),
          [
            { label: "So funktioniert's", href: "#prozess" },
            { label: "Über uns", href: "#" },
            { label: "Bewertungen", href: "#stimmen" },
            { label: "Kontakt", href: "#" },
          ].map((x) => h("a", { key: x.label, href: x.href }, x.label))),
        h("div", { className: "foot-col" }, h("h5", null, "Rechtliches"),
          h("a", { href: "impressum.html" }, "Impressum"),
          h("a", { href: "datenschutz.html" }, "Datenschutz"),
          h("a", { href: "datenschutz.html" }, "AGB"),
          h("button", { onClick: openConsent, style: { display: "block", padding: "6px 0", fontSize: 14, color: "var(--paper-dim)", textAlign: "left", cursor: "pointer", background: "none", border: "none", fontFamily: "inherit", transition: "color .2s" }, onMouseOver: (e) => e.target.style.color = "var(--paper)", onMouseOut: (e) => e.target.style.color = "var(--paper-dim)" }, "Cookie-Einstellungen"))),
      h("div", { className: "foot-bot" },
        h("span", null, "© 2026 AutoMitSchaden · Ali El-Toufaili · Alle Rechte vorbehalten"),
        h("span", null,
          h("a", { href: "impressum.html", style: { marginRight: 16 } }, "Impressum"),
          h("a", { href: "datenschutz.html" }, "Datenschutzerklärung")))));
}

function App() {
  return h(React.Fragment, null,
    h(Nav), h(Hero), h(Logos), h(Process), h(Showcase), h(Benefits), h(Stats), h(Testimonials), h(FAQ), h(FinalCTA), h(Footer));
}

window.App = App;
