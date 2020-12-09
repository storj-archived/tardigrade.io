window.onload = function () {
    const backupTab = document.getElementById('v-pills-backup-tab')
    const mediaTab = document.getElementById('v-pills-media-tab')
    const cloudTab = document.getElementById('v-pills-cloud-tab')
    const transfersTab = document.getElementById('v-pills-transfers-tab')
    const logsTab = document.getElementById('v-pills-logs-tab')
    const snapshotsTab = document.getElementById('v-pills-snapshots-tab')

    const select = function (e) {
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

    if (backupTab && mediaTab && cloudTab && transfersTab && logsTab && snapshotsTab) {
        backupTab.addEventListener("click", function() {
            select(this)
        });
        mediaTab.addEventListener("click", function() {
            select(this)
        });
        cloudTab.addEventListener("click", function() {
            select(this)
        });
        transfersTab.addEventListener("click", function() {
            select(this)
        });
        logsTab.addEventListener("click", function() {
            select(this)
        });
        snapshotsTab.addEventListener("click", function() {
            select(this)
        });
    }
}
