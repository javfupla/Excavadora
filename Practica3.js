var step;
var scene, camera, renderer, controls;
var excavadora; // Grupo para mover la excavadora
var tanque; // Grupo para la plataforma giratoria 
var brazo; // Grupo para el brazo de la excavadora
var brazo2; // Segundo segmento del brazo
var teclas = {}; // Estado de las teclas presionadas
var texturaMetalica;

function init() {
   

    //  Crear la escena
    setup();
    mostrarControles();
    crearSuelo();
    
    // Crear grupo para la excavadora

    excavadora = new THREE.Group();
    crearExcavadora();

    // Añadir grupo de excavadora a la escena
    scene.add(excavadora);
    
    // Posicion inicial de la camara
    camera.position.set(0, 15, 40);
    camera.lookAt(scene.position);
    
    // Add OrbitControls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // Luz ambiental para iluminar áreas en sombra
    var ambientLight = new THREE.AmbientLight(0x404040, 0.8); // Gris suave
    scene.add(ambientLight);

    // Luz direccional para simular el sol
    var spotLight = new THREE.SpotLight(0xffffff, 1.2);
    spotLight.position.set(35, 100, 15); 
    spotLight.castShadow = true;
    // Para que se vean las sombras con más resolución sobre el suelo al ser las mas grandes
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;

    scene.add(spotLight);
    
    // Dettección de teclas presionadas
    window.addEventListener('keydown', function(e) {
        teclas[e.key.toLowerCase()] = true;
    });
    
    window.addEventListener('keyup', function(e) {
        teclas[e.key.toLowerCase()] = false;
    });

    // Añadir la salida del renderer al elemento html
    document.getElementById("contenedor").appendChild(renderer.domElement);

    // Llamar a la función de renderizado
    step = 0;
    renderScene();
}

function setup() {
    // configuración por defecto
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x87CEEB)); // Azul cielo
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
}

function crearSuelo() {// crear el plano del suelo
    // Cargar texturas
    var textureLoader = new THREE.TextureLoader();
    
    // Texturas descargadas de: https://polyhaven.com/a/gravelly_sand
    var texturaDiffuse = textureLoader.load('gravelly_sand_diff_4k.jpg');
    var texturaNormal = textureLoader.load('gravelly_sand_nor_gl_4k.jpg');
    var texturaRoughness = textureLoader.load('gravelly_sand_rough_4k.jpg');
    var texturaDisplacement = textureLoader.load('gravelly_sand_disp_4k.jpg');


    
    var planeGeometry = new THREE.PlaneGeometry(200, 200, 200, 200);
    var planeMaterial = new THREE.MeshStandardMaterial({ 
        map: texturaDiffuse,              // Texturaa de color
        normalMap: texturaNormal,         // Detalles de relieve
        roughnessMap: texturaRoughness,   // Mapa de rugosidad
        displacementMap: texturaDisplacement,  // Deformación de geometría
        displacementScale: 4.0,           // Intensidad del desplazamiento

    });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    
    // Se añade en todos los objetos para que emitan y reciban sombras
    plane.receiveShadow = true;
    plane.castShadow = false;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0.5;  // Subido para que cuadre con las ruedas
    plane.position.z = 0;
    scene.add(plane);
}

function crearExcavadora() {

    crearRuedas();
    crearChasis();
    tanque = new THREE.Group();
    crearTanque();
    excavadora.add(tanque);
}

function crearTanque() {
    getParteMetalica();
    crearPlataforma();
    crearCabina();
    brazo = new THREE.Group();
    crearBrazo();
}

