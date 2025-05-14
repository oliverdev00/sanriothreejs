// Configuración básica de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Configurar el renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000033); // Fondo azul oscuro
document.body.appendChild(renderer.domElement);

// Crear fondo cósmico mejorado
function createCosmicBackground() {
    const starsGroup = new THREE.Group();
    // Estrellas normales
    const starGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let i = 0; i < 200; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.set(
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50
        );
        starsGroup.add(star);
    }

    // Lunas
    const moonColors = [0xfafad2, 0xb0c4de, 0xf5e6ff];
    for (let i = 0; i < 3; i++) {
        const moonGeometry = new THREE.SphereGeometry(0.7 + Math.random() * 0.3, 32, 32);
        const moonMaterial = new THREE.MeshPhongMaterial({ color: moonColors[i], shininess: 80 });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 30,
            -10 - Math.random() * 10
        );
        starsGroup.add(moon);
    }

    // Nebulosas (nubes translúcidas)
    const nebulaColors = [0xffb6c1, 0x87ceeb, 0xdda0dd];
    for (let i = 0; i < 3; i++) {
        const nebulaGeometry = new THREE.SphereGeometry(2.5 + Math.random(), 32, 32);
        const nebulaMaterial = new THREE.MeshPhongMaterial({ color: nebulaColors[i], transparent: true, opacity: 0.25 });
        const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
        nebula.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            -15 - Math.random() * 10
        );
        starsGroup.add(nebula);
    }

    // Anillo de asteroides
    const asteroidGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const asteroidMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
    const asteroidRing = new THREE.Group();
    const ringRadius = 8;
    for (let i = 0; i < 40; i++) {
        const angle = (i / 40) * Math.PI * 2;
        const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
        asteroid.position.set(
            Math.cos(angle) * ringRadius + (Math.random() - 0.5) * 0.5,
            Math.sin(angle) * ringRadius + (Math.random() - 0.5) * 0.5,
            -2 + (Math.random() - 0.5) * 1
        );
        asteroid.rotation.z = Math.random() * Math.PI * 2;
        asteroidRing.add(asteroid);
    }
    starsGroup.add(asteroidRing);

    // Cometas
    const cometGroup = new THREE.Group();
    for (let i = 0; i < 2; i++) {
        const cometGeometry = new THREE.SphereGeometry(0.18, 16, 16);
        const cometMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 });
        const comet = new THREE.Mesh(cometGeometry, cometMaterial);
        comet.position.set(-20 + i * 40, 10 - i * 20, -5);
        // Cola del cometa
        const tailGeometry = new THREE.CylinderGeometry(0.01, 0.12, 2, 8, 1, true);
        const tailMaterial = new THREE.MeshPhongMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.7 });
        const tail = new THREE.Mesh(tailGeometry, tailMaterial);
        tail.position.set(0, -1, 0);
        tail.rotation.x = Math.PI / 2;
        comet.add(tail);
        cometGroup.add(comet);
    }
    starsGroup.add(cometGroup);

    // Shooting stars (estrellas fugaces)
    const shootingStars = [];
    for (let i = 0; i < 3; i++) {
        const geo = new THREE.SphereGeometry(0.07, 8, 8);
        const mat = new THREE.MeshBasicMaterial({ color: 0xfff700 });
        const shootingStar = new THREE.Mesh(geo, mat);
        shootingStar.position.set(-25 + i * 20, 15 - i * 10, -8);
        starsGroup.add(shootingStar);
        shootingStars.push(shootingStar);
    }
    starsGroup.userData.shootingStars = shootingStars;

    // Satélite kawaii
    const satellite = new THREE.Group();
    // Cuerpo
    const satBodyGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const satBodyMaterial = new THREE.MeshPhongMaterial({ color: 0xeeeeee, shininess: 100 });
    const satBody = new THREE.Mesh(satBodyGeometry, satBodyMaterial);
    satellite.add(satBody);
    // Paneles solares
    const panelGeometry = new THREE.BoxGeometry(0.05, 0.3, 0.7);
    const panelMaterial = new THREE.MeshPhongMaterial({ color: 0x87ceeb });
    const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    leftPanel.position.set(-0.35, 0, 0);
    satellite.add(leftPanel);
    const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
    rightPanel.position.set(0.35, 0, 0);
    satellite.add(rightPanel);
    // Carita kawaii
    const satEyeGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const satEyeMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const satLeftEye = new THREE.Mesh(satEyeGeometry, satEyeMaterial);
    const satRightEye = new THREE.Mesh(satEyeGeometry, satEyeMaterial);
    satLeftEye.position.set(-0.09, 0.08, 0.28);
    satRightEye.position.set(0.09, 0.08, 0.28);
    satellite.add(satLeftEye);
    satellite.add(satRightEye);
    const satSmileGeometry = new THREE.TorusGeometry(0.07, 0.01, 8, 16, Math.PI);
    const satSmileMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const satSmile = new THREE.Mesh(satSmileGeometry, satSmileMaterial);
    satSmile.position.set(0, 0, 0.29);
    satSmile.rotation.x = Math.PI / 2;
    satellite.add(satSmile);
    satellite.position.set(0, 7, -6);
    starsGroup.add(satellite);
    starsGroup.userData.satellite = satellite;

    return starsGroup;
}

