# LatinStyle

Tienda ecommerce de accesorios urbanos: relojes, gafas, carteras, correas y ropa urbana.

## Características

- Catálogo por categorías con 16 productos de ejemplo
- Carrito persistente en `localStorage`
- Checkout simulado (sin pagos reales)
- Diseño responsive e intuitivo
- Flujo de compra en 3 pasos: Elegir → Carrito → Confirmar

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Despliegue en GitHub Pages

1. Crea un repositorio llamado `latin-style` en la cuenta `dalmeida546`
2. Sube el código a la rama `main`
3. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**
4. El workflow `.github/workflows/deploy.yml` publicará automáticamente en cada push a `main`

URL esperada: `https://dalmeida546.github.io/latin-style/`

## Stack

- Vite + React 19 + TypeScript
- React Router
- CSS Modules