function getParteMetalica(){
    if (texturaMetalica) return texturaMetalica;
    
    // Crear un loader local para texturas
    var textureLoader = new THREE.TextureLoader();
    var texturaDiffuse = textureLoader.load('green_metal_rust_diff_4k.jpg');
    var texturaRoughness = textureLoader.load('green_metal_rust_rough_4k.jpg');
    var texturaMetalness = textureLoader.load('green_metal_rust_spec_4k.jpg');
    var texturaBump = textureLoader.load('green_metal_rust_bump_4k.jpg');


    var materialMetalico = new THREE.MeshStandardMaterial({ 
        map: texturaDiffuse,              // Textura de color
        roughnessMap: texturaRoughness,   // Mapa de rugosidad
        metalnessMap: texturaMetalness,   // Mapa de metalicidad (especular)
        bumpMap: texturaBump,             // Mapa de relieve
        bumpScale: 0.005,                  // Intensidad del bump
        metalness: 0.6,                   // Valor base de metalicidad (especular)
        roughness: 0.4,                   // Valor base de rugosidad 
        flatShading: true                 // Sombreado plano
    });

    texturaMetalica = materialMetalico;
    return texturaMetalica;
}

function crearPlataforma(){
     // Plataforma
    var materialPlataforma = texturaMetalica; // Amarillo    

    var plataformaGeometry = new THREE.BoxGeometry(9, 0.5, 6.5);
    var plataforma = new THREE.Mesh(plataformaGeometry, materialPlataforma);
    plataforma.position.set(-1, 4, 0); // Sobre el chasis
    plataforma.castShadow = true;
    plataforma.receiveShadow = true;
    tanque.add(plataforma);

    var cajaMotorGeometry = new THREE.BoxGeometry(6.0, 3.0, 6.5);
    var cajaMotor = new THREE.Mesh(cajaMotorGeometry, materialPlataforma);
    cajaMotor.position.set(-4, 5.25, 0); // Sobre la plataforma de la cabina

    cajaMotor.castShadow = true;
    cajaMotor.receiveShadow = true;
    tanque.add(cajaMotor);

}

function crearCabina() {
    // Cabina
    var materialCabina = new THREE.MeshLambertMaterial({ 
    color: 0x88ccff,      // Color cristal
    transparent: true,    // Habilitar transparencia
    opacity: 0.6          // Valor alfa 
    });
    var cabinaGeometry = new THREE.BoxGeometry(4.8, 4.7, 3.5);
    var cabina = new THREE.Mesh(cabinaGeometry, materialCabina);
    cabina.position.set(1.3, 6.5, -1.5); // Sobre la plataforma de la cabina
    cabina.castShadow = true;
    cabina.receiveShadow = true;
    tanque.add(cabina);
    crearBordeCabina(cabina, cabinaGeometry);
}

function crearRuedas() {

    var textureLoader = new THREE.TextureLoader();
    var texturaBitumen = textureLoader.load('bitumen_diff_4k.jpg');
    texturaBitumen.wrapS = THREE.RepeatWrapping;
    texturaBitumen.wrapT = THREE.RepeatWrapping;
    
    var materialRuedas = new THREE.MeshStandardMaterial({ 
        map: texturaBitumen,
        roughness: 0.9,
        metalness: 0.0
    });
    var ruedaGeometry = new THREE.CylinderGeometry(1.5, 1.5, 1, 32);
    
    // Crear 4 ruedas cilíndricas usando array con us posiciones
    var posicionesRuedas = [ //Tienen la misma Y
        [4, -3],   // Delantera izquierda
        [4, 3],    // Delantera derecha
        [-5, -3],  // Trasera izquierda
        [-5, 3]    // Trasera derecha
    ];
    
    posicionesRuedas.forEach(function(pos) {
        var rueda = new THREE.Mesh(ruedaGeometry, materialRuedas);
        rueda.rotation.set(0, Math.PI / 2, Math.PI / 2);
        rueda.position.set(pos[0], 2, pos[1]);
        rueda.castShadow = true;
        rueda.receiveShadow = true;
        excavadora.add(rueda);
    });
}

