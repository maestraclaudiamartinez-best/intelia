<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>Cátedra Abierta · Claudia A. Martínez Díaz</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --morado: #5B2D8E; --morado-claro: #7B3DB8;
    --fuchia: #E8007A; --fuchia-suave: #F5C0DC;
    --fondo: #FAF7F2; --fondo-2: #F2EDE4;
    --texto: #1A1A1A; --texto-suave: #5A5450;
    --borde: #E0D8CC; --blanco: #FFFFFF;
  }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--fondo); color: var(--texto);
    font-size: 16px; line-height: 1.6;
    -webkit-user-select: none; -moz-user-select: none; user-select: none;
  }
  img { pointer-events: none; -webkit-user-drag: none; }
  nav {
    position: sticky; top: 0; z-index: 100;
    background: var(--fondo); border-bottom: 1.5px solid var(--borde);
    padding: 0 2rem; display: flex; align-items: center;
    justify-content: space-between; height: 60px;
  }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--morado); text-decoration: none; letter-spacing: -0.02em; }
  .nav-logo span { color: var(--fuchia); }
  .nav-links { display: flex; gap: 1.5rem; list-style: none; }
  .nav-links a { font-size: 13px; font-weight: 500; color: var(--texto-suave); text-decoration: none; transition: color 0.15s; }
  .nav-links a:hover { color: var(--morado); }
  .hero {
    padding: 5rem 2rem 4rem; max-width: 900px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
  }
  .hero-eyebrow {
    font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--fuchia); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 8px;
  }
  .hero-eyebrow::before { content: ''; display: inline-block; width: 24px; height: 2px; background: var(--fuchia); }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 5vw, 3.2rem); font-weight: 900;
    line-height: 1.05; color: var(--texto); letter-spacing: -0.03em; margin-bottom: 1rem;
  }
  .hero h1 em { font-style: normal; color: var(--fuchia); }
  .hero-tagline {
    font-size: 15px; color: var(--texto-suave);
    line-height: 1.7; margin-bottom: 1.5rem;
    border-left: 3px solid var(--fuchia);
    padding-left: 1rem; font-style: italic;
  }
  .hero-visual {
    background: var(--morado); border-radius: 24px; overflow: hidden;
    aspect-ratio: 4/5; display: flex; flex-direction: column;
    justify-content: flex-end; padding: 2rem; position: relative;
  }
  .hero-visual::before {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px);
  }
  .hero-visual-name { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: white; position: relative; z-index: 1; }
  .hero-visual-title { font-size: 12px; color: rgba(255,255,255,0.65); margin-top: 4px; position: relative; z-index: 1; }
  .hero-visual-accent {
    position: absolute; top: 2rem; right: 2rem;
    width: 48px; height: 48px; border-radius: 50%;
    background: var(--fuchia); display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 900; color: white; z-index: 1;
  }
  .divisor { max-width: 900px; margin: 0 auto; border: none; border-top: 1.5px solid var(--borde); }
  section { padding: 4rem 2rem; max-width: 900px; margin: 0 auto; }
  .section-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--fuchia); margin-bottom: 0.5rem; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: var(--texto); margin-bottom: 2.5rem; letter-spacing: -0.02em; }
  .proyectos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; }
  .proyecto-card {
    background: var(--blanco); border: 1.5px solid var(--borde); border-radius: 16px; padding: 1.5rem;
    text-decoration: none; color: inherit; display: flex; flex-direction: column;
    transition: border-color 0.2s, transform 0.2s;
  }
  .proyecto-card:hover { border-color: var(--fuchia); transform: translateY(-2px); }
  .proyecto-card.pronto { opacity: 0.5; pointer-events: none; }
  .proyecto-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 1rem; }
  .ic-1 { background: #EDE0FA; } .ic-2 { background: #FCE4F0; } .ic-3 { background: #FFF3CC; }
  .ic-4 { background: #E0F4FF; } .ic-5 { background: #E8FAE8; } .ic-6 { background: var(--fondo-2); }
  .proyecto-categoria { font-size: 10px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--texto-suave); margin-bottom: 4px; }
  .proyecto-nombre { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: var(--texto); line-height: 1.2; margin-bottom: 8px; }
  .proyecto-desc { font-size: 13px; color: var(--texto-suave); line-height: 1.5; flex: 1; }
  .proyecto-footer { margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid var(--borde); display: flex; justify-content: space-between; align-items: center; }
  .proyecto-arrow { font-size: 16px; color: var(--fuchia); }
  .proyecto-pronto { font-size: 10px; color: var(--texto-suave); font-style: italic; }
  .about-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 3rem; align-items: start; }
  .about-visual { background: var(--fuchia-suave); border-radius: 20px; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 900; color: var(--fuchia); }
  .about-text h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--texto); }
  .about-text p { font-size: 14px; color: var(--texto-suave); line-height: 1.75; margin-bottom: 1rem; }
  .about-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 0.5rem; }
  .pill { font-size: 11px; padding: 4px 12px; border-radius: 20px; background: var(--fondo-2); color: var(--texto-suave); border: 1px solid var(--borde); }
  footer { background: var(--morado); padding: 3rem 2rem; margin-top: 4rem; text-align: center; }
  footer .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.4rem; font-weight: 900; color: white; }
  footer .footer-logo span { color: var(--fuchia-suave); }
  footer p { font-size: 13px; color: rgba(255,255,255,0.6); margin-top: 6px; }
  footer .footer-line { width: 40px; height: 3px; background: var(--fuchia); border-radius: 2px; margin: 1.25rem auto; }
  footer .footer-copy { font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 1.5rem; }
  @media (max-width: 680px) {
    .hero { grid-template-columns: 1fr; gap: 2rem; }
    .hero-visual { aspect-ratio: 3/2; }
    .about-grid { grid-template-columns: 1fr; }
    nav { padding: 0 1rem; }
    .nav-links { gap: 1rem; }
  }
