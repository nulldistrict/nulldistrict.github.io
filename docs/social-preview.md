# Null District social preview

The user's original Mirror’s Edge screenshot was converted with ImageMagick.
No image generation, extra objects, borders or tape are used in this version.
The original 16:9 composition is preserved without cropping.

Asset: `assets/images/social/null-district-rooftops-dither.png`.
Dimensions: 1200 × 675. Size: 28,368 bytes.

Reproduce from the original screenshot:

```sh
magick mred.jpg -auto-orient -resize '1200x>' \
  -colorspace Gray -contrast-stretch '1%x1%' \
  -ordered-dither o8x8 -strip -define png:compression-level=9 \
  assets/images/social/null-district-rooftops-dither.png
```

The bilevel PNG preserves the dither pattern without JPEG artifacts. Hugo
publishes this asset directly for Open Graph and Twitter cards. Page bundle
covers take precedence over the site-wide fallback.
