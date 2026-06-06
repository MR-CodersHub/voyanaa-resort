/**
 * Voyana Kodaikanal - 3D Background Hero Animation
 * Built with Three.js
 * Creates a premium, interactive 3D particle wave representing "Misty Valleys"
 * and floating golden particles representing glowing fireflies.
 */

(function () {
    'use strict';

    // Verify if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js is not loaded. 3D background animation disabled.');
        return;
    }

    // Configuration constants
    const SEPARATION = 42;      // Distance between wave points
    const AMOUNTX = 60;          // Number of wave points on X axis
    const AMOUNTY = 60;          // Number of wave points on Y axis
    const MIST_COUNT = 150;      // Number of floating mist/firefly particles

    let container, canvas;
    let camera, scene, renderer;

    // Wave particle system variables
    let wavePoints;
    let wavePositions;
    let waveCount = 0;

    // Floating mist particle system variables
    let mistPoints;
    let mistGeometry;
    let mistPositions;
    let mistVelocities;

    // Mouse parallax variables
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    // Initialize animation on page load
    function init() {
        container = document.querySelector('.hero');
        canvas = document.getElementById('hero-3d-canvas');

        if (!container || !canvas) return;

        // 1. Camera setup - perspective camera positioned slightly above looking down
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        camera.position.y = 350;

        scene = new THREE.Scene();

        // Helper: Create a high-quality soft circular glow texture dynamically
        function createGlowTexture(colorStr, size) {
            const textureCanvas = document.createElement('canvas');
            textureCanvas.width = size;
            textureCanvas.height = size;
            const context = textureCanvas.getContext('2d');

            const center = size / 2;
            const gradient = context.createRadialGradient(center, center, 0, center, center, center);
            gradient.addColorStop(0, colorStr);
            gradient.addColorStop(0.2, colorStr);
            gradient.addColorStop(0.5, colorStr.replace(/[\d.]+\)$/, '0.3)')); // Fade color
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            context.fillStyle = gradient;
            context.fillRect(0, 0, size, size);

            const texture = new THREE.Texture(textureCanvas);
            texture.needsUpdate = true;
            return texture;
        }

        // --- LAYER 1: Undulating Particle Wave (Sage Green / Mist White) ---
        const numParticles = AMOUNTX * AMOUNTY;
        wavePositions = new Float32Array(numParticles * 3);
        const waveScales = new Float32Array(numParticles);

        let i = 0, j = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                // Position particles in a flat 2D grid in XZ space
                wavePositions[i] = (ix * SEPARATION) - ((AMOUNTX * SEPARATION) / 2); // X position
                wavePositions[i + 1] = 0;                                           // Y position (will be animated)
                wavePositions[i + 2] = (iy * SEPARATION) - ((AMOUNTY * SEPARATION) / 2); // Z position

                waveScales[j] = 1;
                i += 3;
                j++;
            }
        }

        const waveGeometry = new THREE.BufferGeometry();
        waveGeometry.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3));
        waveGeometry.setAttribute('scale', new THREE.BufferAttribute(waveScales, 1));

        // Create a custom material using the soft circular glow texture
        // Color is a soft mix of sage green and ivory white
        const waveTexture = createGlowTexture('rgba(200, 220, 210, 1)', 64);
        const waveMaterial = new THREE.PointsMaterial({
            color: 0x8fa89b, // Sage green tint
            size: 8,
            map: waveTexture,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        wavePoints = new THREE.Points(waveGeometry, waveMaterial);
        scene.add(wavePoints);


        // --- LAYER 2: Floating Golden Fireflies / Mist ---
        mistGeometry = new THREE.BufferGeometry();
        mistPositions = new Float32Array(MIST_COUNT * 3);
        mistVelocities = [];

        for (let m = 0; m < MIST_COUNT; m++) {
            // Random positions scattered around the center in a 3D volume
            mistPositions[m * 3] = (Math.random() - 0.5) * 2000;      // X
            mistPositions[m * 3 + 1] = Math.random() * 500 - 100;     // Y (hovering above/around wave)
            mistPositions[m * 3 + 2] = (Math.random() - 0.5) * 2000;  // Z

            // Velocities: slow movement on all axes
            mistVelocities.push({
                x: (Math.random() - 0.5) * 0.3,
                y: (Math.random() - 0.5) * 0.15 + 0.1, // Slower upward bias
                z: (Math.random() - 0.5) * 0.3
            });
        }

        mistGeometry.setAttribute('position', new THREE.BufferAttribute(mistPositions, 3));

        // Warm gold particle texture
        const mistTexture = createGlowTexture('rgba(212, 175, 55, 1)', 64);
        const mistMaterial = new THREE.PointsMaterial({
            color: 0xd4af37, // Champagne gold tint
            size: 14,
            map: mistTexture,
            transparent: true,
            opacity: 0.65,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        mistPoints = new THREE.Points(mistGeometry, mistMaterial);
        scene.add(mistPoints);


        // --- RENDERER SETUP ---
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true // Keep background image visible
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
        renderer.setSize(container.clientWidth, container.clientHeight);

        // --- EVENT LISTENERS ---
        container.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);

        // Start animating
        animate();
    }

    // Mouse movement maps coordinates relative to center
    function onMouseMove(event) {
        // Track mouse coords relative to container center
        const rect = container.getBoundingClientRect();
        const clientX = event.clientX - rect.left;
        const clientY = event.clientY - rect.top;

        mouseX = clientX - (rect.width / 2);
        mouseY = clientY - (rect.height / 2);
    }

    // Handle viewport changes
    function onWindowResize() {
        if (!container || !camera || !renderer) return;

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    // Frame loops
    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        // 1. Update Camera position smoothly using mouse parallax (interpolation)
        // Moves camera in opposite direction of mouse for realistic 3D depth parallax
        targetX = -mouseX * 0.5;
        targetY = -mouseY * 0.35;

        camera.position.x += (targetX - camera.position.x) * 0.05;
        // Base elevation of 350px, shifting up/down based on mouse
        camera.position.y += ((350 + targetY) - camera.position.y) * 0.05;
        
        // Slightly rotate camera toward the center
        camera.lookAt(scene.position);

        // 2. Animate Undulating Wave (Layer 1)
        const positions = wavePoints.geometry.attributes.position.array;
        let index = 0;

        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                // Calculate height using overlapping sine waves to create organic landscape ripples
                const heightVal1 = Math.sin((ix + waveCount) * 0.15) * 50;
                const heightVal2 = Math.cos((iy + waveCount) * 0.12) * 50;
                const heightVal3 = Math.sin((ix + iy + waveCount * 0.5) * 0.08) * 20;

                positions[index + 1] = heightVal1 + heightVal2 + heightVal3;
                index += 3;
            }
        }

        wavePoints.geometry.attributes.position.needsUpdate = true;
        waveCount += 0.035; // Speed of the wave ripples

        // 3. Animate Floating Golden Fireflies (Layer 2)
        const mPositions = mistPoints.geometry.attributes.position.array;

        for (let m = 0; m < MIST_COUNT; m++) {
            const idx = m * 3;
            
            // Apply velocities
            mPositions[idx] += mistVelocities[m].x;
            mPositions[idx + 1] += mistVelocities[m].y;
            mPositions[idx + 2] += mistVelocities[m].z;

            // Boundaries reset: if floating too far, wrap or reset them
            if (mPositions[idx + 1] > 400) {
                // Reset to bottom
                mPositions[idx + 1] = -100;
                mPositions[idx] = (Math.random() - 0.5) * 2000;
                mPositions[idx + 2] = (Math.random() - 0.5) * 2000;
            }
            if (Math.abs(mPositions[idx]) > 1200) {
                mPositions[idx] = -mPositions[idx];
            }
            if (Math.abs(mPositions[idx + 2]) > 1200) {
                mPositions[idx + 2] = -mPositions[idx + 2];
            }
        }

        mistPoints.geometry.attributes.position.needsUpdate = true;

        // Slow rotation to the systems for added complexity
        wavePoints.rotation.y = waveCount * 0.04;
        mistPoints.rotation.y = -waveCount * 0.02;

        // Render
        renderer.render(scene, camera);
    }

    // Try-catch initialization to ensure solid resilience
    try {
        // Initialize once DOM is ready (or if already loaded, execute immediately)
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            init();
        } else {
            document.addEventListener('DOMContentLoaded', init);
        }
    } catch (e) {
        console.error('Failed to initialize 3D background animation:', e);
    }

})();
