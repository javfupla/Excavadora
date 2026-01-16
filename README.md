# Práctica 3 - Excavadora Articulada con Three.js

## Ejecución

https://javfupla.github.io/Excavadora/ejemplo3.html

También funciona si se ejecuta el proyecto con un Live Server en VSCode.
Pero no si se ejectuta directamente el .html, no se cargan las texturas.


## Plugins Utilizados

### OrbitControls
**URL:** https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js

**Función:** Plugin de Three.js que permite controlar la cámara de manera intuitiva mediante el ratón. Funcionalidades:
- Rotar la vista alrededor de un punto central (click izquierdo + arrastre)
- Hacer zoom con la rueda del ratón
- Desplazar la vista (click derecho + arrastre)


## Texturas Utilizadas
Sacadas de (https://polyhaven.com/)
### Texturas del Suelo (Gravelly Sand)
**Fuente:** https://polyhaven.com/a/gravelly_sand
- `gravelly_sand_diff_4k.jpg` - Textura de color base
- `gravelly_sand_nor_gl_4k.jpg` - Mapa de normales para detalles de relieve
- `gravelly_sand_rough_4k.jpg` - Mapa de rugosidad
- `gravelly_sand_disp_4k.jpg` - Mapa de desplazamiento para deformación de geometría

### Texturas partes metálicas excavadora (Green Metal Rust) 
**Fuente:** https://polyhaven.com/a/green_metal_rust
- `green_metal_rust_diff_4k.jpg` - Textura de color
- `green_metal_rust_rough_4k.jpg` - Mapa de rugosidad
- `green_metal_rust_spec_4k.jpg` - Mapa de metalicidad
- `green_metal_rust_bump_4k.jpg` - Mapa de relieve

### Textura de Ruedas (Bitumen) 
**Fuente:** https://polyhaven.com/a/bitumen
- `bitumen_diff_4k.jpg` - Textura de asfalto para las ruedas

## Controles de la Excavadora

- **W/S** - Mover adelante/atrás
- **A/D** - Rotar excavadora izquierda/derecha
- **Q/E** - Rotar plataforma giratoria
- **R/F** - Rotar primer brazo (subir/bajar)
- **T/G** - Rotar segundo brazo (subir/bajar)
- **1/2** - Rotar cuchara (abrir/cerrar)




