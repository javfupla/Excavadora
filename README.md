# Práctica 3 - Excavadora Articulada con Three.js

## Descripción
Proyecto de gráficos por computador que implementa una excavadora articulada en 3D con controles interactivos utilizando Three.js.

## Bibliotecas y Plugins Utilizados

### Three.js (r128)
**URL:** https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js

**Función:** Biblioteca principal de JavaScript para crear y renderizar gráficos 3D en el navegador utilizando WebGL. Proporciona todas las funcionalidades básicas para:
- Crear escenas 3D
- Gestionar geometrías y materiales
- Implementar sistemas de iluminación
- Renderizar objetos 3D en el navegador
- Cargar y aplicar texturas

### OrbitControls
**URL:** https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js

**Función:** Plugin de Three.js que permite controlar la cámara de manera intuitiva mediante el ratón. Funcionalidades:
- Rotar la vista alrededor de un punto central (click izquierdo + arrastre)
- Hacer zoom con la rueda del ratón
- Desplazar la vista (click derecho + arrastre)
- Facilita la navegación e inspección del modelo 3D desde diferentes ángulos

## Texturas Utilizadas

### Texturas del Suelo (Gravelly Sand)
**Fuente:** https://polyhaven.com/a/gravelly_sand
- `gravelly_sand_diff_4k.jpg` - Textura de color base
- `gravelly_sand_nor_gl_4k.jpg` - Mapa de normales para detalles de relieve
- `gravelly_sand_rough_4k.jpg` - Mapa de rugosidad
- `gravelly_sand_disp_4k.jpg` - Mapa de desplazamiento para deformación de geometría

### Texturas de Metal (Green Metal Rust)
- `green_metal_rust_diff_4k.jpg` - Textura de color para partes metálicas
- `green_metal_rust_rough_4k.jpg` - Mapa de rugosidad
- `green_metal_rust_spec_4k.jpg` - Mapa de metalicidad
- `green_metal_rust_bump_4k.jpg` - Mapa de relieve

### Textura de Ruedas (Bitumen)
- `bitumen_diff_4k.jpg` - Textura de asfalto para las ruedas

## Controles de la Excavadora

- **W/S** - Mover adelante/atrás
- **A/D** - Rotar excavadora izquierda/derecha
- **Q/E** - Rotar plataforma giratoria
- **R/F** - Rotar primer brazo (subir/bajar)
- **T/G** - Rotar segundo brazo (subir/bajar)
- **1/2** - Rotar cuchara (abrir/cerrar)

## Estructura del Proyecto

```
Practicas 3/
├── ejemplo3.html          # Archivo HTML principal
├── ejemplo3.js            # Lógica de la aplicación y modelado 3D
├── README.md             # Este archivo
└── texturas/             # Carpeta con las texturas (debe incluirse)
```

## URL del Código (Máquina Virtual)

**GitLab UVa:** https://gitlab.inf.uva.es/javfuen/excavadora.git

## Ejecución

Para ejecutar el proyecto, simplemente abrir el archivo `ejemplo3.html` en un navegador web moderno que soporte WebGL. Se recomienda usar un servidor local para evitar problemas de CORS con la carga de texturas.

Ejemplo con Python:
```bash
python -m http.server 8000
```

Luego acceder a: http://localhost:8000/ejemplo3.html

## Características Implementadas

- Modelo 3D completo de excavadora articulada
- Sistema de iluminación con luz ambiental y spotlight
- Texturas PBR (Physically Based Rendering) para realismo
- Sombras proyectadas y recibidas
- Controles de cámara orbital interactivos
- Sistema de animación mediante teclado para todos los componentes articulados
- Materiales especializados (metal, cristal transparente, asfalto)

## Suggestions for a good README

Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information.

## Name
Choose a self-explaining name for your project.

## Description
Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors.

## Badges
On some READMEs, you may see small images that convey metadata, such as whether or not all the tests are passing for the project. You can use Shields to add some to your README. Many services also have instructions for adding a badge.

## Visuals
Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.

## Installation
Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection.

## Usage
Use examples liberally, and show the expected output if you can. It's helpful to have inline the smallest example of usage that you can demonstrate, while providing links to more sophisticated examples if they are too long to reasonably include in the README.

## Support
Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap
If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing
State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