function crearBordeCabina(cabina, cabinaGeometry) {
    // Frame para la cabina
    var materialFrame = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 50, specular: 0x333333 });
    var grosor = 0.4;
    var ancho = cabinaGeometry.parameters.width;
    var alto = cabinaGeometry.parameters.height;
    var prof = cabinaGeometry.parameters.depth;
    var posX = cabina.position.x
    var posY = cabina.position.y
    var posZ = cabina.position.z;
    var offsetX = ancho/2
    var offsetZ = prof/2
    var offsetY = alto/2;
    
    // Eje Y fijo (verticales)
    var aristaY = new THREE.BoxGeometry(grosor, alto, grosor);
    var posicionesY = [
        [posX + offsetX, posY, posZ + offsetZ],
        [posX + offsetX, posY, posZ - offsetZ],
        [posX - offsetX, posY, posZ + offsetZ],
        [posX - offsetX, posY, posZ - offsetZ]
    ];
    
    posicionesY.forEach(function(pos) {
        var frame = new THREE.Mesh(aristaY, materialFrame);
        frame.position.set(pos[0], pos[1], pos[2]);
        frame.castShadow = true;
        frame.receiveShadow = true;
        tanque.add(frame);
    });
    
    // Eje X fijo (horizontales)
    var aristaX = new THREE.BoxGeometry(ancho + grosor, grosor, grosor);
    var posicionesX = [
        [posX, posY + offsetY, posZ + offsetZ],
        [posX, posY + offsetY, posZ - offsetZ],
        [posX, posY - offsetY, posZ + offsetZ],
        [posX, posY - offsetY, posZ - offsetZ]
    ];
    
    posicionesX.forEach(function(pos) {
        var frame = new THREE.Mesh(aristaX, materialFrame);
        frame.position.set(pos[0], pos[1], pos[2]);
        frame.castShadow = true;
        frame.receiveShadow = true;
        tanque.add(frame);
    });
    
    // Eje Z fijo (horizontales)
    var aristaZ = new THREE.BoxGeometry(grosor, grosor, prof);
    var posicionesZ = [
        [posX + offsetX, posY + offsetY, posZ],
        [posX - offsetX, posY + offsetY, posZ],
        [posX + offsetX, posY - offsetY, posZ],
        [posX - offsetX, posY - offsetY, posZ]
    ];
    
    posicionesZ.forEach(function(pos) {
        var frame = new THREE.Mesh(aristaZ, materialFrame);
        frame.position.set(pos[0], pos[1], pos[2]);
        frame.castShadow = true;
        frame.receiveShadow = true;
        tanque.add(frame);
    });
}

function crearChasis() {
    // Crear chasis que conecta las ruedas
    var materialChasis = new THREE.MeshLambertMaterial({ color: 0x0f0f0f });
    
    // Chasis principal (base rectangular entre las ruedas)
    var chasisGeometry = new THREE.BoxGeometry(10, 1.75, 5);
    var chasisRec = new THREE.Mesh(chasisGeometry, materialChasis);
    chasisRec.position.set(-0.5, 2.25, 0); // Entre las ruedas
    chasisRec.castShadow = true;
    chasisRec.receiveShadow = true;
    excavadora.add(chasisRec);
    
    var cilindroGeometry = new THREE.CylinderGeometry(1.5, 1.5, 2, 32);
    var chasisCilindro = new THREE.Mesh(cilindroGeometry, materialChasis);
    chasisCilindro.position.set(-0.5, 3, 0); // Sobre las ruedas
    chasisCilindro.castShadow = true;
    chasisCilindro.receiveShadow = true;
    excavadora.add(chasisCilindro);

}

