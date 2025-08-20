// MultipleFiles/script.js

document.addEventListener('DOMContentLoaded', () => {
    const planetRadios = document.querySelectorAll('input[name="planet"]');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const planetSounds = {};
    let currentSource = null;

    // Preload sounds
    const loadSound = async (planetName, url) => {
        try {
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            planetSounds[planetName] = audioBuffer;
            console.log(`Sound for ${planetName} loaded.`);
        } catch (error) {
            console.error(`Error loading sound for ${planetName}:`, error);
        }
    };

    // Load sounds for each planet
    loadSound('mercury', 'Mercury.mp3');
    loadSound('venus', 'Venus1.mp3');
    loadSound('earth', 'Earth.mp3');
    loadSound('mars', 'Mars.mp3');
    loadSound('jupiter', 'Jupiter.mp3');
    loadSound('saturn', 'Saturn.mp3');
    loadSound('uranus', 'Uranus.mp3');
    loadSound('neptune', 'Neptune1.mp3');
    loadSound('pluto', 'Pluto.mp3');

    // Function to play a sound, stopping previous sound if needed
    const playSound = (planetName) => {
        if (currentSource) {
            try {
                currentSource.stop();
            } catch (e) {
                // Already stopped
            }
            currentSource.disconnect();
            currentSource = null;
        }
        const audioBuffer = planetSounds[planetName];
        if (audioBuffer) {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start(0);
            currentSource = source;
            console.log(`Playing sound for ${planetName}`);
        } else {
            console.warn(`Sound for ${planetName} not loaded or found.`);
        }
    };

    // Add event listeners to planet radio buttons
    planetRadios.forEach(radio => {
        radio.addEventListener('change', (event) => {
            if (event.target.checked) {
                const planetId = event.target.id; // e.g., 'mercury', 'venus'
                playSound(planetId);
            }
        });
    });

    // Initial check for the already checked planet on page load
    const initiallyCheckedPlanet = document.querySelector('input[name="planet"]:checked');
    if (initiallyCheckedPlanet) {
        playSound(initiallyCheckedPlanet.id);
    }
});
