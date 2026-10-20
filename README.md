# Portfolio — Ramiro Vittor (frontend)

Sitio personal de una sola página para Ramiro Vittor, Analista de Datos.
Construido como pieza de portafolio: narrativa por scroll, un pipeline de datos
animado como motivo visual, tipografía y paleta propias, y un formulario de
contacto real.

## Stack

- **React 19** + **TypeScript** (strict) sobre **Vite 8**
- **Tailwind CSS 4** (CSS-first, sin archivo de config)
- **Canvas 2D** para el pipeline animado del hero y el riel de progreso (sin WebGL)
- **GSAP** + **ScrollTrigger** como motor de animación, **Lenis** para scroll suave (sincronizados por el ticker de GSAP)
- **react-hook-form** + **zod** para el formulario de contacto
- **lucide-react** para iconografía; marcas de LinkedIn/GitHub como SVG propios

## Requisitos

- Node 20+ (probado con Node 22) y npm 10+
- El backend (`../back`) corriendo para que el formulario envíe correos

## Scripts

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en `http://localhost:5173` |
| `npm run build` | Type-check (`tsc --noEmit`) + build de producción en `dist/` |
| `npm run preview` | Sirve localmente el build de `dist/` |
| `npm run lint` | ESLint 9 (flat config) |
| `npm run typecheck` | Solo `tsc --noEmit` |

## Variables de entorno

Copiá `.env.example` a `.env` y ajustá:

| Variable | Descripción |
| --- | --- |
| `VITE_SITE_URL` | Origen público absoluto del sitio. Se usa en `canonical`, Open Graph, `robots.txt` y `sitemap.xml` (estos dos últimos se generan en el build). |
| `VITE_API_BASE_URL` | Base del backend de contacto. El formulario hace `POST {VITE_API_BASE_URL}/api/contact`. |

## Estructura

```
src/
  components/
    layout/     Header, Footer, Preloader
    sections/   Hero, Experience, Skills, About, Contact
    contact/    ContactForm (react-hook-form + zod)
    pipeline/   PipelineBackground (grilla + glow del puntero), HeroPipeline (canvas)
    ui/         Botones, secciones, reveals, riel de progreso, iconos de marca
  data/         Contenido del CV: profile, experience, skills, about
  hooks/        Media query, reduced motion, puntero, visibilidad, escena activa
  lib/          env, utils, scrollState/store, gsap, scenes, intro
  providers/    SmoothScrollProvider (Lenis + ScrollTrigger)
  types/        Tipos compartidos del contenido
```

Todo el contenido vive en `src/data/*`. Para actualizar textos, experiencia,
habilidades o enlaces, editá esos archivos; no hay contenido duplicado en los
componentes.

## Rendimiento y accesibilidad

- El pipeline animado (grilla de fondo, hero y riel lateral) se dibuja en **Canvas 2D**;
  el movimiento queda fuera de las zonas de texto para no afectar la legibilidad.
- Se respeta `prefers-reduced-motion`: se detienen el pipeline y el glow del puntero.
- El formulario usa labels asociados, `aria-live` para el estado y un campo honeypot.

## Deploy

Es un sitio estático: `npm run build` y publicá `dist/`.

- Definí `VITE_SITE_URL` con el dominio final y `VITE_API_BASE_URL` con la URL del backend.
- Recordá que es una SPA de una sola ruta; no requiere rewrites especiales.

## Pendientes

- **Dominio**: definí `VITE_SITE_URL` con el origen final antes del deploy.
- **Backend**: definí `VITE_API_BASE_URL` con la URL del backend desplegado y
  configurá el SMTP del servidor (ver `../back/README.md`).
