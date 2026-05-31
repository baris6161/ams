/* ============================================================
   Sections: Nav, Hero, Process, Showcase, Benefits,
   Testimonials, Stats, FAQ, FinalCTA, Footer
   ============================================================ */
const { useEffect: uEffect, useState: uState, useRef: uRef, useCallback: uCB } = React;

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
      h(React.Fragment, { key: i },
        h("span", { className: "anim-word" },
          h("span", {
            "data-reveal": true,
            style: { "--reveal-delay": (delay + i * 75) + "ms" }
          }, word)),
        i < words.length - 1 ? " " : null)));
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
        h("a", { href: "https://wa.me/4917789792870", className: "nav-wa-mobile", target: "_blank", rel: "noopener", "aria-label": "WhatsApp" },
          h("svg", { width: 20, height: 20, viewBox: "0 0 24 24", fill: "currentColor" },
            h("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }))),
        h("a", { href: "#bewertungsformular", className: "btn btn-primary", style: { padding: "11px 20px", fontSize: 14 },
        onClick: (e) => {
          e.preventDefault();
          const isMobile = window.innerWidth <= 980;
          const target = isMobile
            ? document.getElementById("bewertungsformular")
            : document.getElementById("top");
          if (target) window.scrollTo({ top: target.offsetTop - (isMobile ? 84 : 0), behavior: "smooth" });
        }
      }, "Fahrzeug bewerten"))));
}

