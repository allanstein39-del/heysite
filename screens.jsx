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
      icon: "assets/icon-cardapio.webp",
      photo: "assets/burger-01.webp",
    },
    {
      id: "ifood",
      title: "iFood",
      sub: "peça pelo app",
      href: "https://urlgeni.us/ifood/heyburgersc",
      icon: "assets/icon-ifood.webp",
      photo: "assets/burger-02.webp",
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      sub: "(16) 99629-4093",
      href: "https://wa.me/5516996294093",
      icon: "assets/icon-whats.webp",
      photo: "assets/burger-03.webp",
    },
    {
      id: "instagram",
      title: "Instagram",
      sub: "@heyburgers",
      href: "https://www.instagram.com/heyburgers/",
      icon: "assets/icon-instagram.webp",
      photo: "assets/burger-04.webp",
    },
  ];

  return (
    <section className="home" data-screen-label="01 Home">
      <div className="home-hero">
        <window.HomeLogo/>
      </div>

      <div className="banner" aria-hidden="true">
        <span className="banner-strip"/>
      </div>

      <ul className="links">
        {links.map(l => (
          <li key={l.id}>
            <a className="link" href={l.href} target="_blank" rel="noopener noreferrer">
              <img
                className="link-photo"
                src={l.photo}
                alt=""
                aria-hidden="true"
                width="900" height="600"
                fetchpriority={l.id === "cardapio" ? "high" : "auto"}
                loading={l.id === "cardapio" ? "eager" : "lazy"}
              />
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
        <div className="home-footer-ctas">
          <button className="jobs-cta" onClick={() => navigate("jobs")}>
            Trabalhe conosco
            <window.Icon.Right/>
          </button>
          <a className="jobs-cta jobs-cta--evento" href="https://wa.me/5516996294093?text=Ol%C3%A1%2C+tudo+bem%3F+Gostaria+de+fazer+um+evento+com+a+Hey%21&utm_source=chatgpt.com"
             target="_blank" rel="noopener noreferrer">
            Hey! no seu evento
            <window.Icon.Right/>
          </a>
        </div>
        <div className="home-foot-meta">
          Terça a Domingo · delivery only · São Carlos - SP
        </div>
        <div className="home-foot-dev">
          Desenvolvido por <a href="https://adoisc.com.br" target="_blank" rel="noopener noreferrer">Adois - Comunicação Integrativa</a>
        </div>
      </footer>
    </section>
  );
}

// Banner removed — replaced by the X-banner in the hero


/* ─── Trabalhe Conosco ────────────────────────────────── */
const VAGAS = [
  { value:"Auxiliar de cozinha",        desc:"montagem de lanches, bebidas e preparações" },
  { value:"Cozinheiro(a) / Chapeira(a)", desc:"o de auxiliar + chapas, fritadeiras, fogões" },
  { value:"Atendente",                   desc:"atendimento ao cliente, caixa, rotas de delivery" },
  { value:"Operador de Delivery",        desc:"aceitar pedidos, fazer bebidas, fazer rotas" },
];
const EXPERIENCIA = [
  "Sim, mais de 1 ano",
  "Sim, menos de 1 ano",
  "Não tenho experiência",
];
const DISPONIBILIDADE = [
  "Sim",
  "Sim, mas tenho restrições",
  "Não",
];

function RadioGroup({ name, options, value, onChange, withDesc }){
  return (
    <div className="radio-group">
      {options.map(opt => {
        const val = withDesc ? opt.value : opt;
        const desc = withDesc ? opt.desc : null;
        const checked = value === val;
        return (
          <label key={val} className={"radio-opt " + (checked ? "is-on" : "")}>
            <input type="radio" name={name} value={val}
              checked={checked} onChange={() => onChange(val)}/>
            <span className="radio-label">{val}</span>
            {desc && <span className="radio-desc">{desc}</span>}
          </label>
        );
      })}
    </div>
  );
}

function JobsScreen({ navigate, onSubmit }){
  const [data, setData] = useStateS({
    nome:"", whats:"", idade:"", bairro:"",
    vaga:"", experiencia:"", disponibilidade:"",
  });
  const set = (k,v) => setData(d => ({...d, [k]:v}));

  const valid = data.nome && data.whats && data.idade && data.bairro
    && data.vaga && data.experiencia && data.disponibilidade;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    const fd = new FormData();
    fd.append('entry.1365861656', data.nome);
    fd.append('entry.51953079',   data.whats);
    fd.append('entry.289573353',  data.idade);
    fd.append('entry.238213810',  data.bairro);
    fd.append('entry.787784276',  data.vaga);
    fd.append('entry.1415021885', data.experiencia);
    fd.append('entry.1999529634', data.disponibilidade);
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSeWT-0SsPQ7bRCazqhbQJ3wHryihEoVgCW_LchWxSVPleC5-A/formResponse', {
      method: 'POST', mode: 'no-cors', body: fd,
    }).catch(() => {});
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
              <label>Qual seu WhatsApp? (com DDD)<span className="req">*</span></label>
              <input className="input" type="tel"
                value={data.whats} onChange={e=>set("whats",e.target.value)}
                placeholder="(16) 99999-9999" required/>
            </div>
            <div className="field">
              <label>Qual sua idade?<span className="req">*</span></label>
              <input className="input" type="number" min="14" max="99"
                value={data.idade} onChange={e=>set("idade",e.target.value)}
                placeholder="Ex: 22" required/>
            </div>
          </div>

          <div className="field">
            <label>Qual bairro você mora?<span className="req">*</span></label>
            <input className="input" type="text"
              value={data.bairro} onChange={e=>set("bairro",e.target.value)}
              placeholder="Ex: Centro, Vila Prado..." required/>
          </div>

          <div className="field">
            <label>Vaga de Interesse<span className="req">*</span></label>
            <RadioGroup name="vaga" options={VAGAS} value={data.vaga}
              onChange={v=>set("vaga",v)} withDesc={true}/>
          </div>

          <div className="field">
            <label>Tem experiência na vaga desejada?<span className="req">*</span></label>
            <RadioGroup name="experiencia" options={EXPERIENCIA} value={data.experiencia}
              onChange={v=>set("experiencia",v)}/>
          </div>

          <div className="field">
            <label>Você tem disponibilidade para escala 6x1, de terça a domingo?<span className="req">*</span></label>
            <span className="hint">Trabalhamos de terça a domingo, com folga semanal de 1 dia (segunda)</span>
            <RadioGroup name="disponibilidade" options={DISPONIBILIDADE} value={data.disponibilidade}
              onChange={v=>set("disponibilidade",v)}/>
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
