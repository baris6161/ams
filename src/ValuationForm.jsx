/* ============================================================
   ValuationForm — 4-step multi-step lead form
   ============================================================ */
const { useState, useRef, useMemo } = React;

const MONTHS = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const YEARS = Array.from({ length: 86 }, (_, i) => String(2025 - i));

// EmailJS config — set your credentials here
const EJS_SERVICE        = "YOUR_SERVICE_ID";
const EJS_TEMPLATE       = "YOUR_TEMPLATE_ID";        // Business-Mail → info@automitschaden.de
const EJS_TEMPLATE_CONFIRM = "YOUR_CONFIRM_TEMPLATE_ID"; // Bestätigung → Nutzer-E-Mail
const EJS_KEY            = "YOUR_PUBLIC_KEY";
// EmailJS Confirm-Template Felder: to_email, user_name, brand, model, km, year, month, damages, drivable

function fmtKm(v) {
  const n = String(v).replace(/\D/g, "");
  if (!n) return "";
  return Number(n).toLocaleString("de-DE");
}

function Chev() { return h(Icons.chevron, { size: 18, className: "chev", style: { transform: "rotate(90deg)" } }); }

function Field({ label, req, children, errorMsg }) {
  return h("div", { className: "field" },
    h("label", null, label, req && h("span", { className: "req" }, " *")),
    children,
    errorMsg && h("div", { className: "field-error-msg" }, errorMsg));
}

function Select({ value, onChange, placeholder, options, disabled, error }) {
  return h("div", { className: "ctl" + (disabled ? " ctl-disabled" : "") + (error ? " ctl-error" : "") },
    h("select", {
        value,
        onChange: (e) => onChange(e.target.value),
        required: true,
        disabled: !!disabled,
        style: disabled ? { opacity: 0.5, cursor: "not-allowed" } : {}
      },
      h("option", { value: "", disabled: true }, placeholder),
      options.map((o) => h("option", { key: o, value: o }, o))),
    h(Chev));
}

function Dropzone({ data, kind, label, sub, onAdd, onRemove }) {
  const [over, setOver] = useState(false);
  const inputRef = useRef(null);
  const files = data[kind] || [];
  const handle = (n) => onAdd(kind, n);
  return h("div", {
      className: "drop" + (over ? " over" : ""),
      onClick: () => inputRef.current && inputRef.current.click(),
      onDragOver: (e) => { e.preventDefault(); setOver(true); },
      onDragLeave: () => setOver(false),
      onDrop: (e) => { e.preventDefault(); setOver(false); handle(Math.max(1, e.dataTransfer.files.length || 1)); },
    },
    h("input", { ref: inputRef, type: "file", multiple: true, accept: "image/*", hidden: true,
      onChange: (e) => handle(Math.max(1, e.target.files.length)) }),
    h("div", { className: "drop-head" },
      h("div", { className: "drop-ic" }, h(Icons.upload, { size: 19 })),
      h("div", null,
        h("div", { className: "drop-t" }, label),
        h("div", { className: "drop-s" }, sub))),
    files.length > 0 && h("div", { className: "thumbs" },
      files.map((f, i) =>
        h("div", { className: "thumb", key: f.id },
          h(Icons.car, { size: 18 }),
          h("button", { className: "rm", onClick: (e) => { e.stopPropagation(); onRemove(kind, f.id); } }, "×")))));
}

function ValuationForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState("fwd");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [tried, setTried] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [d, setD] = useState({
    brand: "", model: "", month: "", year: "", km: "", preisvorstellung: "",
    damages: [], drivable: "", tuev: "", finance: "", owners: 1,
    photos: [], damagePhotos: [],
    name: "", phone: "", email: "", plz: "",
  });
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));

  const setBrand = (v) => setD((p) => ({ ...p, brand: v, model: "" }));

  const toggleDmg = (id) => setD((p) => {
    if (id === "kein") {
      return { ...p, damages: p.damages.includes("kein") ? [] : ["kein"] };
    }
    const without = p.damages.filter((x) => x !== "kein");
    return {
      ...p,
      damages: without.includes(id) ? without.filter((x) => x !== id) : [...without, id]
    };
  });
  const addFiles = (kind, n) => setD((p) => ({
    ...p,
    [kind]: [...p[kind], ...Array.from({ length: n }, () => ({ id: Math.random().toString(36).slice(2) }))]
  }));
  const rmFile = (kind, id) => setD((p) => ({ ...p, [kind]: p[kind].filter((f) => f.id !== id) }));

  const modelOptions = useMemo(() => {
    if (!d.brand) return [];
    return (MODELS && MODELS[d.brand]) ? MODELS[d.brand] : ["Andere"];
  }, [d.brand]);

  const steps = [
    { t: "Fahrzeugdaten", s: "Marke, Modell und Eckdaten Ihres Fahrzeugs." },
    { t: "Schaden & Zustand", s: "Was liegt vor? Mehrfachauswahl möglich." },
    { t: "Fahrzeugdetails", s: "Fahrbereitschaft, TÜV und weitere Angaben." },
    { t: "Bilder hochladen", s: "Optional — beschleunigt Ihr Angebot deutlich." },
    { t: "Kontaktdaten", s: "Wohin dürfen wir Ihr Angebot senden?" },
  ];

  const valid = useMemo(() => [
    d.brand && d.model && d.month && d.year && d.km,
    d.damages.length > 0,
    d.drivable && d.tuev,
    true,
    d.name.trim() && /\d{3}/.test(d.phone) && /@/.test(d.email) && /^\d{5}$/.test(d.plz),
  ], [d]);

  const shake = () => { setShaking(true); setTimeout(() => setShaking(false), 500); };
  const go = (n) => { setDir(n > step ? "fwd" : "back"); setStep(n); setTried(false); setShaking(false); };
  const next = () => {
    if (!valid[step]) { setTried(true); shake(); return; }
    if (step < 4) go(step + 1);
  };

  const submit = () => {
    if (!valid[4]) { setTried(true); shake(); return; }
    setTried(false);
    setSending(true);
    const dmgText = d.damages.includes("kein")
      ? "Kein Schaden (gepflegter Gebrauchter)"
      : d.damages.join(", ") || "Keine Angabe";
    const params = {
      from_name: d.name,
      phone: d.phone,
      email: d.email,
      plz: d.plz,
      brand: d.brand,
      model: d.model,
      km: fmtKm(d.km),
      year: d.year,
      month: d.month,
      preisvorstellung: d.preisvorstellung ? (d.preisvorstellung + " €") : "Keine Angabe",
      damages: dmgText,
      drivable: d.drivable,
      tuev: d.tuev,
      finance: d.finance || "Nein",
      owners: d.owners >= 6 ? "6+" : String(d.owners),
      to_email: "info@automitschaden.de",
    };
    const confirmParams = {
      to_email: d.email,
      user_name: d.name.split(" ")[0] || d.name,
      brand: d.brand,
      model: d.model,
      km: fmtKm(d.km),
      year: d.year,
      month: d.month,
      damages: dmgText,
      drivable: d.drivable,
    };
    const tryEmail = () => {
      if (typeof emailjs !== "undefined" && EJS_SERVICE !== "YOUR_SERVICE_ID") {
        return Promise.all([
          emailjs.send(EJS_SERVICE, EJS_TEMPLATE, params, EJS_KEY),
          EJS_TEMPLATE_CONFIRM !== "YOUR_CONFIRM_TEMPLATE_ID"
            ? emailjs.send(EJS_SERVICE, EJS_TEMPLATE_CONFIRM, confirmParams, EJS_KEY)
            : Promise.resolve(),
        ]);
      }
      return Promise.resolve();
    };
    tryEmail()
      .finally(() => { setSending(false); setDone(true); });
  };

  if (done) {
    return h("div", { className: "vform" },
      h("div", { className: "vform-glow" }),
      h("div", { className: "vsuccess" },
        h("div", { className: "ring" }, h(Icons.check, { size: 34, sw: 2.2 })),
        h("h3", null, "Geschafft, ", d.name.split(" ")[0] || "alles klar", "!"),
        h("p", null, "Ihre Anfrage ist bei uns eingegangen. Unser Team meldet sich schnellstmöglich mit einem persönlichen Angebot bei Ihnen."),
        h("div", { className: "vest" },
          h("div", { className: "lab" }, "Nächste Schritte"),
          h("div", { style: { fontSize: 14, color: "rgba(245,247,248,.8)", marginTop: 10, lineHeight: 1.65 } },
            h("p", { style: { marginBottom: 8 } }, "1. Wir prüfen Ihre Anfrage"),
            h("p", { style: { marginBottom: 8 } }, "2. Sie erhalten unser Angebot per Telefon oder E-Mail"),
            h("p", null, "3. Bei Zusage: kostenlose Abholung & Zahlung bei Übergabe"))),
        h("button", { className: "vbtn vbtn-next", style: { marginTop: 22 }, onClick: () => { setDone(false); setStep(0); setTried(false); setD({ brand: "", model: "", month: "", year: "", km: "", preisvorstellung: "", damages: [], drivable: "", tuev: "", finance: "", owners: 1, photos: [], damagePhotos: [], name: "", phone: "", email: "", plz: "" }); } }, "Weiteres Fahrzeug bewerten")));
  }

  const cur = steps[step];
  return h("div", { className: "vform" },
    h("div", { className: "vform-glow" }),
    h("div", { className: "vform-head" },
      h("div", { className: "vform-meta" },
        h("span", { className: "vform-step-label" }, "Schritt ", step + 1, " von 5 — ", h("span", { className: "vform-step-name" }, cur.t)),
        h("span", { className: "vform-secure" }, h(Icons.shield, { size: 14 }), "SSL-verschlüsselt")),
      h("div", { className: "vbar" },
        steps.map((_, i) => h("div", { key: i, className: "vbar-seg" + (i < step ? " done" : i === step ? " active" : "") }, h("i")))),
      h("div", { className: "vform-title" }, cur.t),
      h("div", { className: "vform-sub" }, cur.s)),

    h("div", { className: "vform-body" },
      tried && !valid[step] && h("div", { className: "vform-error-banner" },
        h("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" },
          h("path", { d: "M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" })),
        "Bitte alle Pflichtfelder ausfüllen"),
      h("div", { className: "vstep" + (dir === "back" ? " back" : ""), key: step },

        step === 0 && h(React.Fragment, null,
          h("div", { className: "vgrid two" },
            h(Field, { label: "Marke", req: true, errorMsg: tried && !d.brand ? "Pflichtfeld" : null },
              h(Select, { value: d.brand, onChange: setBrand, placeholder: "Marke wählen", options: BRANDS, error: tried && !d.brand })),
            h(Field, { label: "Modell", req: true, errorMsg: tried && !d.model ? (!d.brand ? "Zuerst Marke auswählen" : "Pflichtfeld") : null },
              h("div", { title: !d.brand ? "Zuerst die Marke auswählen" : undefined, style: !d.brand ? { cursor: "not-allowed" } : {} },
                h(Select, {
                  value: d.model,
                  onChange: (v) => set("model", v),
                  placeholder: d.brand ? "Modell wählen" : "Erst Marke wählen",
                  options: modelOptions,
                  disabled: !d.brand,
                  error: tried && d.brand && !d.model
                })))),
          h("div", { className: "vgrid two", style: { marginTop: 14 } },
            h(Field, { label: "Kilometerstand", req: true, errorMsg: tried && !d.km ? "Pflichtfeld" : null },
              h("div", { className: "ctl" + (tried && !d.km ? " ctl-error" : "") },
                h("input", { inputMode: "numeric", value: fmtKm(d.km), placeholder: "125.000", onChange: (e) => set("km", e.target.value) }),
                h("span", { className: "suf" }, "km"))),
            h(Field, { label: "Preisvorstellung" },
              h("div", { className: "ctl" },
                h("input", { inputMode: "numeric", value: d.preisvorstellung, placeholder: "Optional", onChange: (e) => set("preisvorstellung", e.target.value.replace(/\D/g, "")) }),
                h("span", { className: "suf" }, "€")))),
          h("div", { className: "vgrid two", style: { marginTop: 14 } },
            h(Field, { label: "EZ Monat", req: true, errorMsg: tried && !d.month ? "Pflichtfeld" : null },
              h(Select, { value: d.month, onChange: (v) => set("month", v), placeholder: "Monat", options: MONTHS, error: tried && !d.month })),
            h(Field, { label: "EZ Jahr", req: true, errorMsg: tried && !d.year ? "Pflichtfeld" : null },
              h(Select, { value: d.year, onChange: (v) => set("year", v), placeholder: "Jahr", options: YEARS, error: tried && !d.year })))),

        step === 1 && h(React.Fragment, null,
          h("div", { className: tried && d.damages.length === 0 ? "chips-error-wrap" : "" },
            h("div", { className: "chips" },
              DAMAGES.map((dm) => h("button", { key: dm.id, className: "chip" + (d.damages.includes(dm.id) ? " on" : ""), onClick: () => toggleDmg(dm.id) },
                h("span", { className: "box" }, h(Icons.check, { size: 13, sw: 2.4 })),
                h("span", { className: "ctext" }, h("b", null, dm.label), h("span", null, dm.hint))))),
            tried && d.damages.length === 0 && h("div", { className: "chips-error-msg" }, "Bitte Schaden oder \u201eKein Schaden\u201c w\u00e4hlen"))),

        step === 2 && h(React.Fragment, null,
          h("div", null,
            h("div", { className: "qrow" },
              h("span", null, "Fahrbereit?"),
              h("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 } },
                h("div", { className: "seg acc" + (tried && !d.drivable ? " seg-error-wrap" : "") },
                  ["Ja", "Nein"].map((o) => h("button", { key: o, className: d.drivable === o ? "on" : "", onClick: () => set("drivable", o) }, o))),
                tried && !d.drivable && h("span", { style: { fontSize: 11, color: "#d94f4f", fontWeight: 600 } }, "Pflichtfeld"))),
            h("div", { className: "qrow" },
              h("span", null, "TÜV vorhanden?"),
              h("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 } },
                h("div", { className: "seg acc" + (tried && !d.tuev ? " seg-error-wrap" : "") },
                  ["Ja", "Nein"].map((o) => h("button", { key: o, className: d.tuev === o ? "on" : "", onClick: () => set("tuev", o) }, o))),
                tried && !d.tuev && h("span", { style: { fontSize: 11, color: "#d94f4f", fontWeight: 600 } }, "Pflichtfeld"))),
            h("div", { className: "qrow" }, h("span", null, "Leasing / finanziert?"),
              h("div", { className: "seg" }, ["Nein", "Leasing", "Finanziert"].map((o) => h("button", { key: o, className: d.finance === o ? "on" : "", onClick: () => set("finance", o) }, o)))),
            h("div", { className: "qrow" }, h("span", null, "Anzahl Vorbesitzer"),
              h("div", { className: "stepper" },
                h("button", { onClick: () => set("owners", Math.max(1, d.owners - 1)) }, h(Icons.chevron, { size: 14, style: { transform: "rotate(180deg)" } })),
                h("b", null, d.owners >= 6 ? "6+" : d.owners),
                h("button", { onClick: () => set("owners", Math.min(6, d.owners + 1)) }, h(Icons.chevron, { size: 14 })))))),

        step === 3 && h("div", { className: "drops" },
          h(Dropzone, { data: d, kind: "photos", label: "Fahrzeugbilder", sub: "Front, Heck, Seite, Innenraum — Dateien ablegen oder klicken", onAdd: addFiles, onRemove: rmFile }),
          h(Dropzone, { data: d, kind: "damagePhotos", label: "Schadensbilder", sub: "Nahaufnahmen der betroffenen Stellen", onAdd: addFiles, onRemove: rmFile })),

        step === 4 && h(React.Fragment, null,
          h("div", { className: "vgrid two" },
            h(Field, { label: "Name", req: true, errorMsg: tried && !d.name.trim() ? "Bitte Namen eingeben" : null },
              h("div", { className: "ctl" + (tried && !d.name.trim() ? " ctl-error" : "") },
                h("input", { value: d.name, placeholder: "Max Mustermann", onChange: (e) => set("name", e.target.value) }))),
            h(Field, { label: "Telefon", req: true, errorMsg: tried && !/\d{3}/.test(d.phone) ? "Bitte Telefonnummer angeben" : null },
              h("div", { className: "ctl" + (tried && !/\d{3}/.test(d.phone) ? " ctl-error" : "") },
                h(Icons.phone, { size: 16, className: "pre" }),
                h("input", { inputMode: "tel", value: d.phone, placeholder: "0151 23456789", onChange: (e) => set("phone", e.target.value) })))),
          h("div", { className: "vgrid two", style: { marginTop: 14 } },
            h(Field, { label: "E-Mail", req: true, errorMsg: tried && !/@/.test(d.email) ? "Gültige E-Mail erforderlich" : null },
              h("div", { className: "ctl" + (tried && !/@/.test(d.email) ? " ctl-error" : "") },
                h("input", { inputMode: "email", value: d.email, placeholder: "max@email.de", onChange: (e) => set("email", e.target.value) }))),
            h(Field, { label: "PLZ", req: true, errorMsg: tried && !/^\d{5}$/.test(d.plz) ? "5-stellige PLZ erforderlich" : null },
              h("div", { className: "ctl" + (tried && !/^\d{5}$/.test(d.plz) ? " ctl-error" : "") },
                h(Icons.pin, { size: 16, className: "pre" }),
                h("input", { inputMode: "numeric", maxLength: 5, value: d.plz, placeholder: "80331", onChange: (e) => set("plz", e.target.value.replace(/\D/g, "")) })))))
      )),

    h("div", { className: "vform-foot" },
      step > 0 && h("button", { className: "vbtn vbtn-back", onClick: () => go(step - 1) },
        h(Icons.chevron, { size: 16, style: { transform: "rotate(180deg)" } }), "Zurück"),
      h("button", {
        className: "vbtn " + (step === 4 ? "vbtn-submit" : "vbtn-next") + (shaking ? " vbtn-shake" : ""),
        disabled: sending,
        onClick: step === 4 ? submit : next,
        style: sending ? { opacity: 0.7 } : {}
      },
        sending
          ? h(React.Fragment, null, h("span", { style: { display: "inline-block", animation: "spin 0.8s linear infinite" } }, "↻"), "Wird gesendet…")
          : step === 4 ? "Bewertung anfordern"
          : step === 3 ? "Weiter (oder überspringen)"
          : "Weiter",
        !sending && step !== 4 && h(Icons.chevron, { size: 17 }))));
}

window.ValuationForm = ValuationForm;
