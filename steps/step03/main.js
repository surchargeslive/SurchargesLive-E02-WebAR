(()=>{
    const dinoEl = document.querySelector('#dino');
    const dino = dinoEl.object3D;
    let animationStart = false;

    document.body.addEventListener('click',_ => {
        dinoEl.emit('startmove')
        animationStart = true;
    })
})();