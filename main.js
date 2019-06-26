'use strict';

(()=>{
    const dinoEl = document.querySelector('#dino');
    const dino = dinoEl.object3D;
    const cactusTemplates = [...document.querySelectorAll('.cactus_template')];

    let animationStart = false;
    let totalCacti = 0;
    let dead = false;

    function initCactusMove() {
        totalCacti++;
        const score = document.querySelector('#score');
        const thisCactus = totalCacti;

        // Let's choose a cactus to place
        const index = Math.floor(Math.random() * cactusTemplates.length);
        const cactusFragment = document.importNode(cactusTemplates[index].content, true);

        // Now we add it to marker
        const marker = document.querySelector('#marker');
        marker.appendChild(cactusFragment);

        // We need to get the true node, not the documentFragment
        const cactusArray = marker.querySelectorAll('.cactus');
        const cactus = cactusArray[cactusArray.length -1];

        // And we animate it
        cactus.setAttribute('animation', 'property: position; to: -2 0 0; dur: 8000; loop:0; easing: linear;');
        

        // We activate the collision detection
        let interval = setInterval(
            () => {
                // Potential collision
                if (!dead && cactus.object3D.position.x < 0.25 && cactus.object3D.position.x > -0.25) {
                    // If dino isn't at lest at a height of 1.0, we say there is a collision                    
                    if (dino.position.z > -1.0) {
                        console.warn('Collision');
                        dead = true;
                        marker.appendChild(document.importNode(document.querySelector('#gameover_template').content, true));
                        console.dir(marker.querySelector('.gameover').getAttribute("width"));
                    }                    
                }
            },
            100,
        );

        // At the end of the movement, we remove it
        setTimeout(
            () => { 
                if (!dead) {
                    score.setAttribute('text', `color: red; value: Score: ${thisCactus}; wrapCount: 10; font: exo2bold;`)
                }                
                marker.removeChild(cactus);
                clearInterval(interval);
            },
            8000,
        )
    }

    function initCacti() {
        initCactusMove();        
        if (!dead) {
            setTimeout(initCacti, 2000 + (Math.random() * 2000));
        }
        
    }
    
    document.body.addEventListener('click',_ => {
        dinoEl.emit('startmove')

        if (!animationStart){            
            initCacti();            
        }
        animationStart = true;
    })
})()

