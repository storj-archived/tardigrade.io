var partnerButton = document.getElementById("partnerButton");
var clickCount = 0;

partnerButton.onclick = function (event) {
    event.preventDefault()

    clickCount = clickCount + 1
    if(clickCount === 2) {
        window.location.href = "/partners";
    }
}
