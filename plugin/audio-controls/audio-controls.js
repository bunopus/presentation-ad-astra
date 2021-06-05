/**
 * A plugin that gives ability to control audio in slides
 *
 * @author bunopus
 */
let RevealAudioController = window.RevealAudioController || (function () {

    // Reveal.addEventListener('slidechanged', function (event) {
    //     _onEvent('slidechanged', event)
    // });
    Reveal.addEventListener('fragmentshown', function (event) {
        _onEvent('fragmentshown', event)
    });
    // Reveal.addEventListener('fragmenthidden', function (event) {
    //     _onEvent('fragmenthidden', event)
    // });


    function _onEvent(event_name, event) {
        let subject;
        switch (event_name) {
            case 'slidechanged':
                subject = event.currentSlide;
                break;
            case 'fragmentshown':
            case 'fragmenthidden':
                subject = event.fragment;
        }
        let attributes = subject.attributes;
        let action = attributes["data-audio-command"]?.value;
        let target = attributes["data-audio-target"]?.value;
        let target2 = attributes["data-audio-target-2"]?.value;
        switch (action) {
            case 'fade-out':
                fadeOut(target);
                break;
            case 'mix-two':
                mixTwo(target, target2);
                break;
        }

    }
})();

function fadeOut(target) {
    const audio = $(target)[0];
    _fadeOutCallback(audio);
}

function _fadeOutCallback(audio, delay = 100) {
    if (audio.volume > 0.1) {
        audio.volume -= 0.1;
        setTimeout(() => _fadeOutCallback(audio, delay), delay);
    } else {
        audio.pause()
        audio.volume = 1;
    }
}

function mixTwo(target, target2) {
    const audio1 = $(target)[0];
    const audio2 = $(target2)[0];
    audio2.play();
    _fadeOutCallback(audio1, 500);
}