// Copyright (C) 2019 Storj Labs, Inc.
// See LICENSE for copying information.

function setIframeSource(url) {
    document.getElementById('iframe').src = url;
}

function selectUSSatellite() {
    document.getElementById('europe-container').classList.remove('selected-container');
    document.getElementById('europe-container').classList.add('satellite-container');
    document.getElementById('europe-svg-path').classList.remove('selected-image');
    document.getElementById('europe-title').classList.remove('selected-title');
    document.getElementById('europe-subtitle').classList.remove('selected-subtitle');
    document.getElementById('europe-checkmark').classList.remove('selected-checkmark');
    document.getElementById('europe-checkmark').classList.add('checkmark');

    document.getElementById('asia-container').classList.remove('selected-container');
    document.getElementById('asia-container').classList.add('satellite-container');
    document.getElementById('asia-svg-path').classList.remove('selected-image');
    document.getElementById('asia-title').classList.remove('selected-title');
    document.getElementById('asia-subtitle').classList.remove('selected-subtitle');
    document.getElementById('asia-checkmark').classList.remove('selected-checkmark');
    document.getElementById('asia-checkmark').classList.add('checkmark');

    document.getElementById('us-container').classList.remove('satellite-container');
    document.getElementById('us-container').classList.add('selected-container');
    document.getElementById('us-svg-path').classList.add('selected-image');
    document.getElementById('us-title').classList.add('selected-title');
    document.getElementById('us-subtitle').classList.add('selected-subtitle');
    document.getElementById('us-checkmark').classList.remove('checkmark');
    document.getElementById('us-checkmark').classList.add('selected-checkmark');

    setIframeSource('http://localhost:10002/login');
}

function selectAsiaSatellite() {
    document.getElementById('europe-container').classList.remove('selected-container');
    document.getElementById('europe-container').classList.add('satellite-container');
    document.getElementById('europe-svg-path').classList.remove('selected-image');
    document.getElementById('europe-title').classList.remove('selected-title');
    document.getElementById('europe-subtitle').classList.remove('selected-subtitle');
    document.getElementById('europe-checkmark').classList.remove('selected-checkmark');
    document.getElementById('europe-checkmark').classList.add('checkmark');

    document.getElementById('us-container').classList.remove('selected-container');
    document.getElementById('us-container').classList.add('satellite-container');
    document.getElementById('us-svg-path').classList.remove('selected-image');
    document.getElementById('us-svg-path').classList.add('us-svg-path');
    document.getElementById('us-title').classList.remove('selected-title');
    document.getElementById('us-title').classList.add('satellite-name');
    document.getElementById('us-subtitle').classList.remove('selected-subtitle');
    document.getElementById('us-subtitle').classList.add('storj-logo-text');
    document.getElementById('us-checkmark').classList.remove('selected-checkmark');
    document.getElementById('us-checkmark').classList.add('checkmark');

    document.getElementById('asia-container').classList.remove('satellite-container');
    document.getElementById('asia-container').classList.add('selected-container');
    document.getElementById('asia-svg-path').classList.add('selected-image');
    document.getElementById('asia-title').classList.add('selected-title');
    document.getElementById('asia-subtitle').classList.add('selected-subtitle');
    document.getElementById('asia-checkmark').classList.remove('checkmark');
    document.getElementById('asia-checkmark').classList.add('selected-checkmark');

    setIframeSource('http://localhost:10012/login');
}

function selectEuropeSatellite() {
    document.getElementById('us-container').classList.remove('selected-container');
    document.getElementById('us-container').classList.add('satellite-container');
    document.getElementById('us-svg-path').classList.remove('selected-image');
    document.getElementById('us-svg-path').classList.add('us-svg-path');
    document.getElementById('us-title').classList.remove('selected-title');
    document.getElementById('us-title').classList.add('satellite-name');
    document.getElementById('us-subtitle').classList.remove('selected-subtitle');
    document.getElementById('us-subtitle').classList.add('storj-logo-text');
    document.getElementById('us-checkmark').classList.remove('selected-checkmark');
    document.getElementById('us-checkmark').classList.add('checkmark');

    document.getElementById('asia-container').classList.remove('selected-container');
    document.getElementById('asia-container').classList.add('satellite-container');
    document.getElementById('asia-svg-path').classList.remove('selected-image');
    document.getElementById('asia-title').classList.remove('selected-title');
    document.getElementById('asia-subtitle').classList.remove('selected-subtitle');
    document.getElementById('asia-checkmark').classList.remove('selected-checkmark');
    document.getElementById('asia-checkmark').classList.add('checkmark');

    document.getElementById('europe-container').classList.remove('satellite-container');
    document.getElementById('europe-container').classList.add('selected-container');
    document.getElementById('europe-svg-path').classList.add('selected-image');
    document.getElementById('europe-title').classList.add('selected-title');
    document.getElementById('europe-subtitle').classList.add('selected-subtitle');
    document.getElementById('europe-checkmark').classList.remove('checkmark');
    document.getElementById('europe-checkmark').classList.add('selected-checkmark');

    setIframeSource('http://localhost:10022/login');
}