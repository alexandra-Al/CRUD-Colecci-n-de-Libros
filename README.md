## AUTOR
Yelisa Alexandra Alvarez Quintero – Desarrolladora Frontend Jr. 
([@alexandra-Al]
(https://github.com/alexandra-Al/CRUD-Colecci-n-de-Libros))
  

## GESTIÓN DE LIBROS
Aplicación web desarrollada con Vue 3 y TypeScript para la gestión de una colección de libros. Permite visualizar, crear, editar y eliminar libros, con una API REST personalizada y una interfaz amigable.

Este proyecto fue realizado como parte de una prueba técnica para el cargo de Desarrolladora Frontend Vue Jr.T simple.

## OBJETIVO
Desarrollar una aplicación de Página Única que permita realizar operaciones CRUD sobre libros, aplicando buenas prácticas de desarrollo frontend, uso de TypeScript, componentes reutilizables, validaciones en tiempo real, y consumo de una API propia.

## FUNCIONALIDADES PRINCIPALES
Listado de libros con PrimeVue DataTable.
Filtros por título, autor y género.
Paginación, ordenamiento y búsqueda instantánea.
Crear nuevo libro con formulario validado.
Editar libro existente.   
Eliminar libro con confirmación.
Vista adicional de estadísticas por género usando gráfico circular.
Validaciones reactivas con mensajes en tiempo real.
Notificaciones con PrimeVue Toast.
Selector de fecha con Calendar
## REQUISITOS DEL SISTEMA

- Node.js ≥ 18
- NPM ≥ 9
- MySQL 8.x

## COMANDOS DE USO
### Clonar repositorio
git clone https://github.com/alexandra-Al/CRUD-Colecci-n-de-Libros.git
cd CRUD-Colecci-n-de-Libros

# Instalar dependencias Backend/books/api
npm install

express

mysql2

cors

dotenv
# Dependencias de desarrollo
typescript

@vitejs/plugin-vue

postcss

tailwindcss

autoprefixer

eslint

eslint-plugin-vue

@vue/eslint-config-typescript

prettier

# Dependencias de Producción
vue

vue-router

pinia

axios

primevue

primeicons

primeflex

chart.js

# Levantar frontend
npm run dev

# Levantar backend 
npm run dev
## EVIDENCIA 
Evidencia- 1
![alt text](image-3.png)

Evidencia- 2
Buscar por titulo o autor
![alt text](image-4.png)

Evidencia- 3
Buscar por genero
![alt text](image-5.png)

Evidencia- 4
Editar Orgullo y Odio por Orgullo y Prejuicio
![alt text](image-8.png)

Evidencia- 5
Calendario
![alt text](image-9.png)

Evidencia- 6
Confirmacion de eliminación
![alt text](image-11.png)

Evidencia- 7
Registrar nuevo libro
![alt text](image-12.png)
![alt text](image-13.png)

# Video del proyecto
Puedes ver una demostración del funcionamiento en este video
[ Ver Video en Google Drive](https://drive.google.com/file/d/18Jc4RofWGOpGLDetyxvnpCgI7VFvzIV0/view?usp=drive_link)

## TECNOLOGIAS UTILIZADAS
Vue 3 con Composition API y Options API.
TypeScript 
Vite 
Pinia para gestión de estado global.
Vue Router con lazy loading.
PrimeVue para componentes UI (DataTable, Toast, ConfirmDialog, Chart).
Tailwind CSS 4.
Axios para consumo de API REST.
Atomic Design para organización de componentes.

## ESTRUCTURA DEL PROYECTO (Atomic Design)
El proyecto sigue el patrón de Atomic Design de la siguiente manera.

src/components/atoms: (BaseButton.vue)(BaseInput.vue)(Spinner.vue)(tag.vue)

src/components/molecules: Combinaciones de átomos (FormField, BookRow)

src/components/organisms: Estructuras grandes (BookForm, BookTable)

src/components/templates:  Layouts (MainLayout.vue)

src/pages:  Vistas completas/principales (BookListPage) (BookFormPage) (StatsPage)

src/store: Pinia (useBooksStore)

src/router: Rutas de la aplicación

src/composables: Composición de lógica reutilizable (useBookValidation.ts)

## ¿Cómo apliqué Atomic Design?
Para organizar mejor los componentes del proyecto, usé la metodología Atomic Design. Esta técnica me ayudó a estructurar el frontend desde lo más básico hasta lo más complejo, y me facilitó mucho la reutilización de componentes.
De esta forma la aplique en el proyecto:

Átomos (src/components/atoms)
Aquí guardé los componentes más pequeños y reutilizables, como botones (BaseButton.vue), campos de texto (BaseInput.vue), y etiquetas (Tag.vue).

Moléculas (src/components/molecules)
En esta carpeta puse combinaciones de átomos, como FormField.vue, que junta un label y un input, o BookRow.vue.

Organismos (src/components/organisms)
Son componentes más grandes y funcionales, como BookForm.vue (el formulario de libros) y BookTable.vue (la tabla para mostrar los libros).

Templates (src/components/templates)
Aquí está el layout general de la app (MainLayout.vue), que uso como base para todas las páginas.

Pages (src/pages)
Estas son las vistas principales que el usuario ve: BookListPage.vue, BookFormPage.vue y StatsPage.vue.

