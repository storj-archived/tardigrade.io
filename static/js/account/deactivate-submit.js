const scriptURL = 'https://script.google.com/macros/s/AKfycbyX-1N5TK6WGEsQTvEoo9M0TJEK8rWxYT6ZDoUV4O8l3896axgp/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => window.location.href = "/deactivate-my-account-success")
        .catch(error => console.error('Error!', error.message))
})
