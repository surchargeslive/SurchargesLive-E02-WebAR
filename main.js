'use strict';

(()=>{
    const dinoEl = document.querySelector('#dino');
    const dino = dinoEl.object3D;
    const cactusArray = [...document.querySelectorAll('.cactus')];

    cactusArray.forEach((cactusElt, idx) => {
        cactusElt.object3D.rotation.set(-90, 0, 0);
        cactusElt.object3D.position.set(1, 0, 0);
        cactusElt.setAttribute('scale', '0.01 0.01 0.01');
    })
    dino.rotation.set(-90, 0, 0);

    let animationStart = false;


    document.body.addEventListener('click',_ => {
        dinoEl.emit('startmove')

        if (!animationStart){
            let arrayCactusTmp = [...cactusArray];
            let compt = 0;
            while(arrayCactusTmp.length){
                const index = Math.floor(Math.random() * arrayCactusTmp.length);
                const cactusElt = arrayCactusTmp[index];
                arrayCactusTmp.splice(index, 1);
                compt++;
                setTimeout((cactusEltTmp)=>{
                    cactusEltTmp.setAttribute('animation', 'property: position; from: 1 0 0; to: -10 1 0; dur: 6000; loop:true');
                }, compt * 2000 + (Math.random() * 500), cactusElt)
            }

            animationStart = true;
        }
    })
})()

