'use strict';

(()=>{
    const dinoEl = document.querySelector('#dino');
    const dino = dinoEl.object3D;
    const cactusArray = [...document.querySelectorAll('.cactus')];

    cactusArray.forEach((cactusElt, idx) => {
        cactusElt.object3D.rotation.set(THREE.Math.degToRad(180), 0, 0);
        cactusElt.object3D.position.set(10, 0.5, -0.25);
        cactusElt.setAttribute('scale', '0.01 0.01 0.01');
    })
    dino.rotation.set(THREE.Math.degToRad(180), 0, 0);

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
            2000 + (Math.random() * 500)
        );
    }
    
    document.body.addEventListener('click',_ => {
        dinoEl.emit('startmove')

        if (!animationStart){            
            initCactusMove();
        }
    })
})()

