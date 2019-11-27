// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

class Satellite {
    constructor(container, svg, title, subtitle, checkmark) {
        this.container = container;
        this.svg = svg;
        this.title = title;
        this.subtitle = subtitle;
        this.checkmark = checkmark;
    }
}

const usSatellite = new Satellite('us-container', 'us-svg-path', 'us-title', 'us-subtitle',
    'us-checkmark');
const asiaSatellite = new Satellite('asia-container', 'asia-svg-path', 'asia-title',
    'asia-subtitle', 'asia-checkmark');
const europeSatellite = new Satellite('europe-container', 'europe-svg-path', 'europe-title',
    'europe-subtitle', 'europe-checkmark');

function selectUSSatellite() {
    unselectSatellite(europeSatellite);
    unselectSatellite(asiaSatellite);

    selectSatellite(usSatellite);
    setIframeSource('https://us-central-1.tardigrade.io/login');
}

function selectAsiaSatellite() {
    unselectSatellite(europeSatellite);
    unselectSatellite(usSatellite);

    selectSatellite(asiaSatellite);
    setIframeSource('https://asia-east-1.tardigrade.io/login');
}

function selectEuropeSatellite() {
    unselectSatellite(usSatellite);
    unselectSatellite(asiaSatellite);

    selectSatellite(europeSatellite);
    setIframeSource('https://europe-west-1.tardigrade.io/login');
}

function selectSatellite(satellite) {
    document.getElementById(satellite.container).className = 'selected-container';
    document.getElementById(satellite.svg).classList.add('selected-image');
    document.getElementById(satellite.title).className = 'selected-title';
    document.getElementById(satellite.subtitle).className = 'selected-subtitle';
    document.getElementById(satellite.checkmark).classList.replace('checkmark', 'selected-checkmark');
}

function unselectSatellite(satellite) {
    document.getElementById(satellite.container).className = 'satellite-container';
    switch (satellite.svg) {
        case 'europe-svg-path':
            document.getElementById(satellite.svg).classList.replace('selected-image', 'europe-svg-path');
            break;
        case 'asia-svg-path':
            document.getElementById(satellite.svg).classList.replace('selected-image', 'asia-svg-path');
            break;
        default:
            document.getElementById(satellite.svg).classList.replace('selected-image', 'us-svg-path');
    }
    document.getElementById(satellite.title).className = 'satellite-name';
    document.getElementById(satellite.subtitle).className = 'storj-logo-text';
    document.getElementById(satellite.checkmark).classList.replace('selected-checkmark', 'checkmark');
}

function setIframeSource(url) {
    document.getElementById('iframe').src = url;
}
