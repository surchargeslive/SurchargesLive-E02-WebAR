'use strict';

//import * from './web_modules/aframe';

(()=>{
    const dinoEl = document.querySelector('#dino');
    const dino = dinoEl.object3D;
    const cactusAElt = document.querySelector('#cactusA');
    const cactusA = document.querySelector('#cactusA').object3D;
    const cactusBElt = document.querySelector('#cactusB');
    const cactusB = document.querySelector('#cactusB').object3D;
    const cactusCElt = document.querySelector('#cactusC')
    const cactusC = document.querySelector('#cactusC').object3D;
    const cactusDElt = document.querySelector('#cactusD')
    const cactusD = document.querySelector('#cactusD').object3D;
    const cactusEElt = document.querySelector('#cactusE')
    const cactusE = document.querySelector('#cactusE').object3D;
    const cactusFElt = document.querySelector('#cactusF')
    const cactusF = document.querySelector('#cactusF').object3D;

    //dino.position.set(1,-1,0);
    //dino.rotation.set(-90, -120, 30);
    dino.rotation.set(-90, 0, 0);
    cactusA.rotation.set(-90, 0, 0);
    cactusB.rotation.set(-90, 0, 0);
    cactusC.rotation.set(-90, 0, 0);
    cactusD.rotation.set(-90, 0, 0);
    cactusE.rotation.set(-90, 0, 0);
    cactusF.rotation.set(-90, 0, 0);
    cactusA.position.set(1, 0, 0);
    cactusB.position.set(2, 0, 0);
    cactusC.position.set(3, 0, 0);
    cactusD.position.set(4, 0, 0);
    cactusE.position.set(5, 0, 0);
    cactusF.position.set(6, 0, 0);

    let animationStart = false;


    document.body.addEventListener('click',_ => {
        console.log('Click On scene')
        dinoEl.emit('startmove')
        dinoEl.emit('endmove')

        if (!animationStart){
            cactusAElt.emit('startmove')
            cactusBElt.emit('startmove')
            cactusCElt.emit('startmove')
            cactusDElt.emit('startmove')
            cactusEElt.emit('startmove')
            cactusFElt.emit('startmove')
            animationStart = true;
        }

        /*AFRAME.ANIME({
            targets: dinoEl,
            translateX: 250,
            //rotate: '1turn',
            //backgroundColor: '#FFF',
            duration: 500
          });*/
    })
})()

