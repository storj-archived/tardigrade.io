var nextButton = document.getElementById("partner-form-next");
var backButton = document.getElementById("partner-form-back");
var submitButton = document.getElementById("partner-form-submit");
var parent = document.getElementsByClassName("step"); // all step wrapper divs
var progressBar = document.getElementById("progress-bar");
var errElm = document.getElementsByClassName("error"); // all error divs
var formStart = document.getElementById("start-wrapper"); // initial page message
var startButton = document.getElementById("partner-form-start");
var firstStep = document.getElementById("partner-form-name");
var progressBarWrapper = document.getElementById("progress-bar-wrapper");
var stepButtons = document.getElementById("step-buttons");

var useCaseOptions = document.getElementsByClassName('use-case');
var dataAmountOptions = document.getElementsByClassName('data-amount');
var fileSizeOptions = document.getElementsByClassName('file-size');
var perMonthOptions = document.getElementsByClassName('per-month');

var useCaseLabels = document.getElementsByClassName('use-case-label');
var dataAmountLabels = document.getElementsByClassName('data-amount-label');
var fileSizeLabels = document.getElementsByClassName('file-size-label');
var perMonthLabels = document.getElementsByClassName('per-month-label');

var index = 0; // to be increased an decreased depending on button clicked
var progressBarValue = 8.333; // 100 divided by the 12 steps
var started = false;

var partner_form = {partner_form: true};

if(formStart && startButton && firstStep && progressBarWrapper && stepButtons) {
    // remove beginning message and start process
    startButton.onclick = function (event) {
        started = true
        beginForm(event)
    }
}

function beginForm(event) {
    formStart.classList.add('d-none');
    firstStep.classList.add('d-block');
    progressBarWrapper.classList.add('d-block');
    stepButtons.classList.add('d-block');
    setTimeout(function(){ parent[index].querySelector('input').focus(); }, 200);
}

// if value is input or selected on step
function successfulClick(event) {
    parent[index].classList.add('d-none');
    parent[index].classList.remove('d-block');
    parent[index].classList.remove('d-inline-block');

    // make sure back btn is present
    if(backButton) {
        backButton.classList.add('d-inline-block');
        backButton.classList.remove('d-none');
    }

    // progress bar logic
    if(progressBar) {
        progressBar.innerHTML = index + 2;
        progressBarValue = progressBarValue + 8.333;
        progressBar.style.width = `${progressBarValue}%`
    }

    // display next step
    index = index + 1
    parent[index].classList.add('d-inline-block');

    // remove next button and show submit button if last step
    if(parent[index].classList.contains('partner-form-per-month')) {
        nextButton.classList.add('d-none');
        submitButton.classList.add('d-inline-block');
        nextButton.classList.remove('d-inline-block');
        submitButton.classList.add('d-none');
    }

    // remove error display and focus input for next step
    errElm[index].classList.add('d-none');
    errElm[index].classList.remove('d-block');
    setTimeout(function(){parent[index].querySelector('input').focus(); }, 200);
}

// check for at least one option selection
function multiOptionErrCheck(index, currentStepOptions, isSubmit) {
    let selected = false;
    for (let i = 0, length = currentStepOptions.length; i < length; i++) {
        if (currentStepOptions[i].checked) {
            selected = true;
            errElm[index].classList.add('d-none');
            errElm[index].classList.remove('d-block');            if(!isSubmit) {
                successfulClick();
            }
        }
    }
    if(!selected) {
        errElm[index].classList.add('d-block');
        errElm[index].classList.remove('d-none');
        setTimeout(function(){ parent[index].querySelector('input').focus(); }, 200);
    }
}

