# SurchargeLiveWebAR


Project to show Web AR game of Offline Dinosaur using AR.js and AFrame

# Install

`npm install`

# Run

`npx serve``

goto http://localhost:5000/steps/stepFinal/ and show the marker available in `/assets/pattern-offline.pdf

# Steps

This code is used for a talk, the steps show the differents steps played on stage

## Step 00

Just integrate Aframe and AR.JS

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>SurchargeWebAR</title>

    <script src="/node_modules/aframe/dist/aframe-v0.9.2.min.js"></script>
</head>
<body>
    <a-scene>
        <a-box position="0 0 0" rotation="0 0 0" color="#4CC3D9"></a-box>
    </a-scene>
</body>
</html>
```

## Step 01

Start playing with AR.js using it with hiro marker to show the box

Code to change in index.html
```html

<!-- In Header -->
<script src="/node_modules/ar.js/aframe/build/aframe-ar.js"></script>

<!-- In Body -->
<a-scene embedded arjs>
    <a-marker preset="hiro"
    arjs="debugUIEnabled: false; cameraParametersUrl: /node_modules/ar.js/data/data/camera_para.dat;" >
        <a-box id="boxModel" position="0 0 0" rotation="0 45 0" color="#4CC3D9"></a-box>
    </a-marker>

    <a-entity camera></a-entity>
</a-scene>
```

## Step 02

Using Dinosaur model instead of box

Code to change in index.html
```html
<a-assets>
    <a-asset-item id="dinoModel" src="/models/Dino.gltf"></a-asset-item>
</a-assets>
<a-marker preset="hiro"
arjs="debugUIEnabled: false; cameraParametersUrl: /node_modules/ar.js/data/data/camera_para.dat;" >
    <a-entity
        id="dino" gltf-model="#dinoModel"
        rotation="-90 0 0"></a-entity>
</a-marker>
```

## Step 03 

Start dynamise all these code

Change to index.html

```html
<script type="module" src="./main.js"></script>

<!-- And in entity dino -->
<a-entity
    id="dino" gltf-model="#dinoModel"
    animation__startmove="property: position; from: 0 0 0; to: 0 0 -2; startEvents: startmove; dur: 1000; loop: 1; dir:alternate; easing: linear";
    rotation="-90 0 0"></a-entity>
```

Add main.js

```javascript
(()=>{
    const dinoEl = document.querySelector('#dino');
    const dino = dinoEl.object3D;

    document.body.addEventListener('click',_ => {
        dinoEl.emit('startmove')
    })
})();
```


## Step 04

Now we add a single cactus that move in front of the dinosaur

Change to index.html

```html
<!-- Add the asset -->
<a-asset-item id="cactusModelA" src="/models/cactus_A.gltf"></a-asset-item>

<!-- And Entity -->
<a-entity
    class="cactus"
    id="cactus"
    gltf-model="#cactusModelA" 
    position="5 0 0"           
    rotation="-90 0 0"></a-entity>
```

Change to main.js

```javascript
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
```

## Step 05

Add lots of cactus


Change in index.html

```html

<!-- we add the missing models -->
<a-asset-item id="cactusModelB" src="/models/cactus_B.gltf"></a-asset-item>
<a-asset-item id="cactusModelC" src="/models/cactus_C.gltf"></a-asset-item>
<a-asset-item id="cactusModelD" src="/models/cactus_D.gltf"></a-asset-item>
<a-asset-item id="cactusModelE" src="/models/cactus_E.gltf"></a-asset-item>
<a-asset-item id="cactusModelF" src="/models/cactus_F.gltf"></a-asset-item>

<!-- We refactor and use templates to more clean -->
<template class="cactus_template">
    <a-entity
        class="cactus" gltf-model="#cactusModelA" 
        position="5 0 0"           
        rotation="-90 0 0"></a-entity>
</template>
<template class="cactus_template">
    <a-entity
        class="cactus" gltf-model="#cactusModelB" 
        position="5 0 0"           
        rotation="-90 0 0"></a-entity>
</template>  
<template class="cactus_template">
    <a-entity
        class="cactus" gltf-model="#cactusModelC" 
        position="5 0 0"           
        rotation="-90 0 0"></a-entity>
</template>
<template class="cactus_template">
    <a-entity
        class="cactus" gltf-model="#cactusModelD" 
        position="5 0 0"           
        rotation="-90 0 0"></a-entity>
</template>
<template class="cactus_template">
    <a-entity
        class="cactus" gltf-model="#cactusModelE" 
        position="5 0 0"           
        rotation="-90 0 0"></a-entity>
</template>
<template class="cactus_template">
    <a-entity
        class="cactus" gltf-model="#cactusModelF" 
        position="5 0 0"           
        rotation="-90 0 0"></a-entity>
</template> 
```

Change in main.js

```javascript

// Remove previous cactus code to use this one
const cactusTemplates = [...document.querySelectorAll('.cactus_template')];
let totalCacti = 0;

function initCactusMove() {
    totalCacti++;
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
    cactus.setAttribute('animation', 'property: position; to: -5 0 0; dur: 10000; loop:0; easing: linear;');
    
    // At the end of the movement, we remove it
    setTimeout(
        () => { 
            marker.removeChild(cactus);
        },
        10000,
    )
}

function initCacti() {
    initCactusMove();        
    setTimeout(initCacti, 2000 + (Math.random() * 2000));
}

document.body.addEventListener('click',_ => {
    dinoEl.emit('startmove')

    if (!animationStart){            
        initCacti();            
    }
    animationStart = true;
})
```

## Step 06

Add Collision Detection

Change in main.js

```javascript
// We activate the collision detection
let interval = setInterval(
    () => {
        // Potential collision
        if (!dead && cactus.object3D.position.x < 0.25 && cactus.object3D.position.x > -0.25) {
            // If dino isn't at lest at a height of 1.0, we say there is a collision                    
            if (dino.position.z > -1.0) {
                console.warn('Collision');
                dead = true;
            }                    
        }
    },
    100,
);

// At the end of the movement, we remove it
setTimeout(
    () => { 
        marker.removeChild(cactus);
        clearInterval(interval);
    },
    10000,
)

function initCacti() {
    initCactusMove();        
    if (!dead) {
        setTimeout(initCacti, 2000 + (Math.random() * 2000));
    }
}
```

## Step 07 

Change Marker, we will now use dino marker

Change in index.html

```html
<a-marker id="marker" preset="custom" type="pattern" url="/assets/pattern-offline.patt">
```

## Step 08

We will display the score

Change in index.html

```html
<!-- Add the score -->
<a-entity id="score" position="2 0 -2" rotation="-90 0 00"
    text="color: red; value: Score: 0; wrapCount: 10; font: exo2bold;">
</a-entity>

<!-- Add a new template --> 
<template id="gameover_template">
    <a-text class="gameover" position="1 2 -0.5" rotation="-90 0 00"
        color="red" value="Game over" wrap-count="30" font="exo2bold" >
    </a-text>
</template>
```

Change in main.js

```javascript

//In initCatucsMove
const score = document.querySelector('#score');
const thisCactus = totalCacti;

// In Interval of initCactusMove
marker.appendChild(document.importNode(document.querySelector('#gameover_template').content, true));
console.dir(marker.querySelector('.gameover').getAttribute("width"));

// In SetTimeout of initCactusMove
if (!dead) {
    score.setAttribute('text', `color: red; value: Score: ${thisCactus}; wrapCount: 10; font: exo2bold;`)
}
```
