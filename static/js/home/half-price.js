var mainEstimate = document.getElementById("mainEstimate");
var mainEstimateSm = document.getElementById("mainEstimateSm");

var tardigradeEstimate = document.getElementById("tardigradeEstimate");
var amazonEstimate = document.getElementById("amazonEstimate");
var googleEstimate = document.getElementById("googleEstimate");
var microsoftEstimate = document.getElementById("microsoftEstimate");

var petabyteContactCta = document.getElementById("petabyteContactCta");
var charts = document.getElementById("charts");

var downloadMeasures = document.querySelectorAll(".download-measure")
var storageMeasures = document.querySelectorAll(".storage-measure")

var downloadInput = document.getElementById("download");
var storageInput = document.getElementById("storage");

var tardigradeBar = document.getElementById("tardigradeBar");
var amazonBar = document.getElementById("amazonBar");
var googleBar = document.getElementById("googleBar");
var microsoftBar = document.getElementById("microsoftBar");

// handle measure change by changing color to measure choice and triggering calculation
var onChangeMeasure = function(measures, recentMeasureChoice, previousMeasureChoice) {
    if(measures) {
        measures.forEach(el => el.addEventListener('click', event => {
            el.classList.add('selected');
            for (var i = 0; i < measures.length; i++) {
                if(el !== measures[i]) {
                    measures[i].classList.remove('selected');
                }
            }
            calculate(recentMeasureChoice, previousMeasureChoice)
        }));
    }
}

// all calculation logic
var calculate = function(recentMeasureChoice, previousMeasureChoice) {
    var recentInputValue = "";
    var previousInputValue = "";
    var recentMeasureElements = ""
    var previousMeasureElements = ""
    var choiceOne = ""
    var choiceTwo = ""

    if(recentMeasureChoice === "storage") {
        recentInputValue = document.getElementById("storage").value;
        previousInputValue = document.getElementById("download").value;
        previousMeasureElements = document.querySelectorAll(".download-measure")
        recentMeasureElements = document.querySelectorAll(".storage-measure")
    } else if(recentMeasureChoice === "download") {
        previousInputValue = document.getElementById("storage").value;
        recentInputValue = document.getElementById("download").value;
        previousMeasureElements = document.querySelectorAll(".storage-measure")
        recentMeasureElements = document.querySelectorAll(".download-measure")
    }

    // change chosen measure color
    for (var i = 0; i < previousMeasureElements.length; i++) {
        if(previousMeasureElements[i].classList.contains('selected')) {
            choiceTwo = previousMeasureElements[i].textContent
        }
    }

    for (var i = 0; i < recentMeasureElements.length; i++) {
        if(recentMeasureElements[i].classList.contains('selected')) {
            choiceOne = recentMeasureElements[i].textContent
        }
    }

    // render cta and change main estimate color if user inputs petabyte
    if(petabyteCalcCheck(choiceOne, recentInputValue) || petabyteCalcCheck(choiceTwo, previousInputValue)) {
        charts.style.display="none";
        petabyteContactCta.style.display="block"

        mainEstimate.style.color="#D6DAE1";
        mainEstimateSm.style.color="#D6DAE1"
        mainEstimate.textContent="-----"
        mainEstimateSm.textContent="-----"
        return
    } else {
        charts.style.display="block";
        petabyteContactCta.style.display="none"

        mainEstimate.style.color="#2582ff";
        mainEstimateSm.style.color="#2582ff"
    }

    // add storage and download totals
    var tardigradeCombination = (recentInputValue * tardigradeCalculation(choiceOne, recentMeasureChoice)) + (previousInputValue * tardigradeCalculation(choiceTwo, previousMeasureChoice))
    var amazonCombination = (amazonCalculation(recentInputValue, choiceOne, recentMeasureChoice)) + (amazonCalculation(previousInputValue, choiceTwo, previousMeasureChoice))
    var googleCombination = (googleCalculation(recentInputValue, choiceOne, recentMeasureChoice)) + (googleCalculation(previousInputValue, choiceTwo, previousMeasureChoice))
    var microsoftCombination = (microsoftCalculation(recentInputValue, choiceOne, recentMeasureChoice)) + (microsoftCalculation(previousInputValue, choiceTwo, previousMeasureChoice))

    // style rendered amount
    var tardigradeTotal = renderCalculation(tardigradeCombination)
    var amazonTotal = renderCalculation(amazonCombination)
    var googleTotal = renderCalculation(googleCombination)
    var microsoftTotal = renderCalculation(microsoftCombination)

    // input totals into elements
    mainEstimate.textContent = tardigradeTotal
    mainEstimateSm.textContent = tardigradeTotal

    tardigradeEstimate.textContent = tardigradeTotal
    amazonEstimate.textContent = amazonTotal
    googleEstimate.textContent = googleTotal
    microsoftEstimate.textContent = microsoftTotal

    // edit bargraph heights
    tardigradeBar.style.height = renderBarHeight(tardigradeCombination, tardigradeCombination)
    amazonBar.style.height = renderBarHeight(amazonCombination, tardigradeCombination)
    googleBar.style.height = renderBarHeight(googleCombination, tardigradeCombination)
    microsoftBar.style.height = renderBarHeight(microsoftCombination, tardigradeCombination)

    // check for checked box on every calculation
    multiZoneCalc()

}

