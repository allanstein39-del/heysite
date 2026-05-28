// Hey! Burgers — main app with Tweaks panel
const {
  useState: useAppState,
  useEffect: useAppEffect
} = React;
function PageLoader() {
  const [visible, setVisible] = useAppState(true);
  useAppEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "page-loader"
  }, /*#__PURE__*/React.createElement(window.Logo, {
    className: "page-loader-logo"
  }));
}
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "bg": "red",
  "btn": "filled",
  "type": "xxxx",
  "layout": "centered"
} /*EDITMODE-END*/;
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
  const navigate = to => {
    setScreen(to);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const handleSubmit = data => {
    setSubmission(data);
    navigate("success");
  };
  const {
    TweaksPanel,
    TweakSection,
    TweakRadio,
    TweakButton
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement(PageLoader, null), /*#__PURE__*/React.createElement(Header, {
    screen: screen,
    navigate: navigate
  }), /*#__PURE__*/React.createElement("main", null, screen === "home" && /*#__PURE__*/React.createElement(window.HomeScreen, {
    tweaks: tweaks,
    navigate: navigate
  }), screen === "jobs" && /*#__PURE__*/React.createElement(window.JobsScreen, {
    navigate: navigate,
    onSubmit: handleSubmit
  }), screen === "success" && /*#__PURE__*/React.createElement(window.SuccessScreen, {
    name: submission?.nome,
    navigate: navigate
  })), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Cor de fundo"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "bg",
    value: tweaks.bg,
    onChange: v => setTweak("bg", v),
    options: [{
      value: "red",
      label: "Red"
    }, {
      value: "black",
      label: "Black"
    }, {
      value: "cream",
      label: "Cream"
    }]
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Bot\xF5es"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "estilo",
    value: tweaks.btn,
    onChange: v => setTweak("btn", v),
    options: [{
      value: "filled",
      label: "Filled"
    }, {
      value: "outline",
      label: "Outline"
    }, {
      value: "brutal",
      label: "Brutal"
    }]
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Tipografia"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "display",
    value: tweaks.type,
    onChange: v => setTweak("type", v),
    options: [{
      value: "regular",
      label: "Reg"
    }, {
      value: "condensed",
      label: "Cond"
    }, {
      value: "xxxx",
      label: "XXXX"
    }]
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Layout (home)"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "grid",
    value: tweaks.layout,
    onChange: v => setTweak("layout", v),
    options: [{
      value: "centered",
      label: "Centro"
    }, {
      value: "asymmetric",
      label: "Assim"
    }, {
      value: "grid",
      label: "Grid"
    }]
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Navega\xE7\xE3o"
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "\u2192 Home",
    onClick: () => navigate("home")
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "\u2192 Trabalhe Conosco",
    onClick: () => navigate("jobs"),
    secondary: true
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "\u2192 Tela de sucesso",
    onClick: () => navigate("success"),
    secondary: true
  })));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(App, null));

/* ─── Header (logo + nav + social icons) ───────────── */
function Header({
  screen,
  navigate
}) {
  const R = window.__resources || {};
  const socials = [{
    id: "cardapio",
    href: "https://pedido.anota.ai/loja/hey-burgers-hamburgueria?f=msa",
    icon: "assets/icon-cardapio.webp",
    label: "Cardápio digital"
  }, {
    id: "ifood",
    href: "https://urlgeni.us/ifood/heyburgersc",
    icon: "assets/icon-ifood.webp",
    label: "iFood"
  }, {
    id: "whatsapp",
    href: "https://wa.me/5516996294093",
    icon: "assets/icon-whats.webp",
    label: "WhatsApp"
  }, {
    id: "instagram",
    href: "https://www.instagram.com/heyburgers/",
    icon: "assets/icon-instagram.webp",
    label: "Instagram"
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "header"
  }, /*#__PURE__*/React.createElement("a", {
    className: "header-logo",
    onClick: e => {
      e.preventDefault();
      navigate("home");
    },
    href: "#"
  }, /*#__PURE__*/React.createElement(window.Logo, null)), /*#__PURE__*/React.createElement("nav", {
    className: "header-nav"
  }, /*#__PURE__*/React.createElement("button", {
    className: "",
    onClick: () => navigate("home")
  }, "Home"), /*#__PURE__*/React.createElement("button", {
    className: "",
    onClick: () => navigate("jobs")
  }, "Trabalhe conosco"), /*#__PURE__*/React.createElement("a", {
    className: "header-nav-evento",
    href: "https://wa.me/5516996294093?text=Ol%C3%A1%2C+tudo+bem%3F+Gostaria+de+fazer+um+evento+com+a+Hey%21&utm_source=chatgpt.com",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Hey! no seu evento")), /*#__PURE__*/React.createElement("span", {
    className: "header-spacer"
  }), /*#__PURE__*/React.createElement("div", {
    className: "header-socials"
  }, socials.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    href: s.href,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": s.label,
    title: s.label
  }, /*#__PURE__*/React.createElement("img", {
    src: s.icon,
    alt: ""
  })))));
}
