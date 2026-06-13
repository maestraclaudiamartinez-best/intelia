import { storage } from "./storage";
import { useState, useEffect, useRef } from "react";

const C = {
  negro: "#F5F5F7", morado: "#5B2D8E", teal: "#00A693",
  tealDim: "rgba(0,166,147,0.1)", moradoDim: "rgba(91,45,142,0.1)",
  blanco: "#1A1A1A", gris2: "#FFFFFF", gris3: "#E0E0E0",
  texto: "#2A2A2A", textoDim: "#777777", verde: "#1A3A6B"
};

const STORAGE_KEY = "intelia_v1";

async function callClaude(prompt, maxTokens = 1500) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.REACT_APP_ANTHROPIC_KEY || ""}`,
      "HTTP-Referer": "https://intelia-nu.vercel.app",
      "X-Title": "IntelIA"
    },
    body: JSON.stringify({
      model: "anthropic/claude-haiku-4-5",
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }]
    })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  const raw = data.choices?.[0]?.message?.content || "";
  const clean = raw.replace(/```json|```/g, "").trim();
  const start = clean.indexOf("{"); const end = clean.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Respuesta inválida de la IA");
  return JSON.parse(clean.slice(start, end + 1));
}

async function searchYouTube(query) {
  try {
    const key = process.env.REACT_APP_YOUTUBE_KEY || "";
    const q = encodeURIComponent(query + " tutorial educativo en español");
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${q}&type=video&relevanceLanguage=es&key=${key}`);
    const data = await res.json();
    if (!data.items) return [];
    return data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channel: item.snippet.channelTitle
    }));
  } catch(e) { return []; }
}
  "Analizando tu perfil…","Diseñando etapas…",
  "Generando glosario…","Creando metodologías…","Casi lista…"
];