// Crear Hello Kitty
function createHelloKitty() {
    const kitty = new THREE.Group();

    // Cabeza
    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        shininess: 100
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    kitty.add(head);

    // Orejas
    const earGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const earMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        shininess: 100
    });
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.7, 0.7, 0);
    rightEar.position.set(0.7, 0.7, 0);
    kitty.add(leftEar);
    kitty.add(rightEar);

    // Nariz
    const noseGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const noseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffb6c1,
        shininess: 100
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 0, 0.9);
    kitty.add(nose);

    // Ojos
    const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x000000,
        shininess: 100
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 0.2, 0.9);
    rightEye.position.set(0.3, 0.2, 0.9);
    kitty.add(leftEye);
    kitty.add(rightEye);

    // Bigotes
    const whiskerGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.5);
    const whiskerMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x000000,
        shininess: 100
    });
    
    // Bigotes izquierdos
    const leftWhisker1 = new THREE.Mesh(whiskerGeometry, whiskerMaterial);
    const leftWhisker2 = new THREE.Mesh(whiskerGeometry, whiskerMaterial);
    const leftWhisker3 = new THREE.Mesh(whiskerGeometry, whiskerMaterial);
    
    leftWhisker1.position.set(-0.4, 0, 0.9);
    leftWhisker2.position.set(-0.4, -0.1, 0.9);
    leftWhisker3.position.set(-0.4, -0.2, 0.9);
    
    leftWhisker1.rotation.z = Math.PI / 4;
    leftWhisker2.rotation.z = 0;
    leftWhisker3.rotation.z = -Math.PI / 4;
    
    kitty.add(leftWhisker1);
    kitty.add(leftWhisker2);
    kitty.add(leftWhisker3);
    
    // Bigotes derechos
    const rightWhisker1 = new THREE.Mesh(whiskerGeometry, whiskerMaterial);
    const rightWhisker2 = new THREE.Mesh(whiskerGeometry, whiskerMaterial);
    const rightWhisker3 = new THREE.Mesh(whiskerGeometry, whiskerMaterial);
    
    rightWhisker1.position.set(0.4, 0, 0.9);
    rightWhisker2.position.set(0.4, -0.1, 0.9);
    rightWhisker3.position.set(0.4, -0.2, 0.9);
    
    rightWhisker1.rotation.z = -Math.PI / 4;
    rightWhisker2.rotation.z = 0;
    rightWhisker3.rotation.z = Math.PI / 4;
    
    kitty.add(rightWhisker1);
    kitty.add(rightWhisker2);
    kitty.add(rightWhisker3);

    // Lazo
    const bowGroup = new THREE.Group();
    
    // Centro del lazo
    const bowCenterGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const bowCenterMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff69b4,
        shininess: 100
    });
    const bowCenter = new THREE.Mesh(bowCenterGeometry, bowCenterMaterial);
    bowGroup.add(bowCenter);
    
    // Lados del lazo
    const bowSideGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const bowSideMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff69b4,
        shininess: 100
    });
    const leftBow = new THREE.Mesh(bowSideGeometry, bowSideMaterial);
    const rightBow = new THREE.Mesh(bowSideGeometry, bowSideMaterial);
    
    leftBow.position.set(-0.2, 0, 0);
    rightBow.position.set(0.2, 0, 0);
    
    bowGroup.add(leftBow);
    bowGroup.add(rightBow);
    
    bowGroup.position.set(0, 0.5, 0.9);
    kitty.add(bowGroup);

    return kitty;
}

// Crear My Melody
function createMyMelody() {
    const melody = new THREE.Group();

    // Cabeza
    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        shininess: 100
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    melody.add(head);

    // Orejas
    const earGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const earMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff69b4,
        shininess: 100
    });
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.8, 0.8, 0);
    rightEar.position.set(0.8, 0.8, 0);
    melody.add(leftEar);
    melody.add(rightEar);

    // Nariz
    const noseGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const noseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffb6c1,
        shininess: 100
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 0, 0.9);
    melody.add(nose);

    // Ojos
    const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x000000,
        shininess: 100
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 0.2, 0.9);
    rightEye.position.set(0.3, 0.2, 0.9);
    melody.add(leftEye);
    melody.add(rightEye);

    // Capucha
    const hoodGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const hoodMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff69b4,
        shininess: 100
    });
    const hood = new THREE.Mesh(hoodGeometry, hoodMaterial);
    hood.position.set(0, -0.5, 0);
    melody.add(hood);

    return melody;
}

