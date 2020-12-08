function select(e){
    var currentTab = e.parentNode;
    var choices = currentTab.parentNode.children;
    for(var i = 0; i < choices.length; i++){
        choices[i].children[0].classList.remove("active");
        choices[i].style.borderLeft = "2px solid #DCDCDC";
        choices[i].style.opacity = 0.5 ;
        choices[i].style.fontWeight = 500;
    }
    currentTab.style.borderLeft = "2px solid #2582FF";
    currentTab.style.opacity = 1.0;
    currentTab.style.fontWeight = "bold";
}
