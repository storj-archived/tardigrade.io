window.onload = function() {
    var heroCta = document.getElementById("hero_cta")
    heroCta.onclick = function (event) {
        event.preventDefault()

        analytics.track('Hero CTA Clicked', {
            'CTA Button': 'See How it Works'
        });

        window.location.href = event.target.href
    }
}
