
/**
 * Blur background if section marked as data-background-blur
 *
 * @author https://github.com/bunopus
 */
(function () {
    Reveal.addEventListener('slidechanged', function (slide) {
        if (slide.currentSlide.hasAttribute('data-background-blur')) {
            setTimeout(() => {
                let bg_image = slide.currentSlide.getAttribute('data-background-image');
                let background = $(`.reveal div.backgrounds .present:visible:not(.stack)[data-background-hash*='${bg_image}']`);
                background.css({ filter: `blur(20px) opacity(30%)` });
            }, 100);
        }
    }, false);
})();