function errorCheck(index) {
    var userEmailInput = parent[index].querySelector(".user-email");
    // if email input does not include ampersand
    if(userEmailInput && userEmailInput.value && !userEmailInput.value.includes("@")) {
        errElm[index].classList.add('d-block');
        errElm[index].classList.remove('d-none');        setTimeout(function(){ parent[index].querySelector('input').focus(); }, 200);
    } else if(parent[index].classList.contains("partner-form-use-case")) {
        multiOptionErrCheck(index, useCaseOptions)
    } else if(parent[index].classList.contains("partner-form-data-amount")) {
        multiOptionErrCheck(index, dataAmountOptions)
    } else if(parent[index].classList.contains("partner-form-file-size")) {
        multiOptionErrCheck(index, fileSizeOptions)
    } else {
        errElm[index].classList.add('d-none');
        errElm[index].classList.remove('d-block');
        successfulClick();
    }
}

function onNextStep(event) {
    event.preventDefault()
    // parent[index] will always be current step
    if(parent[index] && errElm && errElm[index]) {
        // if required field is empty
        if(parent[index].querySelector(".required") && parent[index].querySelector(".required").value == "") {
            errElm[index].classList.add('d-block');
            errElm[index].classList.remove('d-none');
            setTimeout(function(){ parent[index].querySelector('input').focus(); }, 200);
        } else {
            errorCheck(index)
        }
    }
}

function onSubmit(event) {

    event.preventDefault();

    multiOptionErrCheck(index, perMonthOptions, true)

    var style = window.getComputedStyle(errElm[index]);
    // if error msg is not present, peform submit logic
    if(style.display !== "block") {
        var userInput = document.querySelectorAll(".user-input") // all non-selecter user inputs

        // gather inputs for non-multi option
        for (i = 0; i < userInput.length; i++) {
            partner_form[userInput[i].name] = userInput[i].value;
        }

        // gather inputs with multiple options and choices
        if(useCaseOptions) {
            partner_form.use_case = [];
            for(var i=0; useCaseOptions[i]; ++i){
                if(useCaseOptions[i].checked){
                    partner_form.use_case.push(useCaseLabels[i].textContent);
                }
            }
        }

        // gather inputs with multiple options but one choice
        function handleMultipleOptions(elements, label, destination){
            if(!elements) return;
            for(var i=0; elements[i]; ++i){
                if(elements[i].checked){
                    partner_form[destination] = label[i].textContent;
                    break
                }
            }
        }

        handleMultipleOptions(dataAmountOptions, dataAmountLabels, "data_amount");

        handleMultipleOptions(fileSizeOptions, fileSizeLabels, "file_sizes");

        handleMultipleOptions(perMonthOptions, perMonthLabels, "download_times_per_month");


        // timestamps with timezone
        partner_form.timestamp = Math.floor((new Date()).getTime() / 1000);

        analytics.identify(partner_form.email,
            partner_form,
            {integrations: {'All': false, 'Customer.io': true}}, function() {
                analytics.track("partner-form", {});
            });

        analytics.identify(partner_form.email,
            partner_form,
            {integrations: {'All': false, 'postgresSelfHosted': true}}, function() {
                window.location = "/partner-thank-you"
            });
    }

}

// on enter
document.onkeypress = function (event) {
    if (event.keyCode === 13) {
        // if last step, submit form on enter
        if(index === 0 && !started) {
            started = true
            beginForm(event)
        } else if(progressBarValue > 92) {
            onSubmit(event)
        } else {
            onNextStep(event)
        }
    }
}

backButton.addEventListener('click', function (event) {
    event.preventDefault()
    // no back button on first step
    if(index === 1 && backButton) {
        backButton.classList.add('d-none');
        backButton.classList.remove('d-inline-block');
    }
    parent[index].classList.add('d-none');
    parent[index].classList.remove('d-block');
    parent[index].classList.remove('d-inline-block');
    if(progressBar) {
        progressBar.innerHTML = index;
        progressBarValue = progressBarValue - 8.333;
        progressBar.style.width = `${progressBarValue}%`
    }
    index = index - 1
    parent[index].classList.add('d-block');
    parent[index].classList.remove('d-none');
    setTimeout(function(){ parent[index].querySelector('input').focus(); }, 200);
})

nextButton.addEventListener('click', function (event) {
    onNextStep(event)
})

submitButton.addEventListener('click', function (event) {
    onSubmit(event)
})