function Hero() {
  const hlEm = window.__amsHeadline || "mit oder ohne Schaden.";
  const [spot, setSpot] = uState({ x: 60, y: 40 });
  const onMove = uCB((e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, []);
  return h("header", { className: "hero", id: "top", onMouseMove: onMove },
    h("div", { className: "hero-stage" }),
    h("div", { className: "hero-grid" }),
    h("div", { className: "hero-spotlight", style: { background: "radial-gradient(520px circle at " + spot.x + "% " + spot.y + "%, rgba(78,161,255,0.13), transparent 65%)" } }),
    /* Animierte Glow-Orbs */
    h("div", { className: "hero-orb", style: { width: "600px", height: "600px", right: "-8%", top: "-20%", background: "radial-gradient(circle, rgba(78,161,255,.14), transparent 70%)", animation: "orbPulse 9s ease infinite" } }),
    h("div", { className: "hero-orb", style: { width: "380px", height: "380px", left: "3%", bottom: "5%", background: "radial-gradient(circle, rgba(43,111,214,.1), transparent 70%)", animation: "orbPulse 12s ease infinite 2.5s" } }),
    h("div", { className: "container hero-in" },
      h("div", { "data-reveal": true },
        h("div", { className: "hero-badge" }, h("span", { className: "dot" }), "Spezialist für Unfall- & Schadenfahrzeuge"),
        h("h1", null,
        ...["Ihr", "Auto", "verkaufen", "—"].map((w, i) =>
          h(React.Fragment, { key: "w" + i },
            h("span", { className: "anim-word" },
              h("span", { "data-reveal": true, style: { "--reveal-delay": (240 + i * 85) + "ms" } }, w)),
            " ")),
        h("span", { className: "anim-word" },
          h("em", { "data-reveal": true, style: { display: "inline-block", "--reveal-delay": "590ms" } }, hlEm))),
        h("p", { className: "hero-lead" }, "Ob Unfallwagen, Motorschaden oder gepflegter Gebrauchter — bewerten Sie Ihr Fahrzeug kostenlos. Sie erhalten schnellstmöglich Ihr Angebot, prüfen es in Ruhe und bei Zusage holt der Käufer Ihr Auto kostenlos ab."),
        h("div", { className: "hero-points" },
          ["Kostenlose Abholung", "Angebot in kürzester Zeit", "Keine Verhandlung", "Zahlung bei Übergabe"].map((t) =>
            h("span", { className: "hero-point", key: t }, h(Icons.check, { size: 17, sw: 2.2 }), t))),
        h("div", { className: "hero-actions" },
          h("div", { className: "hero-rating" },
            h(Stars, null),
            h("small", null, h("b", null, "4,9 / 5 · 2.800+ Verkäufe"), "Geprüfte Kundenbewertungen")))),
      h("div", { className: "hero-form-wrap", id: "bewertungsformular", "data-reveal": true, style: { "--reveal-delay": "140ms" } },
        h(ValuationForm),
        h("div", { className: "vform-trust" },
          h("span", null, h(Icons.shield, { size: 15 }), "100 % unverbindlich"),
          h("span", null, h(Icons.clock, { size: 15 }), "Antwort schnellstmöglich"),
          h("span", null, h(Icons.check, { size: 15 }), "DSGVO-konform")))));
}

function Logos() {
  const brands = ["Audi", "BMW", "Mercedes-Benz", "VW", "Porsche", "Tesla", "Volvo", "Opel", "Ford", "Renault", "Toyota", "Hyundai", "Kia", "Skoda", "Seat"];
  const track = [...brands, ...brands];
  return h("section", { className: "logos" },
    h("div", { className: "container" },
      h("div", { className: "logos-lab", "data-reveal": true }, "Wir kaufen alle Marken — mit oder ohne Schaden")),
    h("div", { className: "logos-marquee" },
      h("div", { className: "logos-track" },
        track.map((b, i) => h("span", { key: i }, b)))));
}

function Process() {
  return h("section", { className: "sec", id: "prozess" },
    h("div", { className: "container" },
      h("div", { className: "sec-head", "data-reveal": true },
        h("span", { className: "eyebrow" }, "In vier Schritten"),
        h(AnimHeading, { text: "Vom Fahrzeug zur Auszahlung — so einfach.", baseDelay: 100 }),
        h("p", { "data-reveal": true, style: { "--reveal-delay": "320ms" } }, "Ein klarer, transparenter Ablauf. Sie geben die Daten ein, wir kümmern uns um den Rest.")),
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
      h("div", { className: "showcase-img-wrap showcase-img-wipe", "data-reveal": true },
        h("img", {
          src: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=85",
          alt: "Professioneller Fahrzeugankauf — AutoMitSchaden",
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
          ].map((x, i) => h("div", { className: "showcase-item", key: x.t, "data-reveal": true, style: { "--reveal-delay": (200 + i * 120) + "ms" } },
            h("div", { className: "si" }, h(Icons[x.icon], { size: 20 })),
            h("div", null, h("h4", null, x.t), h("p", null, x.d))))))));
}

function Benefits() {
  return h("section", { className: "sec", id: "vorteile", style: { paddingTop: 30 } },
    h("div", { className: "container" },
      h("div", { className: "sec-head center", "data-reveal": true },
        h("span", { className: "eyebrow" }, "Ihre Vorteile"),
        h(AnimHeading, { text: "Der einfachste Weg, Ihr Fahrzeug zu verkaufen.", baseDelay: 80 }),
        h("p", { "data-reveal": true, style: { "--reveal-delay": "280ms" } }, "Kein Inserieren, kein Feilschen, keine Besichtigungen. Nur ein faires Angebot und eine reibungslose Abholung.")),
      h("div", { className: "bgrid" },
        BENEFITS.map((b, i) => h("div", { className: "bcard", key: b.title, "data-reveal": true, style: { "--reveal-delay": i * 90 + "ms" } },
          h("div", { className: "bi" }, h(Icons[b.icon], { size: 22 })),
          h("h3", null, b.title),
          h("p", null, b.text))))));
}

function Stats() {
  const ref = uRef(null);
  const [prog, setProg] = uState(0);
  const done = uRef(false);
  uEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      io.disconnect();
      const dur = 2400, t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        setProg(1 - Math.pow(1 - p, 3));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const fmt = (v) => Math.round(v * 2800).toLocaleString("de-DE") + "+";
  const fmtR = (v) => (v * 4.9).toFixed(1).replace(".", ",") + "/5";
  const fmtP = (v) => Math.round(v * 100) + " %";
  const active = prog > 0;
  const S = [
    ["< 24 h", "Kontaktaufnahme"],
    [active ? fmt(prog) : "2.800+", "angekaufte Fahrzeuge"],
    [active ? fmtR(prog) : "4,9/5", "Kundenbewertung"],
    [active ? fmtP(prog) : "100 %", "bundesweite Abholung"]
  ];
  return h("section", { className: "sec", style: { paddingTop: 0, paddingBottom: 0 } },
    h("div", { className: "container" },
      h("div", { className: "stats", "data-reveal": true, ref },
        S.map(([v, l], i) => h("div", { className: "stat", key: i }, h("div", { className: "sv" }, v), h("div", { className: "sl" }, l))))));
}

function Testimonials() {
  return h("section", { className: "sec", id: "stimmen" },
    h("div", { className: "container" },
      h("div", { className: "sec-head", "data-reveal": true },
        h("span", { className: "eyebrow" }, "Echte Erfahrungen"),
        h(AnimHeading, { text: "Tausende haben ihr Fahrzeug bereits verkauft.", baseDelay: 80 }),
        h("p", { "data-reveal": true, style: { "--reveal-delay": "280ms" } }, "Verkäufer aus ganz Deutschland — vom Motorschaden bis zum gepflegten Gebrauchten.")),
      h("div", { className: "tgrid" },
        TESTIMONIALS.map((t, i) => h("div", { className: "tcard", key: t.name, "data-reveal": true, style: { "--reveal-delay": (i % 2) * 100 + "ms" } },
          h("div", { className: "tmeta" }, h(Stars, { size: 14 }), h("span", { className: "dmg-tag" }, t.dmg)),
          h("p", { className: "tq" }, "\u201E", t.quote, "\u201C"),
          h("div", { className: "tf" },
            h("div", { className: "tav" }, t.name.charAt(0)),
            h("div", { className: "tn" }, h("b", null, t.name), h("span", null, t.car, " · ", t.loc))))))));
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
        h("p", { "data-reveal": true, style: { "--reveal-delay": "200ms" } }, "Geben Sie Ihre Fahrzeugdaten ein und erhalten Sie schnellstmöglich ein faires Angebot."),
        h("a", { href: "#top", className: "btn btn-primary", style: { fontSize: 16, padding: "17px 34px" }, onClick: (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }, "Fahrzeug jetzt bewerten", h(Icons.chevron, { size: 18 })))));
}