</style>
</head>
<body>
<nav>
  <a href="#" class="nav-logo">Cátedra <span>Abierta</span></a>
  <ul class="nav-links">
    <li><a href="#proyectos">Proyectos</a></li>
    <li><a href="#acerca">Acerca</a></li>
  </ul>
</nav>
<div class="hero">
  <div>
    <div class="hero-eyebrow">Claudia A. Martínez Díaz</div>
    <h1>Diseñadora, docente y creadora de <em>ideas incómodas</em></h1>
    <p class="hero-tagline">Aquí viven mis proyectos, mis clases, mis obsesiones y todo lo que no cabe en un CV.</p>
  </div>
  <div class="hero-visual">
    <div class="hero-visual-accent">CM</div>
    <div class="hero-visual-name">Mtra. Claudia A.<br>Martínez Díaz</div>
    <div class="hero-visual-title">UAQ · UVM · M&D · Signum<br>Querétaro, México</div>
  </div>
</div>
<hr class="divisor">
<section id="proyectos">
  <div class="section-eyebrow">Lo que vive aquí</div>
  <h2 class="section-title">Proyectos</h2>
  <div class="proyectos-grid">
    <a class="proyecto-card" href="patrimonio.html">
      <div class="proyecto-icon ic-1">🏛️</div>
      <div class="proyecto-categoria">Clase · UVM Arquitectura</div>
      <div class="proyecto-nombre">Patrimonio Arquitectónico del Siglo XX</div>
      <div class="proyecto-desc">De la revolución material a la conservación crítica. Maestros, movimientos y dilemas contemporáneos.</div>
      <div class="proyecto-footer"><span class="proyecto-arrow">→</span></div>
    </a>
    <div class="proyecto-card pronto">
      <div class="proyecto-icon ic-2">🔤</div>
      <div class="proyecto-categoria">Clase · UAQ Diseño</div>
      <div class="proyecto-nombre">Semiótica del Diseño</div>
      <div class="proyecto-desc">Signos, códigos y retórica de la imagen. Barthes, Peirce y Groupe µ aplicados al diseño.</div>
      <div class="proyecto-footer"><span class="proyecto-pronto">En construcción</span></div>
    </div>
    <div class="proyecto-card pronto">
      <div class="proyecto-icon ic-3">🎙️</div>
      <div class="proyecto-categoria">Podcast</div>
      <div class="proyecto-nombre">IA para Creativos y No Creativos</div>
      <div class="proyecto-desc">Herramientas, reflexiones y recursos de inteligencia artificial para diseñadores y educadores.</div>
      <div class="proyecto-footer"><span class="proyecto-pronto">En construcción</span></div>
    </div>
    <div class="proyecto-card pronto">
      <div class="proyecto-icon ic-4">📖</div>
      <div class="proyecto-categoria">Serie · Lenguaje</div>
      <div class="proyecto-nombre">Dicho y Hecho</div>
      <div class="proyecto-desc">Palabras y expresiones raras del español mexicano que merecen sobrevivir.</div>
      <div class="proyecto-footer"><span class="proyecto-pronto">En construcción</span></div>
    </div>
    <div class="proyecto-card pronto">
      <div class="proyecto-icon ic-5">✍️</div>
      <div class="proyecto-categoria">Escritos</div>
      <div class="proyecto-nombre">Textos e ideas</div>
      <div class="proyecto-desc">Ensayos, reflexiones y cosas que pienso en voz alta sobre diseño, cultura y educación.</div>
      <div class="proyecto-footer"><span class="proyecto-pronto">En construcción</span></div>
    </div>
    <div class="proyecto-card pronto">
      <div class="proyecto-icon ic-6">📐</div>
      <div class="proyecto-categoria">Clase · UVM Arquitectura</div>
      <div class="proyecto-nombre">Geometría Descriptiva</div>
      <div class="proyecto-desc">Verdadera magnitud, abatimiento, proyección ortogonal y perspectiva cónica.</div>
      <div class="proyecto-footer"><span class="proyecto-pronto">En construcción</span></div>
    </div>
  </div>
