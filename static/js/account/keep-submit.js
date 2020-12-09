const scriptURL = 'https://script.google.com/macros/s/AKfycbyqLxtHL9HEmPW1r15-FuT61JuyZZd73DC7MRh5hPU41me9LG0/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => window.location.href = "/keep-my-account-success")
        .catch(error => console.error('Error!', error.message))
})
