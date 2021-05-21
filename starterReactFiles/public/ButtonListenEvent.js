document.addEventListener("click", function handleClick(event) {
    let element = event.target;

    while (element) {
        if (element.nodeName === "BUTTON" && /btn-secondary/.test(element.className)) {
            helloWorld(element.value);
            break;
        }

        element = element.parentNode;
    }
})
function helloWorld(value) {
    document.getElementById('lgChart').innerHTML = value;
}