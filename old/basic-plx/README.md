# Basic Parallax Banner

A hero banner component with vertical parallax effect on background image.

[See live demo](http://ui.maurojflores.com/ui-components/basic-plx/basic-plx.html)

## Minimal Usage
Use an image with greater height-width proportion than the parallax element wrapper.

**HTML**
```html
<div class="hero-banner--plx">
    <div class="plx-background">
        <img src="/path/to/image" class="plx-background-img">
    </div>
</div>
```

**CSS**
```css
.hero-banner--plx {
  position: relative;
  overflow: hidden;
}

.plx-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.plx-background-img {
    width: 100%;
}
```

**JavaScript**
```javascript
const plxBanner = new BasicPlxBanner({
    bannerSelector: '.hero-banner--plx', // query selector for element wrapper
    backgroundSelector: '.plx-background', // query selector for element wrapping background img
    backgroundImageSelector: '.plx-background-img', // query selector for background img
    scrollRatio: -0.2 // defaults to 0.1; for best results use non-zero number between -0.25 and 0.25
});
```
