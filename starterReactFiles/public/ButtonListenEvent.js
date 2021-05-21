document.addEventListener("click", function handleClick(event) {
    if (/btn-secondary/.test(event.target.className)) {
            //should be replaced with function to update chart timeframes
            helloWorld(event.target.value);
        }
})
function helloWorld(value) {
    document.getElementById('lgChart').innerHTML = value;
}