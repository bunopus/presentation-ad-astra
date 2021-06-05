/**
 * A plugin which enables can run js code on specific
 * slide or fragment.
 *
 * @author bunopus
 */
let RevealScriptRunner = window.RevealScriptRunner || (function () {

    let runners = Reveal.getConfig().script_runner || {};
    Reveal.addEventListener('slidechanged', function (event) {
        _onEvent('slidechanged', event)
    });
    Reveal.addEventListener('fragmentshown', function (event) {
        _onEvent('fragmentshown', event)
    });
    Reveal.addEventListener('fragmenthidden', function (event) {
        _onEvent('fragmenthidden', event)
    });


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
        for (let i = 0; i < attributes.length; i++) {
            let attr = attributes[i].name;
            if (runners[attr] && runners[attr][event_name]) {
                let value = attributes[i].value;
                runners[attr][event_name](event, value);
            }
        }
    }
})();
