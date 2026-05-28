// Hey! Burgers — screens

const {
  useState: useStateS,
  useEffect: useEffectS,
  useRef: useRefS
} = React;

/* ─── Home / Linktree ─────────────────────────────────── */
function HomeScreen({
  tweaks,
  navigate
}) {
  const R = window.__resources || {};
  const links = [{
    id: "cardapio",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "Card", /*#__PURE__*/React.createElement(window.Acc, {
      base: "a",
      mark: "acute"
    }), "pio digital"),
    sub: "melhores preços + exclusivos",
    href: "https://pedido.anota.ai/loja/hey-burgers-hamburgueria?f=msa",
    icon: "assets/icon-cardapio.webp",
    photo: "assets/burger-01.webp"
  }, {
    id: "ifood",
    title: "iFood",
    sub: "peça pelo app",
    href: "https://urlgeni.us/ifood/heyburgersc",
    icon: "assets/icon-ifood.webp",
    photo: "assets/burger-02.webp"
  }, {
    id: "whatsapp",
    title: "WhatsApp",
    sub: "(16) 99629-4093",
    href: "https://wa.me/5516996294093",
    icon: "assets/icon-whats.webp",
    photo: "assets/burger-03.webp"
  }, {
    id: "instagram",
    title: "Instagram",
    sub: "@heyburgers",
    href: "https://www.instagram.com/heyburgers/",
    icon: "assets/icon-instagram.webp",
    photo: "assets/burger-04.webp"
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "home",
    "data-screen-label": "01 Home"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-hero"
  }, /*#__PURE__*/React.createElement(window.HomeLogo, null)), /*#__PURE__*/React.createElement("div", {
    className: "banner",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "banner-strip"
  })), /*#__PURE__*/React.createElement("ul", {
    className: "links"
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l.id
  }, /*#__PURE__*/React.createElement("a", {
    className: "link",
    href: l.href,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("img", {
    className: "link-photo",
    src: l.photo,
    alt: "",
    "aria-hidden": "true",
    width: "900",
    height: "600",
    fetchpriority: l.id === "cardapio" ? "high" : "auto",
    loading: l.id === "cardapio" ? "eager" : "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "link-overlay"
  }), /*#__PURE__*/React.createElement("img", {
    className: "link-sticker",
    src: l.icon,
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "link-body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "link-title"
  }, l.title), /*#__PURE__*/React.createElement("span", {
    className: "link-sub"
  }, l.sub)), /*#__PURE__*/React.createElement("span", {
    className: "link-arrow"
  }, /*#__PURE__*/React.createElement(window.Icon.Arrow, null)))))), /*#__PURE__*/React.createElement("footer", {
    className: "home-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "home-footer-ctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: "jobs-cta",
    onClick: () => navigate("jobs")
  }, "Trabalhe conosco", /*#__PURE__*/React.createElement(window.Icon.Right, null)), /*#__PURE__*/React.createElement("a", {
    className: "jobs-cta jobs-cta--evento",
    href: "https://wa.me/5516996294093?text=Ol%C3%A1%2C+tudo+bem%3F+Gostaria+de+fazer+um+evento+com+a+Hey%21&utm_source=chatgpt.com",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Hey! no seu evento", /*#__PURE__*/React.createElement(window.Icon.Right, null))), /*#__PURE__*/React.createElement("div", {
    className: "home-foot-meta"
  }, "Ter\xE7a a Domingo \xB7 delivery only \xB7 S\xE3o Carlos - SP"), /*#__PURE__*/React.createElement("div", {
    className: "home-foot-dev"
  }, "Desenvolvido por ", /*#__PURE__*/React.createElement("a", {
    href: "https://adoisc.com.br",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Adois - Comunica\xE7\xE3o Integrativa"))));
}

// Banner removed — replaced by the X-banner in the hero

/* ─── Trabalhe Conosco ────────────────────────────────── */
const VAGAS = [{
  value: "Auxiliar de cozinha",
  desc: "montagem de lanches, bebidas e preparações"
}, {
  value: "Cozinheiro(a) / Chapeira(a)",
  desc: "o de auxiliar + chapas, fritadeiras, fogões"
}, {
  value: "Atendente",
  desc: "atendimento ao cliente, caixa, rotas de delivery"
}, {
  value: "Operador de Delivery",
  desc: "aceitar pedidos, fazer bebidas, fazer rotas"
}];
const EXPERIENCIA = ["Sim, mais de 1 ano", "Sim, menos de 1 ano", "Não tenho experiência"];
const DISPONIBILIDADE = ["Sim", "Sim, mas tenho restrições", "Não"];
function RadioGroup({
  name,
  options,
  value,
  onChange,
  withDesc
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "radio-group"
  }, options.map(opt => {
    const val = withDesc ? opt.value : opt;
    const desc = withDesc ? opt.desc : null;
    const checked = value === val;
    return /*#__PURE__*/React.createElement("label", {
      key: val,
      className: "radio-opt " + (checked ? "is-on" : "")
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: name,
      value: val,
      checked: checked,
      onChange: () => onChange(val)
    }), /*#__PURE__*/React.createElement("span", {
      className: "radio-label"
    }, val), desc && /*#__PURE__*/React.createElement("span", {
      className: "radio-desc"
    }, desc));
  }));
}
function JobsScreen({
  navigate,
  onSubmit
}) {
  const [data, setData] = useStateS({
    nome: "",
    whats: "",
    idade: "",
    bairro: "",
    vaga: "",
    experiencia: "",
    disponibilidade: ""
  });
  const set = (k, v) => setData(d => ({
    ...d,
    [k]: v
  }));
  const valid = data.nome && data.whats && data.idade && data.bairro && data.vaga && data.experiencia && data.disponibilidade;
  const submit = e => {
    e.preventDefault();
    if (!valid) return;
    const fd = new FormData();
    fd.append('entry.1365861656', data.nome);
    fd.append('entry.51953079', data.whats);
    fd.append('entry.289573353', data.idade);
    fd.append('entry.238213810', data.bairro);
    fd.append('entry.787784276', data.vaga);
    fd.append('entry.1415021885', data.experiencia);
    fd.append('entry.1999529634', data.disponibilidade);
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSeWT-0SsPQ7bRCazqhbQJ3wHryihEoVgCW_LchWxSVPleC5-A/formResponse', {
      method: 'POST',
      mode: 'no-cors',
      body: fd
    }).catch(() => {});
    onSubmit(data);
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "jobs",
    "data-screen-label": "02 Trabalhe Conosco"
  }, /*#__PURE__*/React.createElement("header", {
    className: "jobs-hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "jobs-hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "jobs-eyebrow"
  }, "/ trabalhe conosco"), /*#__PURE__*/React.createElement("h1", {
    className: "jobs-title"
  }, "Vem fazer", /*#__PURE__*/React.createElement("br", null), "burger ", /*#__PURE__*/React.createElement("em", null, "conosco.")), /*#__PURE__*/React.createElement("p", {
    className: "jobs-sub"
  }, "A Hey \xE9 uma hamburgueria de delivery, feita por gente que ama burger e gosta de trabalhar bonito. Se voc\xEA \xE9 organizado, tem energia e quer entrar num time que cresce r\xE1pido \u2014 manda ver no formul\xE1rio abaixo."), /*#__PURE__*/React.createElement("ul", {
    className: "perks"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "100%"), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Delivery \u2014 sem sal\xE3o pra atender")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "06"), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Posi\xE7\xF5es abertas agora")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "VT+VR"), /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "Benef\xEDcios + comiss\xE3o por turno"))))), /*#__PURE__*/React.createElement("div", {
    className: "jobs-form-wrap"
  }, /*#__PURE__*/React.createElement("form", {
    className: "jobs-form",
    onSubmit: submit,
    noValidate: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Nome completo", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "text",
    value: data.nome,
    onChange: e => set("nome", e.target.value),
    placeholder: "Como voc\xEA se chama?",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Qual seu WhatsApp? (com DDD)", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "tel",
    value: data.whats,
    onChange: e => set("whats", e.target.value),
    placeholder: "(16) 99999-9999",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Qual sua idade?", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "number",
    min: "14",
    max: "99",
    value: data.idade,
    onChange: e => set("idade", e.target.value),
    placeholder: "Ex: 22",
    required: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Qual bairro voc\xEA mora?", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("input", {
    className: "input",
    type: "text",
    value: data.bairro,
    onChange: e => set("bairro", e.target.value),
    placeholder: "Ex: Centro, Vila Prado...",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Vaga de Interesse", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement(RadioGroup, {
    name: "vaga",
    options: VAGAS,
    value: data.vaga,
    onChange: v => set("vaga", v),
    withDesc: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Tem experi\xEAncia na vaga desejada?", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement(RadioGroup, {
    name: "experiencia",
    options: EXPERIENCIA,
    value: data.experiencia,
    onChange: v => set("experiencia", v)
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Voc\xEA tem disponibilidade para escala 6x1, de ter\xE7a a domingo?", /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, "*")), /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, "Trabalhamos de ter\xE7a a domingo, com folga semanal de 1 dia (segunda)"), /*#__PURE__*/React.createElement(RadioGroup, {
    name: "disponibilidade",
    options: DISPONIBILIDADE,
    value: data.disponibilidade,
    onChange: v => set("disponibilidade", v)
  })), /*#__PURE__*/React.createElement("button", {
    className: "submit",
    type: "submit",
    disabled: !valid
  }, "Enviar candidatura", /*#__PURE__*/React.createElement(window.Icon.Send, null)))));
}

/* ─── Success ─────────────────────────────────────────── */
function SuccessScreen({
  name,
  navigate
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "success",
    "data-screen-label": "03 Sucesso"
  }, /*#__PURE__*/React.createElement("div", {
    className: "success-stamp"
  }, /*#__PURE__*/React.createElement(window.Icon.Check, null)), /*#__PURE__*/React.createElement("h1", {
    className: "success-title"
  }, "Recebido,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, (name || "chef").split(" ")[0], "!")), /*#__PURE__*/React.createElement("div", {
    className: "success-actions"
  }, /*#__PURE__*/React.createElement("a", {
    className: "jobs-cta",
    href: "https://pedido.anota.ai/loja/hey-burgers-hamburgueria?f=msa",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Ver card\xE1pio ", /*#__PURE__*/React.createElement(window.Icon.Right, null)), /*#__PURE__*/React.createElement("button", {
    className: "jobs-cta",
    onClick: () => navigate("home"),
    style: {
      background: "transparent",
      color: "var(--ink)",
      border: "1.5px solid var(--line-strong)"
    }
  }, "Voltar pra home")));
}
Object.assign(window, {
  HomeScreen,
  JobsScreen,
  SuccessScreen
});