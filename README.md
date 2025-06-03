# 📝 Next Blog

Un blog moderno construido con **Next.js 15**, **Prisma** y **PostgreSQL**, con autenticación por OAuth y un diseño elegante gracias a **Chakra UI**. Este proyecto permite crear, editar, publicar y gestionar posts, así como explorar contenido mediante búsqueda, categorías y favoritos.

[🔗 Ver el sitio en producción](https://next-blog-mu-brown.vercel.app)

[📂 Ver el código en GitHub](https://github.com/Kenkyoo/next-blog)

---

## ✨ Características principales

- 🔐 **Autenticación** con OAuth usando NextAuth (proveedores: GitHub, Google)
- 📝 **CRUD de Posts**: crear, editar, publicar y borrar entradas
- 🏷️ **Tags** para filtrar posts por categoría
- 🔍 **Búsqueda en tiempo real** por título o contenido
- ⭐ **Favoritos**: guarda tus posts preferidos
- 👤 **Perfil de usuario** con sus publicaciones
- 🎨 **Diseño responsivo y accesible** con Chakra UI
- 🌙 Modo oscuro/claro con `next-themes`
- 🚀 Deploy en Vercel

---

## 🛠️ Tecnologías utilizadas

### Frontend

- **Next.js 15** con Pages Router
- **React 19**
- **Chakra UI** para la interfaz
- **React Markdown** para renderizar el contenido
- **SWR** para data fetching optimizado
- **React Icons** y **Dark Mode**

### Backend

- **Prisma ORM** con PostgreSQL
- **NextAuth.js** para autenticación (OAuth)
- **Prisma Adapter** para sesiones persistentes

### Desarrollo

- **TypeScript**
- **ESLint**
- **Tailwind CSS** (solo para utilidades mínimas)
- **Turbopack** en desarrollo local

---

## 🚀 Instalación local

```bash
git clone https://github.com/Kenkyoo/next-blog.git
cd next-blog
npm install

Configura las variables de entorno

Crea un archivo .env basado en .env.example y agrega tus claves de Google/GitHub y la URL de la base de datos PostgreSQL.
Ejecutar en modo desarrollo

npx prisma generate
npx prisma db push
npm run seed # opcional, para datos de ejemplo
npm run dev

🧪 Scripts útiles
Script	Descripción
dev	Inicia el servidor en desarrollo
build	Genera Prisma y construye la app
start	Inicia la app en producción
lint	Ejecuta ESLint
seed	Población inicial de la base de datos
📷 Capturas de pantalla (opcional)

    Puedes agregar imágenes de las vistas principales del blog: homepage, vista de post, editor, perfil de usuario, etc.

🙌 Créditos

Proyecto creado por Franco como práctica de desarrollo fullstack.
¡Gracias por visitar!
📄 Licencia

Este proyecto se distribuye bajo la licencia MIT.


---
```