function Footer() {
  const openConsent = () => {
    if (typeof window.__openCookieBanner === "function") window.__openCookieBanner();
  };
  return h("footer", { className: "footer" },
    h("div", { className: "container" },
      h("div", { className: "foot-top" },
        h("div", { className: "foot-brand", "data-reveal": true, style: { "--reveal-delay": "0ms" } },
          h("img", { src: "assets/logo-light.png", alt: "AMS" }),
          h("p", null, "AutoMitSchaden — die moderne Plattform für den Ankauf Ihres Fahrzeugs in ganz Deutschland.")),
        h("div", { className: "foot-col", "data-reveal": true, style: { "--reveal-delay": "80ms" } }, h("h5", null, "Ankauf"),
          ["Unfallwagen", "Motorschaden", "Getriebeschaden", "Nicht fahrbereit", "Leasingrückläufer"].map((x) => h("a", { key: x, href: "#top" }, x))),
        h("div", { className: "foot-col", "data-reveal": true, style: { "--reveal-delay": "160ms" } }, h("h5", null, "Unternehmen"),
          [
            { label: "So funktioniert's", href: "#prozess" },
            { label: "Über uns", href: "#" },
            { label: "Bewertungen", href: "#stimmen" },
          ].map((x) => h("a", { key: x.label, href: x.href }, x.label))),
        h("div", { className: "foot-col", "data-reveal": true, style: { "--reveal-delay": "240ms" } }, h("h5", null, "Kontakt"),
          h("a", { href: "tel:+491778979287", className: "foot-contact-link" }, h(Icons.phone, { size: 14 }), "+49 177 8979287"),
          h("a", { href: "https://wa.me/4917789792870", className: "foot-contact-link", target: "_blank", rel: "noopener" },
            h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "currentColor" },
              h("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })),
            "WhatsApp"),
          h("a", { href: "mailto:info@automitschaden.de", className: "foot-contact-link" }, h(Icons.mail, { size: 14 }), "info@automitschaden.de")),
        h("div", { className: "foot-col", "data-reveal": true, style: { "--reveal-delay": "320ms" } }, h("h5", null, "Rechtliches"),
          h("a", { href: "impressum.html" }, "Impressum"),
          h("a", { href: "datenschutz.html" }, "Datenschutz"),
          h("button", { onClick: openConsent, style: { display: "block", padding: "6px 0", fontSize: 14, color: "var(--paper-dim)", textAlign: "left", cursor: "pointer", background: "none", border: "none", fontFamily: "inherit", transition: "color .2s" }, onMouseOver: (e) => e.target.style.color = "var(--paper)", onMouseOut: (e) => e.target.style.color = "var(--paper-dim)" }, "Cookie-Einstellungen"))),
      h("div", { className: "foot-bot" },
        h("span", null, "© 2026 AutoMitSchaden · Ali El-Toufaili · Alle Rechte vorbehalten"),
        h("span", null,
          h("a", { href: "impressum.html", style: { marginRight: 16 } }, "Impressum"),
          h("a", { href: "datenschutz.html" }, "Datenschutzerklärung")))));
}

function FloatingContact() {
  const [open, setOpen] = uState(false);
  return h("div", { className: "float-contact" + (open ? " open" : "") },
    open && h("div", { className: "float-contact-menu" },
      h("a", { href: "tel:+491778979287", className: "float-contact-item", onClick: () => setOpen(false) },
        h(Icons.phone, { size: 18 }), h("span", null, "+49 177 8979287")),
      h("a", { href: "https://wa.me/4917789792870", className: "float-contact-item float-contact-wa", target: "_blank", rel: "noopener", onClick: () => setOpen(false) },
        h("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor" },
          h("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" })),
        h("span", null, "WhatsApp")),
      h("a", { href: "mailto:info@automitschaden.de", className: "float-contact-item", onClick: () => setOpen(false) },
        h(Icons.mail, { size: 18 }), h("span", null, "E-Mail"))),
    h("button", { className: "float-contact-btn", onClick: () => setOpen(!open), "aria-label": "Kontakt" },
      open
        ? h("svg", { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" }, h("path", { d: "M18 6 6 18M6 6l12 12" }))
        : h(Icons.phone, { size: 22 })));
}

function App() {
  return h(React.Fragment, null,
    h(Nav), h(Hero), h(Logos), h(Process), h(Showcase), h(Benefits), h(Stats), h(Testimonials), h(FAQ), h(FinalCTA), h(Footer), h(FloatingContact));
}

window.App = App;
