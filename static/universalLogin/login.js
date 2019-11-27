// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

class Satellite {
    constructor(container, svg, title, subtitle, checkmark) {
        this.container = document.getElementById(container);
        this.svg = document.getElementById(svg);
        this.title = document.getElementById(title);
        this.subtitle = document.getElementById(subtitle);
        this.checkmark = document.getElementById(checkmark);
    }

    selectSatellite() {
        this.container.className = 'selected-container';
        this.svg.classList.add('selected-image');
        this.title.className = 'selected-title';
        this.subtitle.className = 'selected-subtitle';
        this.checkmark.classList.replace('checkmark', 'selected-checkmark');
    }

    unselectSatellite() {
        this.container.className = 'satellite-container';
        this.svg.classList.replace('selected-image', this.svg.id);
        this.title.className = 'satellite-name';
        this.subtitle.className = 'storj-logo-text';
        this.checkmark.classList.replace('selected-checkmark', 'checkmark');
    }
}

const usSatellite = new Satellite('us-container', 'us-svg-path', 'us-title', 'us-subtitle',
    'us-checkmark');
const asiaSatellite = new Satellite('asia-container', 'asia-svg-path', 'asia-title',
    'asia-subtitle', 'asia-checkmark');
const europeSatellite = new Satellite('europe-container', 'europe-svg-path', 'europe-title',
    'europe-subtitle', 'europe-checkmark');

function selectUSSatellite() {
    europeSatellite.unselectSatellite();
    asiaSatellite.unselectSatellite();

    usSatellite.selectSatellite();
    setIframeSource('https://us-central-1.tardigrade.io/login');
}

function selectAsiaSatellite() {
    europeSatellite.unselectSatellite();
    usSatellite.unselectSatellite();

    asiaSatellite.selectSatellite();
    setIframeSource('https://asia-east-1.tardigrade.io/login');
}

function selectEuropeSatellite() {
    usSatellite.unselectSatellite();
    asiaSatellite.unselectSatellite();

    europeSatellite.selectSatellite();
    setIframeSource('https://europe-west-1.tardigrade.io/login');
}

function setIframeSource(url) {
    document.getElementById('iframe').src = url;
}