function crearBrazo() {
    // Soporte del brazo - Prisma triangular con BufferGeometry
    var materialSoporte = texturaMetalica;

    // Vértices del prisma triangular usando coordenadas exactas
    var vertices = new Float32Array([
        // Cara cercana a la cabina
        -0.5, 4.25, 0.5,     // 0: base cercana caja
        -0.5, 6.75, 0.5,     // 1: pico superior
        4, 4.25, 0.5,        // 2: base lejana
        
        // Cara lejana a la cabina
        -0.5, 4.25, 3.25,    // 3: base cercana caja
        -0.5, 6.75, 3.25,    // 4: pico superior
        4, 4.25, 3.25        // 5: base lejana
    ]);
    
    // Índices de las caras
    var indices = [
        // Cara cercana a la cabina (1 triangulo)
        0, 1, 2,
        // Cara lejana a la cabina (1 triangulo)
        3, 5, 4,
        // Lado superior inclinado (2 triangulos)
        1, 4, 5,  1, 5, 2,

    ];
    
    var soporteGeometry = new THREE.BufferGeometry();
    soporteGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    soporteGeometry.setIndex(indices);
    soporteGeometry.computeVertexNormals(); // Importante para la iluminación, si no queda muy iluminado
    
    var soporte = new THREE.Mesh(soporteGeometry, materialSoporte);
    soporte.position.set(-0.5, 0, 0);
    soporte.castShadow = true;
    soporte.receiveShadow = true;
    tanque.add(soporte);
    
    // Crear grupo para el brazo (para poder rotarlo)
    // Los grupos de excavadora y plataforma estaban ya posicionados en su pivote, este no es el caso para brazo
    // si no se establece la rotacion se hará alrededor de 0,0,0 y quedara mal
    brazo = new THREE.Group();
    brazo.position.set(1, 5.5, 1.875); 

    tanque.add(brazo);
    
    // Primera extremidad del brazo 
    var materialBrazo = texturaMetalica;
    
    var brazoBaseGeometry = new THREE.BoxGeometry(12, 2, 2);
    var brazoBase = new THREE.Mesh(brazoBaseGeometry, materialBrazo);
    brazoBase.position.set(2, 4, 0); // Posición relativa a la del grupo brazo
    brazoBase.rotation.z = -Math.PI / 180 * 120; // Inclinación hacia arriba inicial
    brazoBase.castShadow = true;
    brazoBase.receiveShadow = true;
    brazo.add(brazoBase);

    // Cilindro para esconder la union 
    var materialUnion = new THREE.MeshLambertMaterial({ 
        color: 0x555555  
    });
    var unionGeometry = new THREE.CylinderGeometry(1.4, 1.4, 2.2, 32);
    var union = new THREE.Mesh(unionGeometry, materialUnion);
    union.position.set(4.5, 8.5, 0);
    union.rotation.x = -Math.PI / 2;
    union.castShadow = true;
    union.receiveShadow = true;
    brazo.add(union);
    
    // Segundo brazo
    // De nuevo crear un grupo para tener el pivote adecuado
    brazo2 = new THREE.Group();
    brazo2.position.set(4.5, 8.5, 0);

    
    var anteBrazoGeometry = new THREE.BoxGeometry(8, 1.5, 1.5);
    anteBrazo = new THREE.Mesh(anteBrazoGeometry, materialBrazo);
    anteBrazo.position.set(4, 2.5, 0); // Continúa desde la unión
    anteBrazo.rotation.z = Math.PI / 180 * 30; // Inclinación hacia abajo
    anteBrazo.castShadow = true;
    anteBrazo.receiveShadow = true;
    brazo2.add(anteBrazo);
    brazo.add(brazo2);


    var unionCucharaGeometry = new THREE.CylinderGeometry(1, 1, 1.6, 32);
    var unionCuchara = new THREE.Mesh(unionCucharaGeometry, materialUnion);
    unionCuchara.position.set(8, 4.75, 0);
    unionCuchara.rotation.x = -Math.PI / 2;
    unionCuchara.castShadow = true;
    unionCuchara.receiveShadow = true;
    brazo2.add(unionCuchara);

    // Cuchara

    cucharaGroup = new THREE.Group();
    cucharaGroup.position.set(8, 5, 0);
    brazo2.add(cucharaGroup);

    // Material para la cuchara
    var materialCuchara = new THREE.MeshLambertMaterial({ 
        color: 0x2a2a2a,  
        side: THREE.DoubleSide  // Para que se sombree adecuadamente
    });

    
    var cucharaGeometry = new THREE.CylinderGeometry(2.0, 2.0, 3, 64, 1, false, 0, Math.PI);
    var cuchara = new THREE.Mesh(cucharaGeometry, materialCuchara);
    cuchara.position.set(1, -2, 0); 
    cuchara.rotation.x = Math.PI / 2;
    cuchara.rotation.y = Math.PI / 180 * 30;
    cuchara.castShadow = true;
    cuchara.receiveShadow = true;
    cucharaGroup.add(cuchara);
    brazo2.add(cucharaGroup);

}