const s = {
  body: { background: C.negro, color: C.texto, fontFamily: "'Outfit',sans-serif", minHeight: "100vh" },
  header: { padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${C.gris3}`, position: "sticky", top: 0, background: C.negro, zIndex: 100 },
  logo: { fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900, fontSize: "0.95rem", letterSpacing: "-0.02em", color: C.blanco },
  logoSub: { fontSize: "0.6rem", color: C.textoDim, fontWeight: 400, display: "block", letterSpacing: "0.05em" },
  navTabs: { display: "flex", gap: 3, background: C.gris2, borderRadius: 10, padding: 4 },
  navTab: (a) => ({ fontFamily: "'Outfit',sans-serif", fontSize: "0.72rem", fontWeight: 600, padding: "5px 11px", borderRadius: 7, border: "none", cursor: "pointer", background: a ? C.gris3 : "transparent", color: a ? C.teal : C.textoDim }),
  main: { maxWidth: 660, margin: "0 auto", padding: "32px 18px 80px" },
  eyebrow: { fontSize: "0.68rem", fontWeight: 600, color: "#E8650A", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 9 },
  h1: { fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900, fontSize: "clamp(1.7rem,5vw,2.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: C.blanco, marginBottom: 12 },
  accent: { color: C.teal },
  subtitle: { fontSize: "0.92rem", color: C.textoDim, lineHeight: 1.65, marginBottom: 28 },
  dots: { display: "flex", gap: 7, marginBottom: 36 },
  dot: (st) => ({ height: 4, flex: 1, borderRadius: 2, background: st==="active"?C.teal:st==="done"?C.morado:C.gris3 }),
  qBlock: { marginBottom: 24 },
  lbl: { display: "block", fontSize: "0.75rem", fontWeight: 600, color: C.teal, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 },
  inp: { width: "100%", background: C.gris2, border: `1px solid ${C.gris3}`, borderRadius: 10, color: C.blanco, fontFamily: "'Outfit',sans-serif", fontSize: "0.93rem", padding: "11px 14px", outline: "none", boxSizing: "border-box" },
  ta: { width: "100%", background: C.gris2, border: `1px solid ${C.gris3}`, borderRadius: 10, color: C.blanco, fontFamily: "'Outfit',sans-serif", fontSize: "0.93rem", padding: "11px 14px", outline: "none", resize: "vertical", minHeight: 76, boxSizing: "border-box" },
  chips: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: (s) => ({ background: s?C.tealDim:C.gris2, border: `1px solid ${s?C.teal:C.gris3}`, borderRadius: 99, padding: "6px 15px", fontSize: "0.82rem", fontFamily: "'Outfit',sans-serif", color: s?C.teal:C.textoDim, cursor: "pointer", fontWeight: s?600:400 }),
  sliderRow: { display: "flex", alignItems: "center", gap: 13 },
  sliderVal: { fontWeight: 700, color: C.teal, minWidth: 28, textAlign: "right", fontSize: "0.9rem" },
  sliderLbls: { display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: C.textoDim, marginTop: 4 },
  btn: { display: "inline-flex", alignItems: "center", gap: 6, background: C.teal, color: C.negro, fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900, fontSize: "0.92rem", padding: "11px 22px", borderRadius: 10, border: "none", cursor: "pointer" },
  btnSec: { display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", color: C.textoDim, fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900, fontSize: "0.92rem", padding: "11px 22px", borderRadius: 10, border: `1px solid ${C.gris3}`, cursor: "pointer", marginRight: 9 },
  btnPurple: { display: "inline-flex", alignItems: "center", gap: 6, background: C.moradoDim, color: "#a77ddc", fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900, fontSize: "0.92rem", padding: "11px 22px", borderRadius: 10, border: `1px solid ${C.morado}`, cursor: "pointer" },
  loading: { textAlign: "center", padding: "60px 0" },
  spinner: { width: 42, height: 42, border: `3px solid ${C.gris3}`, borderTopColor: C.teal, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 18px" },
  loadMsg: { fontSize: "0.86rem", color: C.textoDim },
  resHeader: { background: `linear-gradient(135deg,${C.moradoDim},${C.tealDim})`, border: `1px solid ${C.gris3}`, borderRadius: 13, padding: "18px 22px", marginBottom: 20 },
  resH2: { fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 900, fontSize: "1.3rem", color: C.blanco, letterSpacing: "-0.02em", marginBottom: 5 },
  progInfo: { display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: C.textoDim, marginBottom: 6 },
  progBar: { height: 4, background: C.gris3, borderRadius: 2, marginBottom: 22, overflow: "hidden" },
  progFill: (p) => ({ height: "100%", width: `${p}%`, background: `linear-gradient(90deg,${C.morado},${C.teal})`, borderRadius: 2, transition: "width 0.5s" }),
  etapaBlock: (d) => ({ background: C.gris2, border: `1px solid ${d?C.morado:C.gris3}`, borderRadius: 11, overflow: "hidden", marginBottom: 9 }),
  etapaHdr: { display: "flex", alignItems: "center", gap: 11, padding: "13px 16px", cursor: "pointer" },
  etapaNum: (d) => ({ width: 26, height: 26, borderRadius: 6, background: d?C.moradoDim:C.tealDim, color: d?"#a77ddc":C.teal, fontWeight: 700, fontSize: "0.78rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }),
  etapaTitle: { fontWeight: 600, fontSize: "0.88rem", color: C.blanco, flex: 1 },
  etapaTime: { fontSize: "0.68rem", color: C.teal, fontWeight: 500, whiteSpace: "nowrap", marginRight: 7 },
  checkBtn: (d) => ({ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${d?C.morado:C.gris3}`, background: d?C.morado:"transparent", color: d?C.blanco:"transparent", fontSize: "0.6rem", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }),
  etapaBody: { padding: "0 16px 13px", fontSize: "0.83rem", color: C.textoDim, lineHeight: 1.7 },
  feedbackBox: { background: "rgba(91,45,142,0.07)", border: `1px solid ${C.morado}`, borderRadius: 8, padding: "10px 13px", marginTop: 10, fontSize: "0.82rem", color: "#5B2D8E", lineHeight: 1.6 },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6, margin: "16px 0 22px" },
  tag: { fontSize: "0.68rem", padding: "3px 10px", borderRadius: 99, border: `1px solid ${C.morado}`, color: "#a77ddc", fontWeight: 500 },
  consejoBox: { background: C.gris2, border: `1px solid ${C.gris3}`, borderRadius: 11, padding: "14px 17px", marginBottom: 9 },
  divider: { height: 1, background: C.gris3, margin: "22px 0" },
  actionsRow: { display: "flex", flexWrap: "wrap", gap: 9, marginTop: 22 },
  savedPill: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.68rem", fontWeight: 600, color: "#FFFFFF", background: "#1A3A6B", border: "1px solid #1A3A6B", padding: "3px 11px", borderRadius: 99, marginBottom: 16 },
  searchBox: { position: "relative", marginBottom: 20 },
  searchInp: { width: "100%", background: C.gris2, border: `1px solid ${C.gris3}`, borderRadius: 10, color: C.blanco, fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem", padding: "10px 14px 10px 36px", outline: "none", boxSizing: "border-box" },
  searchIcon: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.textoDim, fontSize: "0.82rem", pointerEvents: "none" },
  termCard: { background: C.gris2, border: `1px solid ${C.gris3}`, borderRadius: 10, overflow: "hidden", marginBottom: 8 },
  termHdr: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 15px", cursor: "pointer" },
  termName: { fontWeight: 700, fontSize: "0.88rem", color: C.blanco },
  termCat: (c) => { const m={concepto:[C.tealDim,C.teal],metodologia:[C.moradoDim,"#a77ddc"],herramienta:["#0a1a0a","#5ecf7a"]}; const [bg,col]=m[c]||m.concepto; return {fontSize:"0.62rem",padding:"2px 9px",borderRadius:99,fontWeight:600,textTransform:"uppercase",background:bg,color:col}; },
  termBody: { padding: "0 15px 12px", fontSize: "0.82rem", color: C.textoDim, lineHeight: 1.65 },
  metodCard: { background: C.gris2, border: `1px solid ${C.gris3}`, borderRadius: 12, padding: "18px", marginBottom: 12 },
  emptyState: { textAlign: "center", padding: "50px 20px", color: C.textoDim },
  emptyBig: { fontSize: "2rem", marginBottom: 12 },
  // CHAT
  chatWrap: { display: "flex", flexDirection: "column", height: "calc(100vh - 120px)" },
  chatHistory: { flex: 1, overflowY: "auto", paddingBottom: 16 },
  chatBubble: (isUser) => ({ display: "flex", justifyContent: isUser?"flex-end":"flex-start", marginBottom: 12 }),
  bubbleInner: (isUser) => ({ maxWidth: "82%", background: isUser?C.teal:C.gris2, color: isUser?C.negro:C.texto, borderRadius: isUser?"14px 14px 4px 14px":"14px 14px 14px 4px", padding: "10px 14px", fontSize: "0.86rem", lineHeight: 1.6, fontFamily: "'Outfit',sans-serif" }),
  chatInputRow: { display: "flex", gap: 9, paddingTop: 12, borderTop: `1px solid ${C.gris3}`, background: C.negro },
  chatInput: { flex: 1, background: C.gris2, border: `1px solid ${C.gris3}`, borderRadius: 10, color: C.blanco, fontFamily: "'Outfit',sans-serif", fontSize: "0.88rem", padding: "10px 14px", outline: "none" },
  chatSend: { background: C.teal, color: C.negro, border: "none", borderRadius: 10, padding: "10px 16px", cursor: "pointer", fontWeight: 700, fontSize: "0.88rem", fontFamily: "'Cabinet Grotesk',sans-serif" },
  typingDot: { display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: C.textoDim, margin: "0 2px", animation: "bounce 1s infinite" },
  // WELCOME
  welcomeCard: { background: `linear-gradient(135deg,${C.moradoDim},${C.tealDim})`, border: `1px solid ${C.gris3}`, borderRadius: 16, padding: "32px 28px", textAlign: "center", marginBottom: 28 },
  avatarCircle: { width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg,${C.morado},${C.teal})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", margin: "0 auto 16px" },
  autoevalBox: { background: "rgba(91,45,142,0.05)", border: `1px solid ${C.morado}`, borderRadius: 10, padding: "16px", marginTop: 12 },
  autoevalQ: { fontSize: "0.84rem", color: C.blanco, fontWeight: 600, marginBottom: 8, lineHeight: 1.5 },
  autoevalInp: { width: "100%", background: C.gris2, border: `1px solid ${C.gris3}`, borderRadius: 8, color: C.blanco, fontFamily: "'Outfit',sans-serif", fontSize: "0.83rem", padding: "8px 12px", outline: "none", boxSizing: "border-box", marginBottom: 6 },
  autoevalResult: { background: "rgba(0,166,147,0.08)", border: `1px solid ${C.teal}`, borderRadius: 8, padding: "11px 13px", fontSize: "0.82rem", color: "#1a6060", lineHeight: 1.65, marginTop: 10 },
  scoreRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
  scoreTrack: { flex: 1, height: 6, borderRadius: 3, background: C.gris3, overflow: "hidden" },
  scoreFill: (sc) => ({ height: "100%", borderRadius: 3, background: sc>=80?C.teal:sc>=50?"#f0c040":"#ff6b6b", width: `${sc}%`, transition: "width 0.6s ease" }),
  videoCard: { display: "flex", gap: 10, background: C.negro, border: `1px solid ${C.gris3}`, borderRadius: 8, overflow: "hidden", marginBottom: 8, cursor: "pointer", textDecoration: "none" },
  videoThumb: { width: 90, height: 60, objectFit: "cover", flexShrink: 0 },
  videoInfo: { padding: "6px 10px 6px 0", flex: 1, minWidth: 0 },
  videoTitle: { fontSize: "0.76rem", fontWeight: 600, color: C.blanco, lineHeight: 1.35, marginBottom: 3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  videoChannel: { fontSize: "0.66rem", color: C.textoDim },
};

