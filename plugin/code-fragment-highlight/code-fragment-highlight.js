

/**
 * Highlight code fragments by graying out other chunks of code
 * NOTE: other chunks of code must be wrapped in <span> as well
 * Example:
 * <code>
 *     <span>let a = 'text';</span>
 *     <span class='fragment code-highlight'>
 *         a += 'it works!'
 *     </span>
 *     <span class='fragment code-highlight'>
 *         a += 'YAY!!'
 *     </span>
 * </code>
 *
 * @author https://github.com/bunopus
 */
(function() {
    const config = Reveal.getConfig().codeHighlight;
    const highlightClass = (config && config.highlightClass)? config.highlightClass :'code-highlight';
    const grayedClass = (config && config.grayedClass)? config.grayedClass :'grayed';

    let $head = $("head");
    let $headlinklast = $head.find("link[rel='stylesheet']:last");
    // TODO looks bad, refactor
    const style = "<style type=\"text/css\">" +
        `.reveal .slides section .fragment.${highlightClass} {visibility: visible; opacity: 1}` +
        `.reveal .slides section code.${grayedClass} > span:not(.current-fragment) {opacity: 0.1}`;
        "</style>";
    if ($headlinklast.length){
        $headlinklast.after(style);
    }
    else {
        $head.append(style);
    }

    // TODO remove duplication
    Reveal.addEventListener( 'fragmentshown', function( event ) {
        let fragment = event.fragment;
        if(fragment.classList.contains(highlightClass) && fragment.classList.contains('visible')) {
            $(fragment).closest('code').addClass(grayedClass);
        }
    } );
    Reveal.addEventListener( 'fragmenthidden', function( event ) {
        let fragment = event.fragment;
        if(fragment.classList.contains(highlightClass)) {
            $(fragment).closest('code').removeClass(grayedClass);
        }
    } );
})();
