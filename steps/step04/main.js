(()=>{
    const dinoEl = document.querySelector('#dino');
    const dino = dinoEl.object3D;
    let animationStart = false;

    
    function initCactusMove() {
        const cactus = document.querySelector('#cactus');
        // And we animate it
        cactus.setAttribute('animation', 'property: position; to: -5 0 0; dur: 10000; loop:true; easing: linear;');
    }


    document.body.addEventListener('click',_ => {
        dinoEl.emit('startmove');
        if (!animationStart){            
            initCactusMove();            
        }
        animationStart = true;
    })
})();