// Crear Pompompurin
function createPompompurin() {
    const purin = new THREE.Group();

    // Cuerpo
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xf4d03f,  // Color dorado
        shininess: 100
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    purin.add(body);

    // Sombrero de pudding
    const hatGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.4, 32);
    const hatMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8b4513,  // Color café
        shininess: 100
    });
    const hat = new THREE.Mesh(hatGeometry, hatMaterial);
    hat.position.set(0, 0.7, 0);
    purin.add(hat);

    // Crema del pudding
    const creamGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const creamMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xfff8dc,  // Color crema
        shininess: 100
    });
    const cream = new THREE.Mesh(creamGeometry, creamMaterial);
    cream.position.set(0, 1, 0);
    purin.add(cream);

    // Hocico de perro
    const snoutGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const snoutMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xf4d03f,  // Color dorado
        shininess: 100
    });
    const snout = new THREE.Mesh(snoutGeometry, snoutMaterial);
    snout.position.set(0, -0.1, 0.7);
    snout.scale.set(1, 0.8, 0.6);
    purin.add(snout);

    // Ojos
    const eyeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const eyeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x000000,
        shininess: 100
    });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 0.2, 0.9);
    rightEye.position.set(0.3, 0.2, 0.9);
    purin.add(leftEye);
    purin.add(rightEye);

    // Nariz
    const noseGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const noseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x8b4513,  // Color café
        shininess: 100
    });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, -0.1, 1.1);
    nose.scale.set(1, 0.8, 0.8);
    purin.add(nose);

    // Orejas de perro
    const earGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const earMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xf4d03f,  // Color dorado
        shininess: 100
    });
    
    // Oreja izquierda
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.7, 0.3, 0);
    leftEar.rotation.set(0, 0, -Math.PI / 6);
    leftEar.scale.set(1, 1.2, 0.8);
    purin.add(leftEar);
    
    // Oreja derecha
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.7, 0.3, 0);
    rightEar.rotation.set(0, 0, Math.PI / 6);
    rightEar.scale.set(1, 1.2, 0.8);
    purin.add(rightEar);

    // Sonrisa
    const smileGeometry = new THREE.TorusGeometry(0.2, 0.02, 16, 32, Math.PI);
    const smileMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.rotation.x = Math.PI / 2;
    smile.position.set(0, -0.3, 0.9);
    purin.add(smile);

    // Lengua
    const tongueGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const tongueMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff69b4,  // Color rosa
        shininess: 100
    });
    const tongue = new THREE.Mesh(tongueGeometry, tongueMaterial);
    tongue.position.set(0, -0.4, 0.9);
    tongue.scale.set(1, 0.5, 0.3);
    purin.add(tongue);

    return purin;
}

// Crear Pochacco
function createPochacco() {
    const pochacco = new THREE.Group();

    // Cabeza (ovalada)
    const headGeometry = new THREE.SphereGeometry(1, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.scale.set(1, 1.15, 1);
    head.position.set(0, 1.1, 0);
    pochacco.add(head);

    // Cuerpo (ovalado)
    const bodyGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1, 0.8, 1);
    body.position.set(0, 0.1, 0);
    pochacco.add(body);

    // Camiseta roja
    const shirtGeometry = new THREE.TorusGeometry(0.55, 0.18, 16, 100);
    const shirtMaterial = new THREE.MeshPhongMaterial({ color: 0xd72660, shininess: 100 });
    const shirt = new THREE.Mesh(shirtGeometry, shirtMaterial);
    shirt.rotation.x = Math.PI / 2;
    shirt.position.set(0, 0.25, 0);
    pochacco.add(shirt);

    // Orejas negras
    const earGeometry = new THREE.CylinderGeometry(0.11, 0.13, 0.9, 16);
    const earMaterial = new THREE.MeshPhongMaterial({ color: 0x222222, shininess: 100 });
    // Izquierda
    const leftEar = new THREE.Mesh(earGeometry, earMaterial);
    leftEar.position.set(-0.7, 1.7, 0);
    leftEar.rotation.z = Math.PI / 2.5;
    pochacco.add(leftEar);
    // Derecha
    const rightEar = new THREE.Mesh(earGeometry, earMaterial);
    rightEar.position.set(0.7, 1.7, 0);
    rightEar.rotation.z = -Math.PI / 2.5;
    pochacco.add(rightEar);

    // Ojos
    const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.23, 1.25, 0.93);
    rightEye.position.set(0.23, 1.25, 0.93);
    pochacco.add(leftEye);
    pochacco.add(rightEye);

    // Nariz
    const noseGeometry = new THREE.SphereGeometry(0.06, 16, 16);
    const noseMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.position.set(0, 1.13, 1.01);
    pochacco.add(nose);

    // Brazos
    const armGeometry = new THREE.CylinderGeometry(0.09, 0.09, 0.6, 16);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    // Izquierdo
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.6, 0.6, 0);
    leftArm.rotation.z = Math.PI / 3;
    pochacco.add(leftArm);
    // Derecho
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.6, 0.6, 0);
    rightArm.rotation.z = -Math.PI / 3;
    pochacco.add(rightArm);

    // Piernas
    const legGeometry = new THREE.CylinderGeometry(0.11, 0.13, 0.4, 16);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    // Izquierda
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.25, -0.5, 0);
    pochacco.add(leftLeg);
    // Derecha
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.25, -0.5, 0);
    pochacco.add(rightLeg);

    return pochacco;
}

