(function() {
    'use strict';

    fetch("/experiments/")
    .then(response => response.text())
    .then(function(html) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        let content = doc.querySelector("body").innerHTML;
        document.getElementById("container").innerHTML = content;
    })
    .catch(err => console.log("Failed to fetch page: ", err));
}());