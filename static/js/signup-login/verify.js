function redirectToLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    const nameParam = urlParams.get('name');
    switch (nameParam) {
        case 'Asia-East-1':
            location.href = 'https://asia-east-1.tardigrade.io/login?activated=false';
            break;
        case 'Europe-West-1':
            location.href = 'https://europe-west-1.tardigrade.io/login?activated=false';
            break;
        default:
            location.href = 'https://us-central-1.tardigrade.io/login?activated=false';
    }
}
