// Hey! Burgers — screens

const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* ─── Home / Linktree ─────────────────────────────────── */
function HomeScreen({ tweaks, navigate }) {
  const R = (window.__resources || {});
  const links = [
    {
      id: "cardapio",
      title: <>Card<window.Acc base="a" mark="acute"/>pio digital</>,
      sub: "melhores preços + exclusivos",
      href: "https://pedido.anota.ai/loja/hey-burgers-hamburgueria?f=msa",
      icon: R.iconCardapio || "assets/icon-cardapio.png",
      photo: R.burger1 || "assets/burger-01.jpg",
    },
    {
      id: "ifood",
      title: "iFood",
      sub: "peça pelo app",
      href: "https://urlgeni.us/ifood/heyburgersc",
      icon: R.iconIfood || "assets/icon-ifood.png",
      photo: R.burger2 || "assets/burger-02.jpg",
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      sub: "(16) 99629-4093",
      href: "https://wa.me/5516996294093",
      icon: R.iconWhats || "assets/icon-whats.png",
      photo: R.burger3 || "assets/burger-03.jpg",
    },
    {
      id: "instagram",
      title: "Instagram",
      sub: "@heyburgers",
      href: "https://www.instagram.com/heyburgers/",
      icon: R.iconInstagram || "assets/icon-instagram.png",
      photo: R.burger4 || "assets/burger-04.jpg",
    },
  ];

  return (
    <section className="home" data-screen-label="01 Home">
      <div className="home-hero">
        <window.Logo className="home-logo"/>
        <div className="hours">
          <window.Icon.Clock/>
          <span>Terça a Domingo · 11h às 22h</span>
        </div>
      </div>

      <div className="banner" aria-hidden="true">
        <span className="banner-strip"/>
      </div>

      <ul className="links">
        {links.map(l => (
          <li key={l.id}>
            <a className="link" href={l.href} target="_blank" rel="noopener noreferrer">
              <span className="link-photo" style={{backgroundImage:`url(${l.photo})`}}/>
              <span className="link-overlay"/>
              <img className="link-sticker" src={l.icon} alt=""/>
              <span className="link-body">
                <span className="link-title">{l.title}</span>
                <span className="link-sub">{l.sub}</span>
              </span>
              <span className="link-arrow"><window.Icon.Arrow/></span>
            </a>
          </li>
        ))}
      </ul>

      <footer className="home-footer">
        <button className="jobs-cta" onClick={() => navigate("jobs")}>
          Trabalhe conosco
          <window.Icon.Right/>
        </button>
        <div className="home-foot-meta">
          delivery only · são carlos · sc
        </div>
      </footer>
    </section>
  );
}

// Banner removed — replaced by the X-banner in the hero


/* ─── Trabalhe Conosco ────────────────────────────────── */
const VAGAS = [
  "Auxiliar de cozinha",
  "Chapeiro",
  "Atendente de pedidos (online)",
  "Motoboy / Entregador",
  "Auxiliar de produção",
  "Embalador / Expedição",
];
const TURNOS = [
  { id:"manha",    label:"Manhã",    range:"11h às 15h" },
  { id:"tarde",    label:"Tarde",    range:"15h às 19h" },
  { id:"noite",    label:"Noite",    range:"19h às 23h" },
  { id:"integral", label:"Integral", range:"11h às 23h" },
];

