# Publicar LatinStyle en GitHub (dalmeida546)

## 1. Ver la tienda en local

El servidor de desarrollo debe estar en:

**http://localhost:5173/**

Si no está corriendo:

```bash
npm run dev
```

## 2. Iniciar sesión en GitHub CLI

Abre una terminal en esta carpeta y ejecuta:

```bash
gh auth login
```

Sigue estos pasos en pantalla:

1. **What account do you want to log into?** → `GitHub.com`
2. **Preferred protocol** → `HTTPS`
3. **Authenticate Git** → `Yes`
4. **How would you like to authenticate?** → `Login with a web browser`
5. Copia el código que te muestra y pégalo en el navegador
6. Inicia sesión con tu cuenta **dalmeida546** (danieljaimes879@gmail.com)

Verifica:

```bash
gh auth status
```

## 3. Crear el repositorio y subir el código

```bash
gh repo create latin-style --public --source=. --remote=origin --push
```

Si el repo ya existe:

```bash
git remote add origin https://github.com/dalmeida546/latin-style.git
git push -u origin main
```

## 4. Activar GitHub Pages

1. Ve a https://github.com/dalmeida546/latin-style/settings/pages
2. En **Build and deployment → Source** elige **GitHub Actions**
3. El workflow `.github/workflows/deploy.yml` publicará automáticamente

## 5. URL final

https://dalmeida546.github.io/latin-style/

---

## Características internacionales incluidas

- Idiomas: **ES / EN** (selector en el header)
- Monedas: **USD / EUR / COP**
- Envío internacional y checkout con campo **País**
- SEO y Open Graph para compartir en redes
