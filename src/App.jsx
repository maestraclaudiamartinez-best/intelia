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