var renderCalculation = function(total) {
    if(isNaN(total)) {
        return "$0"
    } else {
        return  "$" + (Math.ceil(total * 100) / 100).toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

var renderBarHeight = function(total, tardigradeTotal) {
    var checkbox = document.getElementById('checkbox');

    var factor = checkbox.checked && tardigradeTotal > 100 && tardigradeTotal < 20000 ? 5 : 3
    var base = tardigradeTotal * factor
    if(total == 0 && tardigradeTotal == 0 || (isNaN(total) || isNaN(tardigradeTotal))) {
        return "0%"
    } else {
        return ((total / base) * 100) + "%"
    }
}

var amazonCalculation = function(input, measureChoice, serviceType) {
    if(serviceType === "storage") {
        if(measureChoice === "GB") {
            if(input <= 1000) {
                return input * .023
            } else if(input > 1000 && input <= 50000) {
                return input * .022
            } else if(input > 50000) {
                return input * .021
            }
        } else if(measureChoice === "TB") {
            if(input <= 1) {
                return input * 23
            } else if(input > 1 && input <= 50) {
                return input * 22
            } else if(input > 50) {
                return input * 21
            }
        }
    } else if(serviceType === "download") {
        if(measureChoice === "GB") {
            if(input >= 1 && input <= 10) {
                return input * .090
            } else if(input > 10 && input <= 50000) {
                return input * .085
            } else if(input > 50000 && input <= 150000) {
                return input * .070
            } else if(input > 150000) {
                return input * .050
            } else {
                return 0
            }
        } else if(measureChoice === "TB") {
            if(input >= .001 && input <= .01) {
                return input * 90
            } else if(input > .01 && input <= 50) {
                return input * 85
            } else if(input > 50 && input <= 150) {
                return input * 70
            } else if(input > 150) {
                return input * 50
            } else  {
                return 0
            }
        }
    }
}

var googleCalculation = function(input, measureChoice, serviceType) {

    if(serviceType === "storage") {
        if(measureChoice === "GB") {
            return input * .026
        } else if(measureChoice === "TB") {
            return input * 26
        }
    } else if(serviceType === "download") {
        if(measureChoice === "GB") {
            if(input >= 0 && input <= 1000) {
                return input * .120
            } else if(input > 1000 && input <= 10000) {
                return input * .110
            } else if(input > 10000) {
                return input * .080
            }
            return input * .080
        } else if(measureChoice === "TB") {
            if(input <= 1) {
                return input * 120
            } else if(input > 1 && input <= 10) {
                return input * 110
            } else if(input > 10) {
                return input * 80
            }
        }
    }
}

var microsoftCalculation = function(input, measureChoice, serviceType) {
    if(serviceType === "storage") {
        if(measureChoice === "GB") {
            if(input <= 50000) {
                return input * .0184
            } else if(input > 50000 && input <= 500000) {
                return input * .00177
            } else if(input < 500000) {
                return input * .00170
            }
        } else if(measureChoice === "TB") {
            if(input >= 1 && input <= 50) {
                return input * 18.40
            } else if(input > 50 && input <= 500) {
                return input * 17.70
            } else if(input > 500) {
                return input * 17
            } else {
                return 0
            }
        }
    } else if(serviceType === "download") {
        if(measureChoice === "GB") {
            if(input > 5 && input <= 10000) {
                return input * .0870
            } else if(input > 10000 && input <= 50000) {
                return input * .0830
            } else if(input > 50000 && input <= 150000) {
                return input * .070
            } else if(input > 150000 && input <= 350000) {
                return input * .050
            } else if(input > 350000) {
                return input * .050
            } else {
                return 0
            }
        } else if(measureChoice === "TB") {
            if(input <= .005) {
                return 0
            } else if(input > .005 && input <= 10) {
                return input * 87
            } else if(input > 10 && input <= 50) {
                return input * 83
            } else if(input > 50 && input <= 150) {
                return input * 70
            } else if(input > 150) {
                return input * 50
            }
        }
    }
}

var tardigradeCalculation = function(measureChoice, serviceType) {
    if(serviceType === "download") {
        if(measureChoice === "GB") {
            return .045
        } else if(measureChoice === "TB") {
            return 45
        }
    } else if(serviceType === "storage") {
        if(measureChoice === "GB") {
            return .01
        } else if(measureChoice === "TB") {
            return 10
        }
    }
}

// trigger calculation on every input change
var onInputChange = function(input, recentMeasureChoice, previousMeasureChoice) {
    input.addEventListener('change', event => {
        if(input.value >= 0) {
            calculate(recentMeasureChoice, previousMeasureChoice)
        }
    });
    input.addEventListener('keyup', event => {
        if(input.value >= 0) {
            calculate(recentMeasureChoice, previousMeasureChoice)
        }
    });
}

// check whether to render pricing question cta
var petabyteCalcCheck = function(serviceType, input) {
    if(serviceType === "GB" && input >= 1000000) {
        return true
    } else if(serviceType === "TB" && input >= 1000) {
        return true
    }
    return false
}

var multiZoneCalc = function(event) {
    var checkbox = document.getElementById('checkbox');
    var storageInputValue = document.getElementById("storage").value;
    var downloadInputValue = document.getElementById("download").value;
    var downloadMeasureChoice = ""
    var storageMeasureChoice = ""
    var downloadMeasureElements = document.querySelectorAll(".download-measure")
    var storageMeasureElements = document.querySelectorAll(".storage-measure")

    for (var i = 0; i < downloadMeasureElements.length; i++) {
        if(downloadMeasureElements[i].classList.contains('selected')) {
            downloadMeasureChoice = downloadMeasureElements[i].textContent
        }
    }

    for (var i = 0; i < storageMeasureElements.length; i++) {
        if(storageMeasureElements[i].classList.contains('selected')) {
            storageMeasureChoice = storageMeasureElements[i].textContent
        }
    }


    if (checkbox.checked) {
        var tardigradeCombination = (storageInputValue * tardigradeCalculation(storageMeasureChoice, "storage")) + (downloadInputValue * tardigradeCalculation(downloadMeasureChoice, "download"))

        var amazonCombination = (amazonCalculation(storageInputValue, storageMeasureChoice, "storage")) + (amazonCalculation(downloadInputValue, downloadMeasureChoice, "download"))
        var googleCombination = (googleCalculation(storageInputValue, storageMeasureChoice, "storage")) + (googleCalculation(downloadInputValue, downloadMeasureChoice, "download"))
        var microsoftCombination = (microsoftCalculation(storageInputValue, storageMeasureChoice, "storage")) + (microsoftCalculation(downloadInputValue, downloadMeasureChoice, "download"))

        var amazonDoubleCombination = (amazonCalculation((storageInputValue * 2), storageMeasureChoice, "storage")) + (amazonCalculation(downloadInputValue, downloadMeasureChoice, "download"))
        var googleDoubleCombination = (googleCalculation((storageInputValue * 2), storageMeasureChoice, "storage")) + (googleCalculation(downloadInputValue, downloadMeasureChoice, "download"))
        var microsoftDoubleCombination = (microsoftCalculation((storageInputValue * 2), storageMeasureChoice, "storage")) + (microsoftCalculation(downloadInputValue, downloadMeasureChoice, "download"))


        var amazonTotal = renderCalculation(amazonCombination)
        var googleTotal = renderCalculation(googleCombination)
        var microsoftTotal = renderCalculation(microsoftCombination)


        amazonTotal = renderCalculation(amazonDoubleCombination)
        googleTotal = renderCalculation(googleDoubleCombination)
        microsoftTotal = renderCalculation(microsoftDoubleCombination)


        amazonEstimate.textContent = amazonTotal
        googleEstimate.textContent = googleTotal
        microsoftEstimate.textContent = microsoftTotal

        tardigradeBar.style.height = renderBarHeight(tardigradeCombination, tardigradeCombination)
        amazonBar.style.height = renderBarHeight(amazonDoubleCombination, tardigradeCombination)
        googleBar.style.height = renderBarHeight(googleDoubleCombination, tardigradeCombination)
        microsoftBar.style.height = renderBarHeight(microsoftDoubleCombination, tardigradeCombination)

    } else {
        var tardigradeCombination = (storageInputValue * tardigradeCalculation(storageMeasureChoice, "storage")) + (downloadInputValue * tardigradeCalculation(downloadMeasureChoice, "download"))

        var amazonCombination = (amazonCalculation(storageInputValue, storageMeasureChoice, "storage")) + (amazonCalculation(downloadInputValue, downloadMeasureChoice, "download"))
        var googleCombination = (googleCalculation(storageInputValue, storageMeasureChoice, "storage")) + (googleCalculation(downloadInputValue, downloadMeasureChoice, "download"))
        var microsoftCombination = (microsoftCalculation(storageInputValue, storageMeasureChoice, "storage")) + (microsoftCalculation(downloadInputValue, downloadMeasureChoice, "download"))

        var amazonTotal = renderCalculation(amazonCombination)
        var googleTotal = renderCalculation(googleCombination)
        var microsoftTotal = renderCalculation(microsoftCombination)

        amazonEstimate.textContent = amazonTotal
        googleEstimate.textContent = googleTotal
        microsoftEstimate.textContent = microsoftTotal

        tardigradeBar.style.height = renderBarHeight(tardigradeCombination, tardigradeCombination)
        amazonBar.style.height = renderBarHeight(amazonCombination, tardigradeCombination)
        googleBar.style.height = renderBarHeight(googleCombination, tardigradeCombination)
        microsoftBar.style.height = renderBarHeight(microsoftCombination, tardigradeCombination)
    }
}


// homepage availability zone checkbox
checkbox.addEventListener('change', (event) => {
    multiZoneCalc(event)
})


// make initial calculation
calculate("storage", "download")

// add measure change event listeners
onChangeMeasure(downloadMeasures, "download", "storage")
onChangeMeasure(storageMeasures, "storage", "download")

// add input change event listeners on both inputs
onInputChange(downloadInput, "download", "storage")
onInputChange(storageInput, "storage", "download")
