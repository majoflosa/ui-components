# Carousel Gallery

An example of a gallery of items which slides horizontally to display more items; controlled with bullet-style links.

[See live demo](http://ui.maurojflores.com/ui-components/carousel-gallery/carousel-gallery.html)

Note: the `carousel-gallery.js` file depends on **[TweenMax.min.js](https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js)** ([GSAP website](https://greensock.com/))

## Basic Usage
**HTML**
```html
<div class="carousel-list-outer">
    <div class="carousel-list">
        <article class="carousel-item">
            <h3>Element 1</h3>
            <p>Lorem ipsum dolor sit amet</p>
        </article>
        <article class="carousel-item">
            <h3>Element 2</h3>
            <p>Proin molestie velit vel est</p>
        </article>
        <article class="carousel-item">
            <h3>Element 3</h3>
            <p>Ut nisi mi, faucibus eget eros</p>
        </article>
        <article class="carousel-item">
            <h3>Element 4</h3>
            <p>Lorem ipsum dolor sit amet</p>
        </article>
        <article class="carousel-item">
            <h3>Element 5</h3>
            <p>Proin molestie velit vel est molestie</p>
        </article>
    </div><!-- end article list -->

    <div class="carousel-bullets">
        <span class="carousel-bullet selected-bullet"></span>
    </div>
</div><!-- end article list outer-->
```

**CSS**
```css
.carousel-list-outer {
  overflow: hidden;
  position: relative;
  max-width: 100%;
}
.carousel-list-outer .carousel-bullets {
  text-align: center;
  /* Adjust bullet list separation to preference */
  margin: 15px auto 0;
}
.carousel-list-outer .carousel-bullets .carousel-bullet {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 99px;
  /* adjust bullet appearance to preference */
  background: #dddddd;
  width: 10px;
  height: 10px;
  margin: 0 6px;
}
.carousel-list-outer .carousel-bullets .carousel-bullet.selected-bullet {
  /* adjust selected bullet appearance to preference */
  background: #888888;
  width: 13px;
  height: 13px;
}

.carousel-list {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: nowrap;
}

.carousel-item {
  box-sizing: border-box;
  /* adjust carousel item appearance to preference */
  padding: 15px;
  background: #f5f5f5;
  margin: 1%;
  flex: 0 0 31%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

**JavaScript**
```javascript
const articlesCarousel = new CarouselGallery({
    outerWrapperSelector: '.carousel-list-outer',
    innerWrapperSelector: '.carousel-list',
    itemSelector: '.carousel-item',
    bulletSelector: '.carousel-bullet', // defaults to '.carousel-bullet'
    selectedBulletClass: 'selected-bullet', // defaults to 'selected-bullet'
    animationDuration: 0.5 // seconds; defaults to 0.5
});
```
