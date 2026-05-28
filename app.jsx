// Hey! Burgers — main app with Tweaks panel
const { useState: useAppState, useEffect: useAppEffect } = React;

function PageLoader() {
  const [visible, setVisible] = useAppState(true);
  useAppEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <div className="page-loader">
      <window.Logo className="page-loader-logo"/>
    </div>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bg": "red",
  "btn": "filled",
  "type": "xxxx",
  "layout": "centered"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useAppState("home"); // home | jobs | success
  const [submission, setSubmission] = useAppState(null);

  // sync data-attrs on <html> so CSS picks up theme
  useAppEffect(() => {
    const r = document.documentElement;
    r.lang = "pt-BR";
    r.dataset.bg = tweaks.bg;
    r.dataset.btn = tweaks.btn;
    r.dataset.type = tweaks.type;
    r.dataset.layout = tweaks.layout;
  }, [tweaks]);

  const navigate = (to) => {
    setScreen(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (data) => {
    setSubmission(data);
    navigate("success");
  };

  const {
    TweaksPanel, TweakSection, TweakRadio, TweakButton
  } = window;

  return (
    <div className="app">
      <PageLoader/>
      <Header screen={screen} navigate={navigate}/>

      <main>
        {screen === "home"   && <window.HomeScreen tweaks={tweaks} navigate={navigate}/>}
        {screen === "jobs"   && <window.JobsScreen navigate={navigate} onSubmit={handleSubmit}/>}
        {screen === "success"&& <window.SuccessScreen name={submission?.nome} navigate={navigate}/>}
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Cor de fundo"/>
        <TweakRadio
          label="bg"
          value={tweaks.bg}
          onChange={(v)=>setTweak("bg", v)}
          options={[
            { value:"red",   label:"Red" },
            { value:"black", label:"Black" },
            { value:"cream", label:"Cream" },
          ]}
        />

        <TweakSection label="Botões"/>
        <TweakRadio
          label="estilo"
          value={tweaks.btn}
          onChange={(v)=>setTweak("btn", v)}
          options={[
            { value:"filled",  label:"Filled" },
            { value:"outline", label:"Outline" },
            { value:"brutal",  label:"Brutal" },
          ]}
        />

        <TweakSection label="Tipografia"/>
        <TweakRadio
          label="display"
          value={tweaks.type}
          onChange={(v)=>setTweak("type", v)}
          options={[
            { value:"regular",   label:"Reg" },
            { value:"condensed", label:"Cond" },
            { value:"xxxx",      label:"XXXX" },
          ]}
        />

        <TweakSection label="Layout (home)"/>
        <TweakRadio
          label="grid"
          value={tweaks.layout}
          onChange={(v)=>setTweak("layout", v)}
          options={[
            { value:"centered",   label:"Centro" },
            { value:"asymmetric", label:"Assim" },
            { value:"grid",       label:"Grid" },
          ]}
        />

        <TweakSection label="Navegação"/>
        <TweakButton label="→ Home" onClick={()=>navigate("home")}/>
        <TweakButton label="→ Trabalhe Conosco" onClick={()=>navigate("jobs")} secondary/>
        <TweakButton label="→ Tela de sucesso" onClick={()=>navigate("success")} secondary/>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);

/* ─── Header (logo + nav + social icons) ───────────── */
function Header({ screen, navigate }){
  const R = (window.__resources || {});
  const socials = [
    { id:"cardapio",  href:"https://pedido.anota.ai/loja/hey-burgers-hamburgueria?f=msa", icon:"assets/icon-cardapio.webp",  label:"Cardápio digital" },
    { id:"ifood",     href:"https://urlgeni.us/ifood/heyburgersc",                       icon:"assets/icon-ifood.webp",     label:"iFood" },
    { id:"whatsapp",  href:"https://wa.me/5516996294093",                                 icon:"assets/icon-whats.webp",     label:"WhatsApp" },
    { id:"instagram", href:"https://www.instagram.com/heyburgers/",                       icon:"assets/icon-instagram.webp", label:"Instagram" },
  ];

  return (
    <header className="header">
      <a className="header-logo" onClick={(e)=>{e.preventDefault();navigate("home");}} href="#">
        <window.Logo/>
      </a>

      <nav className="header-nav">
        <button
          className=""
          onClick={()=>navigate("home")}>Home</button>
        <button
          className={screen==="jobs" || screen==="success" ? "is-active" : ""}
          onClick={()=>navigate("jobs")}>Trabalhe conosco</button>
        <a className="header-nav-evento" href="https://wa.me/5516996294093?text=Ol%C3%A1%2C+tudo+bem%3F+Gostaria+de+fazer+um+evento+com+a+Hey%21&utm_source=chatgpt.com"
           target="_blank" rel="noopener noreferrer">Hey! no seu evento</a>
      </nav>

      <span className="header-spacer"/>

      <div className="header-socials">
        {socials.map(s => (
          <a key={s.id} href={s.href} target="_blank" rel="noopener noreferrer"
             aria-label={s.label} title={s.label}>
            <img src={s.icon} alt=""/>
          </a>
        ))}
      </div>
    </header>
  );
}