</section>
<hr class="divisor">
<section id="acerca">
  <div class="section-eyebrow">Quién soy</div>
  <h2 class="section-title">Acerca</h2>
  <div class="about-grid">
    <div class="about-visual">CMD</div>
    <div class="about-text">
      <h3>Claudia A. Martínez Díaz</h3>
      <p>Diseñadora, educadora e investigadora con Maestría en Ciencias y Artes para el Diseño por la UAM-Xochimilco. Docente en UAQ y UVM. Directora General de M&D High Strategy Group y CEO de Signum Intelligence Unit.</p>
      <p>Creo contenido sobre inteligencia artificial aplicada al diseño y la educación, preservo palabras raras del español mexicano, y enseño a pensar visualmente. Todo al mismo tiempo.</p>
      <div class="about-pills">
        <span class="pill">Semiótica</span>
        <span class="pill">UX Research</span>
        <span class="pill">Patrimonio</span>
        <span class="pill">IA aplicada</span>
        <span class="pill">Design Thinking</span>
        <span class="pill">Comunicación estratégica</span>
      </div>
    </div>
  </div>
</section>
<footer>
  <div class="footer-logo">Cátedra <span>Abierta</span></div>
  <p>Claudia A. Martínez Díaz · Querétaro, México</p>
  <div class="footer-line"></div>
  <p>UAQ · UVM · M&D High Strategy Group · Signum Intelligence Unit</p>
  <p class="footer-copy">© 2026 · Todos los derechos reservados · Contenido protegido</p>
</footer>
<script>
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && ['s','p','u','a'].includes(e.key.toLowerCase())) e.preventDefault();
    if (e.key === 'F12') e.preventDefault();
  });
  document.addEventListener('dragstart', e => e.preventDefault());
</script>
</body>
</html>
