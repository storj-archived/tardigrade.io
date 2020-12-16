const scriptURL = 'https://script.google.com/macros/s/AKfycbwiDUmz3MDY_fqjobWAWdm_H0XZ1jyyCsTCddQiVmYKgMTv8z4/exec'
const form = document.forms['submit-to-google-sheet']
const spinner = document.getElementById("spinner");

form.addEventListener('submit', e => {
  e.preventDefault()
  spinner.removeAttribute('hidden');
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => window.location.href = "/fastly-success")
    .catch(error => {
      console.error('Error!', error.message)
      spinner.setAttribute('hidden')
    })
})
