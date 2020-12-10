function hasConsented() {
    var name = "tardigrade_cookie_consent=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return true;
        }
    }
    return false;
}

function checkConsent(){
    if (hasConsented()) {
        closeBanner()
    }
}

function closeBanner(){
    document.cookie = "tardigrade_cookie_consent=true;"
    var consentBanner = document.getElementById("consent-banner");
    consentBanner.classList.remove("d-flex");
    consentBanner.style.display = "none";
}

window.onload = function() {
    checkConsent();

    document.getElementById('consent-banner-close').onclick = () => closeBanner()
}