export default function App() {
  const [view, setView] = useState("ruta");
  const [screen, setScreen] = useState(0);
  const [loadMsg, setLoadMsg] = useState(LOADING_MSGS[0]);
  const [error, setError] = useState(null);

  // Form
  const [nombre, setNombre] = useState("");
  const [nombreConfirmado, setNombreConfirmado] = useState("");
  const [materia, setMateria] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [tiempo, setTiempo] = useState(3);
  const [nivel, setNivel] = useState("");
  const [estilos, setEstilos] = useState([]);
  const [contexto, setContexto] = useState("");
  const [nombreError, setNombreError] = useState(false);
  const [materiaError, setMateriaError] = useState(false);

  // Result
  const [ruta, setRuta] = useState(null);
  const [progreso, setProgreso] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [loadingFeedback, setLoadingFeedback] = useState({});
  const [autoevals, setAutoevals] = useState({}); // {num: {preguntas, respuestas, resultado, step}}
  const [loadingAutoeval, setLoadingAutoeval] = useState({});
  const [videos, setVideos] = useState({});
  const [loadingVideos, setLoadingVideos] = useState({});
  const [openEtapas, setOpenEtapas] = useState({ 1: true });
  const [openTerms, setOpenTerms] = useState({});
  const [glosarioSearch, setGlosarioSearch] = useState("");
  const [fromSave, setFromSave] = useState(false);
  const [metodologias, setMetodologias] = useState([]);

  // Chat
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
      @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@900&family=Outfit:wght@400;500;600;700&display=swap');
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const r = await storage.get(STORAGE_KEY, false);
        if (r?.value) {
          const d = JSON.parse(r.value);
          if (d.ruta) {
            setRuta(d.ruta); setProgreso(d.progreso||{}); setMetodologias(d.metodologias||[]);
            setFeedbacks(d.feedbacks||{}); setNombreConfirmado(d.nombre||"");
            setMateria(d.materia||""); setFromSave(true); setScreen(4);
          }
        }
      } catch(e){}
    }
    load();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMsgs, chatLoading]);

  async function persist(rutaD, progD, metodD, feedD, nomD, matD) {
    try { await storage.set(STORAGE_KEY, JSON.stringify({ ruta:rutaD, progreso:progD, metodologias:metodD, feedbacks:feedD, nombre:nomD, materia:matD }), false); } catch(e){}
  }

  function goTo(n) {
    if (n===1 && !nombre.trim()) { setNombreError(true); setTimeout(()=>setNombreError(false),1500); return; }
    if (n===2 && !materia.trim()) { setMateriaError(true); setTimeout(()=>setMateriaError(false),1500); return; }
    setView("ruta"); setScreen(n);
    window.scrollTo({top:0,behavior:"smooth"});
  }

  async function generarRuta() {
    if (!materia.trim()) { goTo(2); return; }
    setError(null); setScreen(3);
    let mi=0;
    const iv = setInterval(()=>{ mi=(mi+1)%LOADING_MSGS.length; setLoadMsg(LOADING_MSGS[mi]); },1800);
    const perfil = `Materia:${materia}|Objetivo:${objetivo||"general"}|Tiempo:${tiempo}h/sem|Nivel:${nivel||"?"}|Estilo:${estilos.length>0?estilos.join(", "):"?"}|Contexto:${contexto||"ninguno"}`;
    try {
      const [d1, d2] = await Promise.all([
        callClaude(`Eres un diseñador instruccional. SIEMPRE responde en español, sin importar el idioma del tema. Perfil: ${perfil}. Responde SOLO JSON sin markdown:
{"titulo":"máx 8 palabras en español","descripcion":"1 oración en español","etapas":[{"numero":1,"titulo":"t","duracion":"X sem","descripcion":"2 oraciones","actividades":["a","b","c"]},{"numero":2,"titulo":"t","duracion":"X sem","descripcion":"2 oraciones","actividades":["a","b","c"]},{"numero":3,"titulo":"t","duracion":"X sem","descripcion":"2 oraciones","actividades":["a","b","c"]},{"numero":4,"titulo":"t","duracion":"X sem","descripcion":"2 oraciones","actividades":["a","b","c"]},{"numero":5,"titulo":"t","duracion":"X sem","descripcion":"2 oraciones","actividades":["a","b","c"]}],"tags":["t1","t2","t3","t4"],"consejo_final":"1-2 oraciones en español","fecha_inicio":"${new Date().toLocaleDateString('es-MX',{day:'numeric',month:'long',year:'numeric'})}"}`),
        callClaude(`Tema:"${materia}" Nivel:${nivel||"general"}. SIEMPRE responde en español. Responde SOLO JSON sin markdown:
{"glosario":[{"termino":"t","definicion":"1-2 oraciones","categoria":"concepto"},{"termino":"t","definicion":"1-2 oraciones","categoria":"metodologia"},{"termino":"t","definicion":"1-2 oraciones","categoria":"herramienta"},{"termino":"t","definicion":"1-2 oraciones","categoria":"concepto"},{"termino":"t","definicion":"1-2 oraciones","categoria":"concepto"},{"termino":"t","definicion":"1-2 oraciones","categoria":"herramienta"},{"termino":"t","definicion":"1-2 oraciones","categoria":"metodologia"},{"termino":"t","definicion":"1-2 oraciones","categoria":"concepto"}],"metodologias":[{"icono":"🎯","nombre":"nombre específico para ${materia}","descripcion":"2 oraciones concretas en español","tags":["t1","t2","t3"]},{"icono":"🗺️","nombre":"nombre","descripcion":"2 oraciones","tags":["t1","t2","t3"]},{"icono":"🛠️","nombre":"nombre","descripcion":"2 oraciones","tags":["t1","t2","t3"]},{"icono":"🔁","nombre":"nombre","descripcion":"2 oraciones","tags":["t1","t2","t3"]}]}`)
      ]);
      clearInterval(iv);
      const rutaCompleta = { ...d1, glosario: d2.glosario, metodologias: d2.metodologias };
      setRuta(rutaCompleta); setProgreso({}); setFeedbacks({}); setOpenEtapas({1:true});
      setMetodologias(d2.metodologias||[]); setFromSave(false); setNombreConfirmado(nombre);
      // Init chat con saludo
      setChatMsgs([{ role:"assistant", text:`¡Hola${nombre?" "+nombre:""}! 👋 Soy tu asistente de **${materia}**. Estoy aquí 24/7 para resolver tus dudas sobre este tema. ¿En qué te puedo ayudar?` }]);
      await persist(rutaCompleta,{},d2.metodologias||{},{},nombre,materia);
      setScreen(4); window.scrollTo({top:0,behavior:"smooth"});
    } catch(err) {
      clearInterval(iv); setError(err.message||"Error desconocido"); setScreen(4);
    }
  }

  async function toggleProgreso(num) {
    const newProg = { ...progreso, [num]: !progreso[num] };
    setProgreso(newProg);
    // Si acaba de completar, generar feedback
    if (newProg[num] && !feedbacks[num]) {
      setLoadingFeedback(l => ({...l,[num]:true}));
      try {
        const etapa = ruta.etapas.find(e => e.numero === num);
        const res = await callClaude(`Eres un tutor motivador. SIEMPRE responde en español. El estudiante${nombreConfirmado?" "+nombreConfirmado:""} acaba de completar la etapa "${etapa.titulo}" de su ruta sobre "${materia}". Genera un mensaje de retroalimentación breve (2-3 oraciones) que: 1) reconozca el logro específico de esta etapa, 2) destaque qué habilidad ganó, 3) motive para la siguiente etapa. Responde SOLO JSON: {"feedback":"mensaje aquí"}`, 400);
        const newFb = { ...feedbacks, [num]: res.feedback };
        setFeedbacks(newFb);
        await persist(ruta, newProg, metodologias, newFb, nombreConfirmado, materia);
      } catch(e) {}
      setLoadingFeedback(l => ({...l,[num]:false}));
    } else {
      await persist(ruta, newProg, metodologias, feedbacks, nombreConfirmado, materia);
    }
  }

  async function sendChat() {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatInput("");
    const newMsgs = [...chatMsgs, { role:"user", text:msg }];
    setChatMsgs(newMsgs);
    setChatLoading(true);
    try {
      const historial = newMsgs.slice(-6).map(m => `${m.role==="user"?"Estudiante":"Asistente"}: ${m.text}`).join("\n");
      const res = await callClaude(`Eres un tutor experto en "${materia}" que responde dudas de estudiantes de forma clara, breve y motivadora. SIEMPRE responde en español. El estudiante${nombreConfirmado?" se llama "+nombreConfirmado:""} y su nivel es "${nivel||"general"}". Responde en máximo 3 oraciones. No uses markdown. Historial:\n${historial}\nResponde SOLO JSON: {"respuesta":"texto aquí"}`, 400);
      setChatMsgs(m => [...m, { role:"assistant", text:res.respuesta }]);
    } catch(e) {
      setChatMsgs(m => [...m, { role:"assistant", text:"Hubo un error al conectar. Intenta de nuevo." }]);
    }
    setChatLoading(false);
  }

  async function iniciarAutoeval(num) {
    setLoadingAutoeval(l => ({...l,[num]:"generando"}));
    try {
      const etapa = ruta.etapas.find(e => e.numero === num);
      const res = await callClaude(`Eres un evaluador educativo. SIEMPRE responde en español. El estudiante está aprendiendo "${materia}" y acaba de estudiar la etapa "${etapa.titulo}". Genera 3 preguntas cortas de autoevaluación sobre los conceptos de esta etapa. Responde SOLO JSON: {"preguntas":["pregunta 1","pregunta 2","pregunta 3"]}`, 400);
      setAutoevals(a => ({...a,[num]:{preguntas:res.preguntas, respuestas:["","",""], resultado:null, step:"respondiendo"}}));
    } catch(e) {}
    setLoadingAutoeval(l => ({...l,[num]:null}));
  }

  function setRespuesta(num, idx, val) {
    setAutoevals(a => ({...a,[num]:{...a[num], respuestas: a[num].respuestas.map((r,i)=>i===idx?val:r)}}));
  }

  async function evaluarRespuestas(num) {
    const ae = autoevals[num];
    if (ae.respuestas.some(r => !r.trim())) return;
    setLoadingAutoeval(l => ({...l,[num]:"evaluando"}));
    try {
      const etapa = ruta.etapas.find(e => e.numero === num);
      const pares = ae.preguntas.map((p,i) => `P: ${p}\nR: ${ae.respuestas[i]}`).join("\n\n");
      const res = await callClaude(`Eres un tutor evaluador. El estudiante${nombreConfirmado?" "+nombreConfirmado:""} respondió esta autoevaluación sobre "${etapa.titulo}" (tema: ${materia}):\n\n${pares}\n\nEvalúa las respuestas y genera retroalimentación constructiva. Responde SOLO JSON: {"puntaje":85,"comentario":"retroalimentación general en 2-3 oraciones que mencione qué estuvo bien y qué reforzar","aprobado":true}`, 400);
      setAutoevals(a => ({...a,[num]:{...a[num], resultado:res, step:"resultado"}}));
      // Si aprobó, marcar etapa automáticamente
      if (res.aprobado && !progreso[num]) {
        await toggleProgreso(num);
      }
    } catch(e) {}
    setLoadingAutoeval(l => ({...l,[num]:null}));
  }

  function resetAutoeval(num) {
    setAutoevals(a => ({...a,[num]:null}));
  }

  async function loadVideos(num) {
    if (videos[num] || loadingVideos[num]) return;
    setLoadingVideos(l => ({...l,[num]:true}));
    const etapa = ruta.etapas.find(e => e.numero === num);
    const query = `${materia} ${etapa.titulo}`;
    const results = await searchYouTube(query);
    setVideos(v => ({...v,[num]:results}));
    setLoadingVideos(l => ({...l,[num]:false}));
  }

  function resetApp() {
    setRuta(null); setProgreso({}); setFeedbacks({}); setMetodologias([]); setAutoevals({}); setVideos({});
    setNombre(""); setNombreConfirmado(""); setMateria(""); setObjetivo("");
    setTiempo(3); setNivel(""); setEstilos([]); setContexto("");
    setFromSave(false); setError(null); setChatMsgs([]);
    try { storage.delete(STORAGE_KEY, false); } catch(e){}
    setScreen(0); setView("ruta");
  }

  const totalEtapas = ruta?.etapas?.length || 5;
  const completadas = Object.values(progreso).filter(Boolean).length;
  const pct = Math.round((completadas/totalEtapas)*100);
  const filteredGlosario = ruta?.glosario?.filter(t =>
    !glosarioSearch || t.termino.toLowerCase().includes(glosarioSearch.toLowerCase()) || t.definicion.toLowerCase().includes(glosarioSearch.toLowerCase())
  ) || [];

  const TABS = [
    {id:"ruta",label:"Mi Ruta"},
    {id:"asistente",label:"Asistente 24/7"},
    {id:"glosario",label:"Glosario"},
    {id:"metodologias",label:"Metodologías"}
  ];

  return (
    <div style={s.body}>
      <header style={s.header}>
        <div style={s.logo}>
          IntelIA
          <span style={s.logoSub}>IA para Creativos</span>
        </div>
        <div style={s.navTabs}>
          {TABS.map(t => (
            <button key={t.id} style={s.navTab(view===t.id)} onClick={()=>setView(t.id)}>{t.label}</button>
          ))}
        </div>
      </header>

      <main style={s.main}>

        {/* ── MI RUTA ── */}
        {view==="ruta" && (
          <div>
            {screen<4 && <div style={s.dots}>{[0,1,2,3].map(i=><div key={i} style={s.dot(i<screen?"done":i===screen?"active":"idle")}/>)}</div>}

            {/* S0: BIENVENIDA */}
            {screen===0 && (
              <div>
                <div style={s.welcomeCard}>
                  <div style={s.avatarCircle}>🎓</div>
                  <div style={{...s.eyebrow, marginBottom:8}}>Bienvenido a</div>
                  <h1 style={{...s.h1, fontSize:"2rem", marginBottom:8}}>Intel<span style={s.accent}>IA</span></h1>
                  <p style={{fontSize:"0.88rem", color:C.textoDim, lineHeight:1.6}}>Tu ruta de aprendizaje personalizada, glosario, metodologías y asistente 24/7 — todo en un solo lugar.</p>
                </div>
                <div style={s.qBlock}>
                  <label style={s.lbl}>¿Cómo te llamas?</label>
                  <input style={{...s.inp, borderColor: nombreError?"#ff5555":C.gris3}} value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Tu nombre…" onKeyDown={e=>e.key==="Enter"&&goTo(1)} />
                </div>
                <button style={s.btn} onClick={()=>goTo(1)}>Comenzar →</button>
              </div>
            )}

            {/* S1: TEMA */}
            {screen===1 && (
              <div>
                <div style={s.eyebrow}>Paso 1 de 2 — Tu punto de partida</div>
                <h1 style={{...s.h1,fontSize:"1.65rem",marginBottom:18}}>Hola <span style={s.accent}>{nombre}</span>,<br/>¿qué quieres aprender?</h1>
                <div style={s.qBlock}>
                  <label style={s.lbl}>Materia o tema</label>
                  <input style={{...s.inp,borderColor:materiaError?"#ff5555":C.gris3}} value={materia} onChange={e=>setMateria(e.target.value)} placeholder="ej. Arquitectura virreinal, Diseño editorial, IA generativa…"/>
                </div>
                <div style={s.qBlock}>
                  <label style={s.lbl}>Tu objetivo principal</label>
                  <div style={s.chips}>
                    {["Aprobar el curso","Profundizar en el tema","Aplicarlo en un proyecto","Explorar por curiosidad"].map(o=>(
                      <div key={o} style={s.chip(objetivo===o)} onClick={()=>setObjetivo(o)}>{o}</div>
                    ))}
                  </div>
                </div>
                <div style={s.qBlock}>
                  <label style={s.lbl}>Tiempo disponible por semana</label>
                  <div style={s.sliderRow}>
                    <input type="range" min={1} max={10} value={tiempo} onChange={e=>setTiempo(+e.target.value)} style={{flex:1,accentColor:C.teal}}/>
                    <span style={s.sliderVal}>{tiempo}h</span>
                  </div>
                  <div style={s.sliderLbls}><span>1h</span><span>10h</span></div>
                </div>
                <div style={{marginTop:6}}>
                  <button style={s.btnSec} onClick={()=>goTo(0)}>← Atrás</button>
                  <button style={s.btn} onClick={()=>goTo(2)}>Siguiente →</button>
                </div>
              </div>
            )}

            {/* S2: PERFIL */}
            {screen===2 && (
              <div>
                <div style={s.eyebrow}>Paso 2 de 2 — Tu perfil</div>
                <h1 style={{...s.h1,fontSize:"1.65rem",marginBottom:18}}>¿Cómo <span style={s.accent}>aprendes</span> mejor?</h1>
                <div style={s.qBlock}>
                  <label style={s.lbl}>Nivel de conocimiento previo</label>
                  <div style={s.chips}>
                    {["Soy principiante","Tengo algo de base","Nivel intermedio","Quiero profundizar"].map(n=>(
                      <div key={n} style={s.chip(nivel===n)} onClick={()=>setNivel(n)}>{n}</div>
                    ))}
                  </div>
                </div>
                <div style={s.qBlock}>
                  <label style={s.lbl}>Tipo de actividades que prefieres (elige las que quieras)</label>
                  <div style={s.chips}>
                    {["Videos y visuales","Lecturas y textos","Ejercicios prácticos","Proyectos creativos","Discusión y análisis"].map(e=>(
                      <div key={e} style={s.chip(estilos.includes(e))} onClick={()=>setEstilos(prev=>prev.includes(e)?prev.filter(x=>x!==e):[...prev,e])}>{e}</div>
                    ))}
                  </div>
                </div>
                <div style={s.qBlock}>
                  <label style={s.lbl}>¿Algo más que la IA deba saber? (opcional)</label>
                  <textarea style={s.ta} value={contexto} onChange={e=>setContexto(e.target.value)} placeholder="ej. Tengo un proyecto de tesis, o me cuesta la teoría abstracta…"/>
                </div>
                <div style={{marginTop:6}}>
                  <button style={s.btnSec} onClick={()=>goTo(1)}>← Atrás</button>
                  <button style={s.btn} onClick={generarRuta}>Generar mi ruta ✦</button>
                </div>
              </div>
            )}

            {/* S3: LOADING */}
            {screen===3 && (
              <div style={s.loading}>
                <div style={s.spinner}/>
                <p style={s.loadMsg}>{loadMsg}</p>
              </div>
            )}

            {/* S4: RESULTADO */}
            {screen===4 && (
              <div>
                {error ? (
                  <div style={{paddingTop:40,textAlign:"center"}}>
                    <p style={{color:"#ff6b6b",marginBottom:8}}>No se pudo generar la ruta.</p>
                    <p style={{color:"#666",fontSize:"0.76rem",marginBottom:18}}>{error}</p>
                    <button style={s.btnSec} onClick={()=>goTo(2)}>← Intentar de nuevo</button>
                  </div>
                ) : ruta ? (
                  <div>
                    {fromSave && <div style={s.savedPill}>✓ Continuando donde lo dejaste, {nombreConfirmado}</div>}
                    <div style={s.eyebrow}>Tu ruta personalizada</div>
                    <div style={s.resHeader}>
                      <div style={s.resH2}>{ruta.titulo}</div>
                      <p style={{fontSize:"0.83rem",color:C.textoDim}}>{ruta.descripcion}</p>
                    </div>
                    <div style={s.progInfo}>
                      <span>Progreso de {nombreConfirmado||"tu ruta"}</span>
                      <span style={{color:C.teal}}>{completadas}/{totalEtapas} etapas</span>
                    </div>
                    <div style={s.progBar}><div style={s.progFill(pct)}/></div>

                    {ruta.etapas.map(e=>(
                      <div key={e.numero} style={s.etapaBlock(progreso[e.numero])}>
                        <div style={s.etapaHdr} onClick={()=>{
                          const isOpening = !openEtapas[e.numero];
                          setOpenEtapas(o=>({...o,[e.numero]:!o[e.numero]}));
                          if (isOpening) loadVideos(e.numero);
                        }}>                          <div style={s.etapaNum(progreso[e.numero])}>{progreso[e.numero]?"✓":e.numero}</div>
                          <div style={s.etapaTitle}>{e.titulo}</div>
                          <div style={s.etapaTime}>{e.duracion}</div>
                          <div style={s.checkBtn(progreso[e.numero])} onClick={ev=>{ev.stopPropagation();toggleProgreso(e.numero);}}>✓</div>
                        </div>
                        {openEtapas[e.numero] && (
                          <div style={s.etapaBody}>
                            <p style={{marginBottom:9}}>{e.descripcion}</p>
                            <ul style={{paddingLeft:17}}>{e.actividades.map((a,i)=><li key={i} style={{marginBottom:4}}>{a}</li>)}</ul>

                            {/* AUTOEVALUACIÓN */}
                            {!autoevals[e.numero] && !progreso[e.numero] && (
                              <button style={{...s.btnPurple, marginTop:12, fontSize:"0.8rem", padding:"8px 16px"}}
                                onClick={()=>iniciarAutoeval(e.numero)}
                                disabled={loadingAutoeval[e.numero]==="generando"}>
                                {loadingAutoeval[e.numero]==="generando" ? "Generando preguntas…" : "✦ Autoevaluarme"}
                              </button>
                            )}

                            {autoevals[e.numero]?.step==="respondiendo" && (
                              <div style={s.autoevalBox}>
                                <div style={{fontSize:"0.68rem",fontWeight:600,color:C.morado,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>Autoevaluación</div>
                                {autoevals[e.numero].preguntas.map((p,i)=>(
                                  <div key={i} style={{marginBottom:12}}>
                                    <div style={s.autoevalQ}>{i+1}. {p}</div>
                                    <input style={s.autoevalInp} placeholder="Tu respuesta…"
                                      value={autoevals[e.numero].respuestas[i]}
                                      onChange={ev=>setRespuesta(e.numero,i,ev.target.value)}/>
                                  </div>
                                ))}
                                <button style={{...s.btn, fontSize:"0.8rem", padding:"8px 18px", marginTop:4}}
                                  onClick={()=>evaluarRespuestas(e.numero)}
                                  disabled={loadingAutoeval[e.numero]==="evaluando"}>
                                  {loadingAutoeval[e.numero]==="evaluando" ? "Evaluando…" : "Enviar respuestas →"}
                                </button>
                                <button style={{...s.btnSec, fontSize:"0.78rem", padding:"8px 14px", marginTop:4, marginLeft:6}} onClick={()=>resetAutoeval(e.numero)}>Cancelar</button>
                              </div>
                            )}

                            {autoevals[e.numero]?.step==="resultado" && (
                              <div style={s.autoevalBox}>
                                <div style={{fontSize:"0.68rem",fontWeight:600,color:C.morado,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>Resultado</div>
                                <div style={s.scoreRow}>
                                  <span style={{fontSize:"0.8rem",color:C.textoDim}}>Puntaje</span>
                                  <div style={s.scoreTrack}><div style={s.scoreFill(autoevals[e.numero].resultado.puntaje)}/></div>
                                  <span style={{fontSize:"0.86rem",fontWeight:700,color:autoevals[e.numero].resultado.puntaje>=80?C.teal:autoevals[e.numero].resultado.puntaje>=50?"#f0c040":"#ff6b6b"}}>{autoevals[e.numero].resultado.puntaje}%</span>
                                </div>
                                <div style={s.autoevalResult}>{autoevals[e.numero].resultado.comentario}</div>
                                {!autoevals[e.numero].resultado.aprobado && (
                                  <button style={{...s.btnPurple, fontSize:"0.78rem", padding:"7px 14px", marginTop:10}} onClick={()=>resetAutoeval(e.numero)}>Intentar de nuevo</button>
                                )}
                              </div>
                            )}

                            {loadingFeedback[e.numero] && (
                              <div style={{...s.feedbackBox,color:C.textoDim}}>Generando retroalimentación…</div>
                            )}
                            {feedbacks[e.numero] && !loadingFeedback[e.numero] && (
                              <div style={s.feedbackBox}>✦ {feedbacks[e.numero]}</div>
                            )}

                            {/* VIDEOS DE YOUTUBE */}
                            <div style={{marginTop:14}}>
                              <div style={{fontSize:"0.68rem",fontWeight:600,color:"#E8650A",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:8}}>Videos recomendados</div>
                              {loadingVideos[e.numero] && <div style={{fontSize:"0.78rem",color:C.textoDim}}>Buscando videos…</div>}
                              {videos[e.numero]?.map(v=>(
                                <a key={v.id} href={`https://youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" style={s.videoCard}>
                                  <img src={v.thumbnail} alt={v.title} style={s.videoThumb}/>
                                  <div style={s.videoInfo}>
                                    <div style={s.videoTitle}>{v.title}</div>
                                    <div style={s.videoChannel}>{v.channel}</div>
                                  </div>
                                </a>
                              ))}
                              {videos[e.numero]?.length === 0 && <div style={{fontSize:"0.78rem",color:C.textoDim}}>No se encontraron videos para esta etapa.</div>}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <div style={s.tagRow}>{ruta.tags.map(t=><div key={t} style={s.tag}>{t}</div>)}</div>
                    <div style={s.divider}/>

                    {/* RESUMEN DE PROGRESO */}
                    <div style={{background:C.gris2,border:`1px solid ${C.gris3}`,borderRadius:12,padding:"16px 18px",marginBottom:12}}>
                      <div style={{fontSize:"0.64rem",fontWeight:600,color:"#E8650A",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:12}}>Resumen de progreso</div>
                      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
                        <div style={{textAlign:"center",flex:1}}>
                          <div style={{fontSize:"1.6rem",fontWeight:900,fontFamily:"'Cabinet Grotesk',sans-serif",color:C.teal}}>{completadas}</div>
                          <div style={{fontSize:"0.72rem",color:C.textoDim}}>Etapas completadas</div>
                        </div>
                        <div style={{textAlign:"center",flex:1}}>
                          <div style={{fontSize:"1.6rem",fontWeight:900,fontFamily:"'Cabinet Grotesk',sans-serif",color:C.morado}}>{totalEtapas - completadas}</div>
                          <div style={{fontSize:"0.72rem",color:C.textoDim}}>Etapas pendientes</div>
                        </div>
                        <div style={{textAlign:"center",flex:1}}>
                          <div style={{fontSize:"1.6rem",fontWeight:900,fontFamily:"'Cabinet Grotesk',sans-serif",color:"#E8650A"}}>{pct}%</div>
                          <div style={{fontSize:"0.72rem",color:C.textoDim}}>Avance total</div>
                        </div>
                      </div>
                      {ruta.fecha_inicio && <div style={{fontSize:"0.7rem",color:C.textoDim,marginTop:10}}>Iniciado el {ruta.fecha_inicio}</div>}
                    </div>

                    <div style={s.consejoBox}>
                      <div style={{fontSize:"0.64rem",fontWeight:600,color:C.morado,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Consejo para ti</div>
                      <p style={{fontSize:"0.84rem",lineHeight:1.65,color:C.textoDim}}>{ruta.consejo_final}</p>
                    </div>
                    <div style={s.actionsRow}>
                      <button style={s.btnSec} onClick={resetApp}>← Nueva ruta</button>
                      <button style={s.btnPurple} onClick={()=>setView("asistente")}>Asistente 24/7 →</button>
                      <button style={{...s.btn, background:"#1A3A6B"}} onClick={()=>{
                        const texto = `🎓 Mi ruta de aprendizaje en IntelIA\n\nTema: ${materia}\n${ruta.titulo}\n\n${ruta.etapas.map(e=>`${e.numero}. ${e.titulo} (${e.duracion})`).join('\n')}\n\nProgreso: ${completadas}/${totalEtapas} etapas (${pct}%)\n\nhttps://intelia-nu.vercel.app/`;
                        if(navigator.share){navigator.share({title:'Mi Ruta IntelIA',text:texto});}
                        else{navigator.clipboard.writeText(texto).then(()=>alert('¡Ruta copiada al portapapeles!'));}
                      }}>Compartir ruta</button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}

        {/* ── ASISTENTE 24/7 ── */}
        {view==="asistente" && (
          <div style={s.chatWrap}>
            <div style={s.eyebrow}>Disponible siempre</div>
            <h1 style={{...s.h1,fontSize:"1.5rem",marginBottom:4}}>Asistente <span style={s.accent}>24/7</span></h1>
            <p style={{...s.subtitle,marginBottom:16,fontSize:"0.85rem"}}>
              {ruta ? `Experto en ${materia||"tu tema"}. Pregunta lo que necesites.` : "Genera tu ruta primero para activar el asistente."}
            </p>
            {!ruta ? (
              <div style={s.emptyState}>
                <div style={s.emptyBig}>🤖</div>
                <p>El asistente se activa una vez<br/>que generes tu ruta de aprendizaje.</p>
                <button style={{...s.btn,marginTop:20}} onClick={()=>setView("ruta")}>Crear mi ruta →</button>
              </div>
            ) : (
              <>
                <div style={s.chatHistory}>
                  {chatMsgs.map((m,i)=>(
                    <div key={i} style={s.chatBubble(m.role==="user")}>
                      <div style={s.bubbleInner(m.role==="user")}>{m.text}</div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div style={s.chatBubble(false)}>
                      <div style={{...s.bubbleInner(false),padding:"12px 16px"}}>
                        <span style={s.typingDot}/>
                        <span style={{...s.typingDot,animationDelay:"0.2s"}}/>
                        <span style={{...s.typingDot,animationDelay:"0.4s"}}/>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef}/>
                </div>
                <div style={s.chatInputRow}>
                  <input
                    style={s.chatInput}
                    value={chatInput}
                    onChange={e=>setChatInput(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&sendChat()}
                    placeholder={`Pregunta sobre ${materia||"tu tema"}…`}
                  />
                  <button style={s.chatSend} onClick={sendChat}>Enviar</button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ── GLOSARIO ── */}
        {view==="glosario" && (
          <div>
            <div style={s.eyebrow}>Referencia rápida</div>
            <h1 style={{...s.h1,fontSize:"1.65rem",marginBottom:6}}>Glosario <span style={s.accent}>del tema</span></h1>
            <p style={{...s.subtitle,marginBottom:22}}>Términos y conceptos clave generados para tu ruta.</p>
            {!ruta ? (
              <div style={s.emptyState}><div style={s.emptyBig}>📖</div><p>Genera tu ruta primero.</p></div>
            ) : (
              <div>
                <div style={s.searchBox}>
                  <span style={s.searchIcon}>🔍</span>
                  <input style={s.searchInp} placeholder="Buscar término…" value={glosarioSearch} onChange={e=>setGlosarioSearch(e.target.value)}/>
                </div>
                {filteredGlosario.map((t,i)=>(
                  <div key={i} style={s.termCard}>
                    <div style={s.termHdr} onClick={()=>setOpenTerms(o=>({...o,[i]:!o[i]}))}>
                      <span style={s.termName}>{t.termino}</span>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={s.termCat(t.categoria)}>{t.categoria}</span>
                        <span style={{color:C.textoDim,fontSize:"0.68rem",transform:openTerms[i]?"rotate(180deg)":"none",display:"inline-block"}}>▼</span>
                      </div>
                    </div>
                    {openTerms[i] && <div style={s.termBody}>{t.definicion}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── METODOLOGÍAS ── */}
        {view==="metodologias" && (
          <div>
            <div style={s.eyebrow}>Marco pedagógico</div>
            <h1 style={{...s.h1,fontSize:"1.65rem",marginBottom:6}}>Metodologías <span style={s.accent}>de aprendizaje</span></h1>
            <p style={{...s.subtitle,marginBottom:24}}>
              {metodologias.length>0 ? `Enfoques pedagógicos específicos para aprender ${materia||"este tema"}.` : "Genera tu ruta primero."}
            </p>
            {metodologias.length===0 ? (
              <div style={s.emptyState}><div style={s.emptyBig}>🧭</div><p>Las metodologías se generan<br/>junto con tu ruta.</p></div>
            ) : metodologias.map((m,i)=>(
              <div key={i} style={s.metodCard}>
                <div style={{fontSize:"1.4rem",marginBottom:9}}>{m.icono}</div>
                <div style={{fontFamily:"'Cabinet Grotesk',sans-serif",fontWeight:900,fontSize:"0.98rem",color:C.blanco,marginBottom:6}}>{m.nombre}</div>
                <div style={{fontSize:"0.83rem",color:C.textoDim,lineHeight:1.65,marginBottom:11}}>{m.descripcion}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{m.tags.map((t,j)=><span key={j} style={{fontSize:"0.64rem",fontWeight:600,padding:"2px 9px",borderRadius:99,border:`1px solid ${C.gris3}`,color:C.textoDim}}>{t}</span>)}</div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