function JobsScreen({ navigate, onSubmit }){
  const [data, setData] = useStateS({
    nome:"", email:"", whats:"", cidade:"",
    vaga:"", experiencia:"", turnos:[],
    curriculo:null,
  });
  const set = (k,v) => setData(d => ({...d, [k]:v}));
  const toggleTurno = (id) => {
    setData(d => ({...d, turnos: d.turnos.includes(id) ? d.turnos.filter(t=>t!==id) : [...d.turnos, id]}));
  };
  const fileInput = useRefS(null);

  const valid = data.nome && data.email && data.whats && data.cidade && data.vaga && data.turnos.length;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    onSubmit(data);
  };

  return (
    <section className="jobs" data-screen-label="02 Trabalhe Conosco">
      <header className="jobs-hero">
        <div className="jobs-hero-inner">
          <div className="jobs-eyebrow">/ trabalhe conosco</div>
          <h1 className="jobs-title">
            Vem fazer<br/>burger <em>conosco.</em>
          </h1>
          <p className="jobs-sub">
            A Hey é uma hamburgueria de delivery, feita por gente que ama
            burger e gosta de trabalhar bonito. Se você é organizado,
            tem energia e quer entrar num time que cresce rápido — manda
            ver no formulário abaixo.
          </p>

          <ul className="perks">
            <li>
              <div className="num">100%</div>
              <div className="label">Delivery — sem salão pra atender</div>
            </li>
            <li>
              <div className="num">06</div>
              <div className="label">Posições abertas agora</div>
            </li>
            <li>
              <div className="num">VT+VR</div>
              <div className="label">Benefícios + comissão por turno</div>
            </li>
          </ul>
        </div>
      </header>

      <div className="jobs-form-wrap">
        <form className="jobs-form" onSubmit={submit} noValidate>

          <div className="field">
            <label>Nome completo<span className="req">*</span></label>
            <input className="input" type="text"
              value={data.nome} onChange={e=>set("nome",e.target.value)}
              placeholder="Como você se chama?" required/>
          </div>

          <div className="field-row">
            <div className="field">
              <label>E-mail<span className="req">*</span></label>
              <input className="input" type="email"
                value={data.email} onChange={e=>set("email",e.target.value)}
                placeholder="voce@email.com" required/>
            </div>
            <div className="field">
              <label>WhatsApp<span className="req">*</span></label>
              <input className="input" type="tel"
                value={data.whats} onChange={e=>set("whats",e.target.value)}
                placeholder="(16) 99999-9999" required/>
            </div>
          </div>

          <div className="field">
            <label>Cidade / bairro<span className="req">*</span></label>
            <input className="input" type="text"
              value={data.cidade} onChange={e=>set("cidade",e.target.value)}
              placeholder="São Carlos / Centro" required/>
            <span className="hint">A gente atende São Carlos e região, mas conta da onde você é.</span>
          </div>

          <div className="field">
            <label>Vaga de interesse<span className="req">*</span></label>
            <select className="select"
              value={data.vaga} onChange={e=>set("vaga",e.target.value)}
              required>
              <option value="" disabled>Selecione a vaga</option>
              {VAGAS.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div className="field">
            <label>Disponibilidade de turno<span className="req">*</span></label>
            <div className="shifts">
              {TURNOS.map(t => (
                <button key={t.id} type="button"
                  className={"shift " + (data.turnos.includes(t.id) ? "is-on" : "")}
                  onClick={()=>toggleTurno(t.id)}>
                  {t.label}<small>{t.range}</small>
                </button>
              ))}
            </div>
            <span className="hint">Pode marcar mais de um.</span>
          </div>

          <div className="field">
            <label>Experiência anterior</label>
            <textarea className="textarea"
              value={data.experiencia} onChange={e=>set("experiencia",e.target.value)}
              placeholder="Conta brevemente onde você trabalhou, o que fez, o que aprendeu. Pode ser informal — a gente lê tudo." />
          </div>

          <div className="field">
            <label>Currículo (PDF)</label>
            <label className={"file-drop " + (data.curriculo ? "has-file":"")}>
              <input ref={fileInput} type="file" accept="application/pdf"
                onChange={e => set("curriculo", e.target.files?.[0] || null)}/>
              <span className="file-icon">
                {data.curriculo ? <window.Icon.Check/> : <window.Icon.Doc/>}
              </span>
              <span className="file-text">
                <span className="t">
                  {data.curriculo ? data.curriculo.name : "Anexar currículo (opcional)"}
                </span>
                <span className="s">
                  {data.curriculo
                    ? `${(data.curriculo.size/1024).toFixed(0)} KB · clique para trocar`
                    : "PDF até 5 MB · arrasta ou clica"}
                </span>
              </span>
            </label>
          </div>

          <button className="submit" type="submit" disabled={!valid}>
            Enviar candidatura
            <window.Icon.Send/>
          </button>
        </form>
      </div>
    </section>
  );
}


/* ─── Success ─────────────────────────────────────────── */
function SuccessScreen({ name, navigate }){
  return (
    <section className="success" data-screen-label="03 Sucesso">
      <div className="success-stamp"><window.Icon.Check/></div>
      <h1 className="success-title">
        Recebido,<br/><em>{(name||"chef").split(" ")[0]}!</em>
      </h1>
      <p className="success-sub">
        Sua candidatura caiu na nossa cozinha. A gente lê tudo e
        responde em até 5 dias úteis pelo WhatsApp que você cadastrou.
        Enquanto isso, dá uma olhada no cardápio — quem sabe rola um
        smash aí.
      </p>
      <div className="success-actions">
        <a className="jobs-cta" href="https://pedido.anota.ai/loja/hey-burgers-hamburgueria?f=msa"
           target="_blank" rel="noopener noreferrer">
          Ver cardápio <window.Icon.Right/>
        </a>
        <button className="jobs-cta" onClick={()=>navigate("home")}
          style={{background:"transparent",color:"var(--ink)",border:"1.5px solid var(--line-strong)"}}>
          Voltar pra home
        </button>
      </div>
    </section>
  );
}

Object.assign(window, { HomeScreen, JobsScreen, SuccessScreen });
