function getURLParameter(e) {
    return decodeURI((new RegExp(e + "=(.+?)(&|$)").exec(location.search) || [, ""])[1]);
}

if (getURLParameter("email") === "") {
    console.log("No URL param value found.");
} else {
    document.getElementById("email").value = getURLParameter("email");
}
