# Layered Parallax Banner

A banner section with 2 or more layers of elements with parallax effect. Each layer can be given its own scroll-speed ratio.

[See live demo](http://ui.maurojflores.com/ui-components/layered-plx/layered-plx.html)

## Usage Example
**HTML**
```html
<div class="layered-plx">
    <!-- optional parallax background image -->
    <div class="plx-background">
        <img class="plx-background-img" src="/path/to/image">
    </div>

    <div class="plx-layer plx-layer-1"><h1>Layer 1</h1></div>
    <div class="plx-layer plx-layer-2"><h1>Layer 2</h1></div>
    <div class="plx-layer plx-layer-3"><h1>Layer 3</h1></div>
</div>
```

**CSS**
```css
.layered-plx {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 500px;
}

.plx-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.plx-layer {
  position: absolute;
}

/* Adjust these styles for your own layers' design */
.plx-layer-1 {
  right: 30px;
  background: #dddddd;
  padding: 10px 0;
  width: 20%;
  text-align: center;
}

.plx-layer-2 {
  right: 200px;
  background: grey;
  padding: 30px 0;
  width: 33%;
  text-align: center;
  color: #ffffff;
}

.plx-layer-3 {
  right: 40%;
  background: #333333;
  padding: 50px 0;
  width: 50%;
  text-align: center;
  color: #ffffff;
}
```

**JavaScript**
```javascript
const layeredPlxBanner = new LayeredPlxBanner({
    bannerSelector: '.layered-plx', // query selector for wrapping element of parallax banner
    plxBackgroundSelector: '.plx-background', // query selector for element containing background image; optional
    plxBackgroundImgSelector: '.plx-background-img', // query selector for background image; optional
    plxBackgroundScrollRatio: 0.15, // proportional shift of background image to scroll amount; defaults to 0.15
    layerSelector: '.plx-layer', // query selector for other parallax layers
    layerOptions: [ 
        // options for each layer; adjust according to desired layer initial position and parallax speed
        { initialTop: 600, scrollRatio: 0.5 }, // layer 1; default values
        { initialTop: 800, scrollRatio: 0.95 }, // layer 2
        { initialTop: 1100, scrollRatio: 1.5 } // layer 3
    ]
});
```
