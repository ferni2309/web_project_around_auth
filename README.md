# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Tripleten web_project_around_react
Este proyecto es una implementación en React utilizando Vite como herramienta de infraestructura. El objetivo es renderizar un perfil de usuario y un conjunto de tarjetas interactivas, con ventanas emergentes (popups) que permiten editar información, añadir nuevas tarjetas, actualizar el avatar y eliminar tarjetas.

🚀 Tecnologías utilizadas
- React con componentes funcionales y hooks.
- Vite como bundler y entorno de desarrollo.
- CSS modularizado en la carpeta blocks.
- JavaScript ES6+.
- Git para control de versiones.
- Context API (Manejo de estado global)
- REST API (Persistencia de datos)

📂 Estructura del proyecto
├── index.css
├── main.jsx
├── components
│   ├── App.jsx
│   ├── Header
│   │   └── Header.jsx
│   ├── Main
│   │   └── Main.jsx
│   ├── Footer
│   │   └── Footer.jsx
│   ├── Card
│   │   └── Card.jsx
│   ├── EditProfile
│   │   └── EditProfile.jsx
│   ├── EditAvatar
│   │   └── EditAvatar.jsx
│   ├── NewCard
│   │   └── NewCard.jsx
│   ├── RemoveCard
│   │   └── RemoveCard.jsx
│   ├── ImagePopup
│   │   └── ImagePopup.jsx
│   └── Main/components/Popup/Popup.jsx
├── assets
│   └── images
├── README.md
└── .gitignore

⚙️ Funcionalidad implementada
- Renderizado del perfil de usuario y las tarjetas iniciales.
- Popups interactivos:
- Editar perfil.
- Añadir nueva tarjeta.
- Actualizar avatar.
- Confirmar eliminación de tarjeta.
- Visualizar imagen ampliada.
- Estados controlados con hooks (useState) para abrir/cerrar popups y manejar interacciones.
- Botones de acción para editar, agregar y eliminar.
- Manejo de eventos (onClick, onSubmit) en los componentes.

🎨 Estilo y convenciones de código
- Uso de camelCase en variables y funciones.
- Variables con nombres descriptivos y claros.
- Funciones nombradas con verbos que reflejan su acción.
- Componentes funcionales nombrados con sustantivos y en PascalCase.
- Sin abreviaturas poco claras.

📂 Nuevos añadidos a la estructura
src/
├── components/
│   ├── App.jsx             # Componente raíz con la lógica principal y API
│   ├── Header/             # Encabezado con logo
│   ├── Main/               # Contenedor de perfil y lista de tarjetas
│   ├── Card/               # Tarjeta individual con lógica de Like/Delete
│   ├── popup/              # Componentes de formulario (Popups)
│   │   │── Popup           # Componente Popup
│   │   ├── PopupWithForm   # Componente genérico reutilizable
│   │   ├── EditProfile     # Edición de nombre y ocupación
│   │   ├── EditAvatar      # Cambio de foto (usa Refs)
│   │   └── NewCard         # Creación de nuevos lugares
│   ├── ImagePopup/         # Visualizador de imágenes a pantalla completa
│   └── Footer/             # Pie de página con copyright dinámico
├── context/
│   └── CurrentUserContext  # Contexto del usuario actual
├── utils/
│   └── api.js              # Clase para peticiones al servidor
└── blocks/                 # Estilos CSS organizados por bloques BEM

🚀 Nuevas Implementaciones y Mejoras
A diferencia de la versión básica, esta implementación incluye:
- Integración con API REST: Consumo de datos reales del servidor para el perfil del usuario y las tarjetas, utilizando fetch y promesas (Promise.all).
- Context API (CurrentUserContext): Gestión global de los datos del usuario para evitar el "prop drilling", permitiendo que    cualquier componente acceda a la información del perfil.
- Hooks Avanzados:
useState y useEffect para el ciclo de vida y estado de los popups.
useRef para el manejo eficiente de formularios (ej. EditAvatar).
- Lógica de Interacción Completa:
Likes: Sistema de toggle que sincroniza el estado con el servidor.
Borrado: Popup de confirmación antes de eliminar una tarjeta de la base de datos.
Formularios Controlados: Validaciones en tiempo real que bloquean el botón de envío si los campos no cumplen con los requisitos (longitud, formato URL, etc.).

⚙️ Funcionalidad Técnica Destacada
Sincronización de Estado
Al dar like o borrar una tarjeta, el proyecto no recarga la página. Utiliza métodos de arreglos (.map y .filter) para actualizar el estado de React localmente solo después de que la API confirma que la operación fue exitosa, garantizando una experiencia de usuario fluida.
Validación de Formularios
Se implementó una lógica de validación nativa dentro de los componentes de React, utilizando el estado para mostrar mensajes de error específicos y controlar la propiedad disabled de los botones de envío.