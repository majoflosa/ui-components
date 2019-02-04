# Multiple Parallax Sections

An example of a page with more than one section with parallax effect. 

This example combines sections with parallax effect and sections with `background-attachment: fixed`.
[See live demo](http://ui.maurojflores.com/ui-components/multiple-plx/multiple-plx.html)

## Basic Usage
**HTML**
```html
<div id="banner-1">
    <div class="plx-background">
        <img src="/path/to/image" class="plx-background-img">
    </div>
</div>
<div id="banner-2">
    <div class="plx-background">
        <img src="/path/to/image" class="plx-background-img">
    </div>
</div>
```

**CSS**
```css
#banner-1, #banner-2 {
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
const plxBanner = new MultiplePlxBanner({
    bannerSelector: '#banner-1', 
    backgroundSelector: '.plx-background', 
    backgroundImageSelector: '.plx-background-img',
    scrollRatio: -0.15 // 0.15 is the default value
});

const plxBanner2 = new MultiplePlxBanner({
    bannerSelector: '#banner-2', 
    backgroundSelector: '.plx-background', 
    backgroundImageSelector: '.plx-background-img', 
    scrollRatio: -0.15
});
```