// Crear los personajes y el fondo
const helloKitty = createHelloKitty();
const myMelody = createMyMelody();
const pompompurin = createPompompurin();
const pochacco = createPochacco();
const cosmicBackground = createCosmicBackground();

// Posicionar los personajes
helloKitty.position.set(-4, 0, 0);
myMelody.position.set(4, 0, 0);
pompompurin.position.set(-1.5, 0, 0);
pochacco.position.set(1.5, 0, 0);

// Añadir a la escena
scene.add(helloKitty);
scene.add(myMelody);
scene.add(pompompurin);
scene.add(pochacco);
scene.add(cosmicBackground);

// Añadir luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Posicionar la cámara
camera.position.z = 5;

// Añadir controles de órbita para navegación con el mouse
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.minDistance = 2;
controls.maxDistance = 20;

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Rotar los personajes
    helloKitty.rotation.y += 0.01;
    myMelody.rotation.y += 0.01;
    pompompurin.rotation.y += 0.01;
    pochacco.rotation.y += 0.01;

    // Hacer que los personajes se muevan arriba y abajo
    helloKitty.position.y = Math.sin(Date.now() * 0.001) * 0.2;
    myMelody.position.y = Math.sin(Date.now() * 0.001 + Math.PI) * 0.2;
    pompompurin.position.y = Math.sin(Date.now() * 0.001 + Math.PI/2) * 0.2;
    pochacco.position.y = Math.sin(Date.now() * 0.001 + Math.PI/2) * 0.2;

    // Animar el fondo cósmico
    cosmicBackground.rotation.y += 0.0005;
    cosmicBackground.rotation.x += 0.0002;

    // Hacer que los planetas se muevan
    cosmicBackground.children.forEach((child, index) => {
        if (index > 200) { // Los planetas están después de las estrellas
            child.rotation.y += 0.01;
            child.position.y = Math.sin(Date.now() * 0.001 + index) * 0.2;
        }
    });

    // Animar anillo de asteroides
    const asteroidRing = cosmicBackground.children.find(obj => obj.type === 'Group' && obj.children.length > 10);
    if (asteroidRing) {
        asteroidRing.rotation.z += 0.002;
    }

    // Animar cometas
    const cometGroup = cosmicBackground.children.find(obj => obj.type === 'Group' && obj.children.length <= 3);
    if (cometGroup) {
        cometGroup.children.forEach((comet, i) => {
            comet.position.x += (i === 0 ? 0.08 : -0.08);
            if (comet.position.x > 25) comet.position.x = -25;
            if (comet.position.x < -25) comet.position.x = 25;
        });
    }

    // Animar estrellas fugaces
    if (cosmicBackground.userData.shootingStars) {
        cosmicBackground.userData.shootingStars.forEach((star, i) => {
            star.position.x += 0.3 + i * 0.1;
            star.position.y -= 0.15 + i * 0.05;
            if (star.position.x > 25 || star.position.y < -20) {
                star.position.x = -25 + i * 20;
                star.position.y = 15 - i * 10;
            }
        });
    }

    // Animar satélite kawaii
    if (cosmicBackground.userData.satellite) {
        cosmicBackground.userData.satellite.rotation.y += 0.01;
        cosmicBackground.userData.satellite.position.x = Math.sin(Date.now() * 0.0007) * 7;
        cosmicBackground.userData.satellite.position.y = 7 + Math.cos(Date.now() * 0.0007) * 2;
    }

    controls.update();
    renderer.render(scene, camera);
}

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Iniciar la animación
animate(); 