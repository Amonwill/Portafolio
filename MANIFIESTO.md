# Manifiesto de cambios — Auditoría técnica Portafolio

Todas las rutas son relativas a la raíz del proyecto (`Portafolio/`).

## 1. REEMPLAZAR (copiar y sobrescribir el archivo existente)

- src/components/Projects/ProjectModal.vue
- src/components/Contact/Contact.vue
- src/components/Contact/Contact.ts
- src/components/Contact/Contact.css
- src/components/Navbar/Navbar.vue
- src/components/Navbar/Navbar.ts
- src/components/Navbar/Navbar.css
- src/sanityClient.ts
- src/main.js
- package.json
- src/components/Background/BackgroundCanvas.vue
- src/components/Projects/Projects.ts
- src/components/Certifications/Certifications.ts
- src/components/Projects/Projects.vue
- src/components/Technology/Technology.vue
- src/components/AboutMe/AboutMe.vue
- src/components/Certifications/Certifications.vue
- index.html
- src/App.vue
- src/style.css

## 2. CREAR (archivo nuevo, no existía antes)

- src/utils/debounce.ts

## 3. BORRAR (ya no se usan, no vienen incluidos en este paquete)

- src/router/index.js   → borra también la carpeta src/router/ si queda vacía
- src/assets/vite.svg
- src/assets/vue.svg

## 4. Después de aplicar todo

```bash
npm install    # porque package.json quitó la dependencia vue-router
npm run build  # valida que compile antes de subir a producción
npm audit      # no lo pude correr yo por falta de red en el sandbox
```

Nota: no pude ejecutar `npm run build` en el sandbox (le falta el binding
nativo de Rolldown que usa Vite 8 en este entorno, y no tiene acceso a
red para reinstalarlo). Revisé manualmente balance de llaves/etiquetas en
todos los archivos, pero confirma el build en tu máquina antes de desplegar.
