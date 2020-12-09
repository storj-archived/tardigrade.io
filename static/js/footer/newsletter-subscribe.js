window.onload = function() {
    var button = document.getElementById("mc-embedded-subscribe-footer")

    button.onclick = function (event) {
        event.preventDefault()

        var inputValue = document.getElementById("mce-EMAIL-newsletter").value.toLowerCase().trim()
        var errElm = document.getElementById("mce-error-response-newsletter");
        var succElm = document.getElementById("mce-success-response-newsletter");

        if (!inputValue || inputValue.length < 0 || !inputValue.includes("@")) {
            if(succElm) {
                succElm.setAttribute("style", "display:none;");
            }
            if(errElm) {
                errElm.setAttribute("style", "display:flex;");
            }
        } else {
            analytics.identify(inputValue, {email: inputValue, storj_newsletter: true}, {}, function() {
                analytics.track("storj_newsletter", {});
                if(errElm) {
                    errElm.setAttribute("style", "display:none;");
                }
                if(succElm) {
                    succElm.setAttribute("style", "display:flex;");
                }
            });
        }
    }
}
