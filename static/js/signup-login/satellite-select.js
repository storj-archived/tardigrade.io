class Satellite {
    constructor(name, container, svg, title, subtitle, checkmark) {
        this.name = name;
        this.container = document.getElementById(container);
        this.svg = document.getElementById(svg);
        this.title = document.getElementById(title);
        this.subtitle = document.getElementById(subtitle);
        this.checkmark = document.getElementById(checkmark);
    }

    select() {
        if (this.isDefined()) {
            this.container.className = 'selected-container';
            this.svg.classList.add('selected-image');
            this.title.className = 'selected-title';
            this.subtitle.className = 'selected-subtitle';
            this.checkmark.classList.replace('checkmark', 'selected-checkmark');
        }
    }

    unselect() {
        if (this.isDefined()) {
            this.container.className = 'satellite-container';
            this.svg.classList.replace('selected-image', this.svg.id);
            this.title.className = 'satellite-name';
            this.subtitle.className = 'storj-logo-text';
            this.checkmark.classList.replace('selected-checkmark', 'checkmark');
        }
    }

    isDefined() {
        return this.container && this.svg && this.title && this.subtitle && this.checkmark;
    }
}

const usSatellite = new Satellite('us-central-1', 'us-container', 'us-svg-path', 'us-title', 'us-subtitle',
    'us-checkmark');
const asiaSatellite = new Satellite('asia-east-1', 'asia-container', 'asia-svg-path', 'asia-title',
    'asia-subtitle', 'asia-checkmark');
const europeSatellite = new Satellite('europe-west-1', 'europe-container', 'europe-svg-path', 'europe-title',
    'europe-subtitle', 'europe-checkmark');

function selectSatellite(name) {
    switch (name) {
        case asiaSatellite.name:
            europeSatellite.unselect();
            usSatellite.unselect();
            asiaSatellite.select();

            break;
        case europeSatellite.name:
            usSatellite.unselect();
            asiaSatellite.unselect();
            europeSatellite.select();

            break;
        default:
            europeSatellite.unselect();
            asiaSatellite.unselect();
            usSatellite.select();
    }

    if (isLoginPage()) {
        setProceedSource(`https:\/\/${name}.tardigrade.io/login`);

        return;
    }

    let signUpURL = `https:\/\/${name}.tardigrade.io/signup`;
    const searchParams = (new URL(document.location)).searchParams;
    const partner = searchParams.get('partner');
    if (partner) {
        signUpURL = signUpURL.concat('?partner=', partner);
    }

    setProceedSource(signUpURL);
}

function setProceedSource(url) {
    const button = document.getElementById('proceed-button');
    if (button) {
        button.href = url;
    }
}

function setButtonLabel() {
    const button = document.getElementById('proceed-button');
    if (button) {
        if (isLoginPage()) {
            button.innerText = 'Sign In';

            return;
        }

        button.innerText = 'Create an Account';
    }
}

function isLoginPage() {
    return window.location.pathname === '/login/';
}

window.onload = function() {
    selectSatellite(usSatellite.name);
    setButtonLabel()
}

document.getElementById("us-container").addEventListener("click", function() {
    selectSatellite(usSatellite.name)
});

document.getElementById("asia-container").addEventListener("click", function() {
    selectSatellite(asiaSatellite.name)
});

document.getElementById("europe-container").addEventListener("click", function() {
    selectSatellite(europeSatellite.name)
});