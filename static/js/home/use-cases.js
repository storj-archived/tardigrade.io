let smallContent = document.querySelectorAll('.small-content');
let largeContent = document.getElementById("large-content")
if(window.innerWidth && window.innerWidth > "991") {
    if(smallContent) {
        document.querySelectorAll('.small-content').forEach(function(a){
            a.remove()
        })
    }
}
else if(window.innerWidth && window.innerWidth < "991") {
    if(largeContent) {
        largeContent.remove();
    }
}
