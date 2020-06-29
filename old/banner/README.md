# Hero Banner

Markup and styles for a simple hero banner section to use on splash pages or prominent sections. The styles support some variations:

* **Full screen height:** make the banner match the height of the viewport by adding a `full-screen` class on the `hero-banner` `div`. Remove the `full-screen` class to make it default height, or customizable with padding.
* **Background overlay on banner content:** add a surrounding background on the banner's inner content by adding a `content-background-overlay` class on the `hero-banner__content` `div`.
* **Overlay on main background image:** add or remove the `no-overlay` class on the `hero-banner` to enable or disable a transparent layer over the main background image/color.

[See live demo](http://ui.maurojflores.com/ui-components/banner/banner.html)

## Usage Examples
**HTML - Full Screen height**
```html
<div class="hero-banner full-screen no-overlay">
    <!-- Optional color overlay over background image; hide with no-overlay class -->
    <div class="background-overlay"></div>

    <!-- Inner content; add/remove content-background-overlay class -->
    <div class="hero-banner__content content-background-overlay">
        <h1 class="hero-banner__title">Full Screen Hero Banner</h1>
        <h3 class="hero-banner__subtitle">The banner covers the full height of the screen</h3>
        <a href="#" class="hero-banner__cta">Call to Action</a>
    </div>
</div>
```

**HTML - Default height**
```html
<div class="hero-banner">
    <!-- Optional color overlay over background image; hide with no-overlay class -->
    <div class="background-overlay"></div>

    <!-- Inner content with no background -->
    <div class="hero-banner__content">
        <h1 class="hero-banner__title">Hero Banner</h1>
        <h3 class="hero-banner__subtitle">Remove the "content-background-overlay" class to remove inner box. Remove the "no-overlay" class on the wrapping banner to enable an overlay over the full image</h3>
        <a href="#" class="hero-banner__cta">Call to Action</a>
    </div>
</div>
```

**CSS**
```css
.hero-banner {
  position: relative;
  background-image: url('/path/to/image');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* adjust min-height to preference */
  min-height: 500px;
}
.hero-banner.no-overlay .background-overlay {
  display: none;
}
.hero-banner.full-screen {
  height: 100vh;
  overflow: hidden;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* adjust overlay color to preference */
  background-color: rgba(0, 0, 0, 0.5);
}

.hero-banner__content {
  position: relative;
  text-align: center;
  margin: 0 auto;
  /* adjust width and text color to preference */
  max-width: 600px;
  color: #ffffff;
}
.hero-banner__content.content-background-overlay {
  box-sizing: border-box;
  /* adjust padding and overlay color to preference */
  padding: 4em 6em;
  background: rgba(0, 0, 0, 0.6);
}
```