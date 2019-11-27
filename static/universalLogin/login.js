// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

function selectUSSatellite() {
    unselectEuropeContainer();
    unselectAsiaContainer();

    document.getElementById('us-container').className = 'selected-container';
    document.getElementById('us-svg-path').classList.add('selected-image');
    document.getElementById('us-title').className = 'selected-title';
    document.getElementById('us-subtitle').className = 'selected-subtitle';
    document.getElementById('us-checkmark').classList.replace('checkmark', 'selected-checkmark');

    setIframeSource('https://us-central-1.tardigrade.io/login');
}

function selectAsiaSatellite() {
    unselectEuropeContainer();
    unselectUSContainer();

    document.getElementById('asia-container').className = 'selected-container';
    document.getElementById('asia-svg-path').classList.add('selected-image');
    document.getElementById('asia-title').className = 'selected-title';
    document.getElementById('asia-subtitle').className = 'selected-subtitle';
    document.getElementById('asia-checkmark').classList.replace('checkmark', 'selected-checkmark');

    setIframeSource('https://asia-east-1.tardigrade.io/login');
}

function selectEuropeSatellite() {
    unselectUSContainer();
    unselectAsiaContainer();

    document.getElementById('europe-container').className = 'selected-container';
    document.getElementById('europe-svg-path').classList.add('selected-image');
    document.getElementById('europe-title').className = 'selected-title';
    document.getElementById('europe-subtitle').className = 'selected-subtitle';
    document.getElementById('europe-checkmark').classList.replace('checkmark', 'selected-checkmark');


    setIframeSource('https://europe-west-1.tardigrade.io/login');
}

function unselectEuropeContainer() {
    document.getElementById('europe-container').className = 'satellite-container';
    document.getElementById('europe-svg-path').classList.replace('selected-image', 'europe-svg-path');
    document.getElementById('europe-title').className = 'satellite-name';
    document.getElementById('europe-subtitle').className = 'storj-logo-text';
    document.getElementById('europe-checkmark').classList.replace('selected-checkmark', 'checkmark');

}

function unselectAsiaContainer() {
    document.getElementById('asia-container').className = 'satellite-container';
    document.getElementById('asia-svg-path').classList.replace('selected-image', 'asia-svg-path');
    document.getElementById('asia-title').className = 'satellite-name';
    document.getElementById('asia-subtitle').className = 'storj-logo-text';
    document.getElementById('asia-checkmark').classList.replace('selected-checkmark', 'checkmark');
}

function unselectUSContainer() {
    document.getElementById('us-container').className = 'satellite-container';
    document.getElementById('us-svg-path').classList.replace('selected-image', 'us-svg-path');
    document.getElementById('us-title').className = 'satellite-name';
    document.getElementById('us-subtitle').className = 'storj-logo-text';
    document.getElementById('us-checkmark').classList.replace('selected-checkmark', 'checkmark');
}

function setIframeSource(url) {
    document.getElementById('iframe').src = url;
}