function mostrarControles() {
    // Crear panel de controles
    var controles = document.createElement('div');
    controles.innerHTML = `
        <h2>Controles</h2>
        <p><b>W/S</b> - Mover adelante/atrás</p>
        <p><b>A/D</b> - Rotar excavadora</p>
        <p><b>Q/E</b> - Rotar plataforma</p>
        <p><b>R/F</b> - Rotar Brazo 1</p>
        <p><b>T/G</b> - Rotar Brazo 2</p>
        <p><b>1/2</b> - Rotar Cuchara</p>
    `;
    controles.style.cssText = `
        background: rgba(0,0,0,0.7);
        color: white;
        font-family: Arial;
        font-size: 14px;
        position: fixed;
        top: 10px;
        left: 10px;
        padding: 15px;
    `;
    document.body.appendChild(controles);
    }

function renderScene() {
    // Mover excavadora con teclado
    var velocidad = 0.1;
    var velocidadRotacion = 0.02;

    if (teclas['w']) {
        // El movimiento tiene que cuadrar con la rotación actual
        excavadora.position.x += Math.sin(excavadora.rotation.y+Math.PI/2) * velocidad;
        excavadora.position.z += Math.cos(excavadora.rotation.y+Math.PI/2) * velocidad;

    }
    if (teclas['s']) {
        // El movimiento tiene que cuadrar con la rotación actual
        excavadora.position.x -= Math.sin(excavadora.rotation.y+Math.PI/2) * velocidad;
        excavadora.position.z -= Math.cos(excavadora.rotation.y+Math.PI/2) * velocidad;

    }
    if (teclas['a']) {
        excavadora.rotation.y += velocidadRotacion;
    }
    if (teclas['d']) {
        excavadora.rotation.y -= velocidadRotacion;
    }
    if (teclas['q']) {
        tanque.rotation.y += velocidadRotacion;
    }
    if (teclas['e']) {
        tanque.rotation.y -= velocidadRotacion;
    }
    if (teclas['r']) {
        if(brazo.rotation.z < Math.PI/4){
            brazo.rotation.z += velocidadRotacion; // Levantar brazo
        }
    }
    if (teclas['f']) {
        if(brazo.rotation.z > -Math.PI/4){
            brazo.rotation.z -= velocidadRotacion; // Bajar brazo
        }
    }
    if (teclas['t']) {
        if(brazo2.rotation.z < Math.PI/4){
            brazo2.rotation.z += velocidadRotacion; // Levantar brazo2
        }
    }
    if (teclas['g']) {
        if(brazo2.rotation.z > -Math.PI/4){
            brazo2.rotation.z -= velocidadRotacion; // Bajar brazo2
        }
    }
    if (teclas['1']) {
        if(cucharaGroup.rotation.z < Math.PI/4){
            cucharaGroup.rotation.z += velocidadRotacion; // Levantar cuchara
        }
    }
    if (teclas['2']) {
        if(cucharaGroup.rotation.z > -Math.PI/4){
            cucharaGroup.rotation.z -= velocidadRotacion; // Bajar cuchara
        }
    }
   
    controls.update();

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
}

// Resize handler
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
