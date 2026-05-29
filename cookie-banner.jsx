/* ============================================================
   Cookie-Banner — DSGVO/TTDSG konform
   ============================================================ */

const CONSENT_KEY = "ams_cookie_consent";

function loadConsent() {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}
function saveConsent(obj) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ ...obj, timestamp: new Date().toISOString() })); } catch {}
}

function CookieBanner() {
  const existing = loadConsent();
  const [visible, setVisible] = React.useState(!existing);
  const [showSettings, setShowSettings] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(false);
  const [marketing, setMarketing] = React.useState(false);

  React.useEffect(() => {
    window.__openCookieBanner = () => { setVisible(true); setShowSettings(false); };
    return () => { delete window.__openCookieBanner; };
  }, []);

  const accept = (all) => {
    saveConsent({ necessary: true, analytics: all ? true : analytics, marketing: all ? true : marketing });
    setVisible(false);
  };

  if (!visible) return null;

  const BANNER_STYLE = `
    .ck-overlay{position:fixed;inset:0;z-index:99998;background:rgba(7,11,16,.45);backdrop-filter:blur(3px);}
    .ck-box{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:99999;
      width:min(680px,calc(100vw - 32px));
      background:linear-gradient(160deg,rgba(255,255,255,.97),rgba(246,248,249,.97));
      color:#0e1620;border-radius:20px;
      box-shadow:0 32px 80px -20px rgba(0,0,0,.55),0 0 0 1px rgba(8,18,28,.06),0 2px 0 rgba(255,255,255,.8) inset;
      font-family:"Manrope",system-ui,sans-serif;overflow:hidden;}
    .ck-top{padding:22px 24px 0;}
    .ck-title{font-family:"Space Grotesk",system-ui;font-size:18px;font-weight:600;letter-spacing:-.02em;color:#0e1620;margin-bottom:8px;}
    .ck-desc{font-size:13.5px;line-height:1.6;color:#586374;margin-bottom:0;}
    .ck-desc a{color:#2b6fd6;text-decoration:underline;}
    .ck-settings{padding:0 24px;overflow:hidden;transition:max-height .4s cubic-bezier(.22,1,.36,1);}
    .ck-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-top:1px solid #dfe5ea;}
    .ck-row-info b{font-size:13.5px;font-weight:700;color:#0e1620;display:block;}
    .ck-row-info span{font-size:12px;color:#8a98a5;}
    .ck-tog{position:relative;width:36px;height:20px;border:0;border-radius:999px;background:rgba(0,0,0,.15);padding:0;cursor:pointer;flex:none;transition:background .2s;}
    .ck-tog[data-on="1"]{background:#2b6fd6;}
    .ck-tog i{position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .2s;}
    .ck-tog[data-on="1"] i{transform:translateX(16px);}
    .ck-tog[disabled]{opacity:.5;cursor:not-allowed;}
    .ck-actions{display:flex;gap:10px;padding:16px 24px 20px;flex-wrap:wrap;}
    .ck-btn{flex:1;min-width:120px;padding:12px 16px;border-radius:10px;font-size:13.5px;font-weight:700;cursor:pointer;border:none;font-family:inherit;transition:all .2s;white-space:nowrap;}
    .ck-btn-all{background:linear-gradient(180deg,#7fc0ff,#4ea1ff);color:#04121f;box-shadow:0 6px 20px -6px rgba(78,161,255,.5);}
    .ck-btn-all:hover{transform:translateY(-1px);}
    .ck-btn-nec{background:#eef2f4;color:#586374;}
    .ck-btn-nec:hover{background:#dfe5ea;color:#0e1620;}
    .ck-btn-set{background:none;color:#586374;border:1.5px solid #c6d0d8;flex:0 0 auto;}
    .ck-btn-set:hover{border-color:#9fb0bd;color:#0e1620;}
    @media(max-width:500px){.ck-box{bottom:0;border-radius:16px 16px 0 0;width:100%;}
    .ck-actions{flex-direction:column;} .ck-btn{flex:1;}}
  `;

  return h(React.Fragment, null,
    h("style", null, BANNER_STYLE),
    h("div", { className: "ck-overlay" }),
    h("div", { className: "ck-box", role: "dialog", "aria-modal": "true", "aria-label": "Cookie-Einstellungen" },
      h("div", { className: "ck-top" },
        h("div", { className: "ck-title" }, "Cookies & Datenschutz"),
        h("p", { className: "ck-desc" }, "Wir verwenden Cookies und ähnliche Technologien. Notwendige Cookies sind immer aktiv. Für Analyse und Marketing benötigen wir Ihre Einwilligung. Details in unserer ",
          h("a", { href: "datenschutz.html" }, "Datenschutzerklärung"), ".")),
      h("div", { className: "ck-settings", style: { maxHeight: showSettings ? "300px" : "0", paddingTop: showSettings ? "12px" : "0", paddingBottom: showSettings ? "4px" : "0" } },
        h("div", { className: "ck-row" },
          h("div", { className: "ck-row-info" }, h("b", null, "Notwendige Cookies"), h("span", null, "Technisch erforderlich — immer aktiv")),
          h("button", { className: "ck-tog", "data-on": "1", disabled: true }, h("i"))),
        h("div", { className: "ck-row" },
          h("div", { className: "ck-row-info" }, h("b", null, "Analyse-Cookies"), h("span", null, "Google Analytics — Nutzungsverhalten")),
          h("button", { className: "ck-tog", "data-on": analytics ? "1" : "0", onClick: () => setAnalytics(!analytics) }, h("i"))),
        h("div", { className: "ck-row" },
          h("div", { className: "ck-row-info" }, h("b", null, "Marketing-Cookies"), h("span", null, "Google Ads — personalisierte Werbung")),
          h("button", { className: "ck-tog", "data-on": marketing ? "1" : "0", onClick: () => setMarketing(!marketing) }, h("i")))),
      h("div", { className: "ck-actions" },
        h("button", { className: "ck-btn ck-btn-all", onClick: () => accept(true) }, "Alle akzeptieren"),
        h("button", { className: "ck-btn ck-btn-nec", onClick: () => accept(false) }, showSettings ? "Auswahl speichern" : "Nur Notwendige"),
        h("button", { className: "ck-btn ck-btn-set", onClick: () => setShowSettings(!showSettings) }, showSettings ? "Einstellungen ausblenden" : "Einstellungen"))));
}

window.CookieBanner = CookieBanner;
