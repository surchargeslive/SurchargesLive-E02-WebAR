'use strict';

(()=>{
    const dinoEl = document.querySelector('#dino');
    const dino = dinoEl.object3D;
    const cactusArray = [...document.querySelectorAll('.cactus')];

    let animationStart = false;
    let dead = false;

    function initCactusMove() {
        setTimeout(
            () => {
                if (dead) {
                    return;
                }        
                const index = Math.floor(Math.random() * cactusArray.length);
                const cactusElt = cactusArray[index];
                cactusElt.setAttribute('animation', 'property: position; from: 5 0.25 -0.25; to: -5 0.25 -0.25; dur: 6000; loop:true');
                initCactusMove();
            }, 
            2000 + (Math.random() * 500),
        );
    }

    function initCollectionDetection() {
        setInterval(
            () => {
                // The dino height is based on the dino object z position, but in negative
                if ( -dino.position.z < 0.5) {
                    // Collision potentielle
                    cactusArray.forEach((cactus) => {
                        if (Math.abs(cactus.object3D.position.x) < 0.5) {
                            console.warn(`Collision!`); 
                        }
                    });
                    
                }
                
                /*
                
                */
            
            },
            100,
        )
    }
    
    document.body.addEventListener('click',_ => {
        dinoEl.emit('startmove')

        if (!animationStart){            
            initCactusMove();
            initCollectionDetection();
        }
        animationStart = true;
    })
})()

