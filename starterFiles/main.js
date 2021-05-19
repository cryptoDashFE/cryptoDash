const url = 'https://restcountries.eu/rest/v2/all';

let getDropdownOptions = (url) => {
  
  fetch(url).then(response => response.json()).then (data => {
    let select1 = document.createElement("select");
    select1.className = "grid-item chartForm";
    select1.name = "chartOneForm";
    select1.id = "chartOneForm";  

    let select2 = document.createElement("select");
    select2.className = "grid-item chartForm"
    select2.name = "chartTwoForm";
    select2.id = "chartTwoForm"; 

    let select3 = document.createElement("select");
    select3.className = "grid-item chartForm"
    select3.name = "chartThreeForm";
    select3.id = "chartThreeForm"; 

    for (let i = 0; i < data.length; i++) {  
        let option = document.createElement("option");
        option.value = data[i].name;
        option.text = data[i].name.toUpperCase();
        select1.appendChild(option);
    }
    for (let i = 0; i < data.length; i++) {  
        let option = document.createElement("option");
        option.value = data[i].name;
        option.text = data[i].name.toUpperCase();
        select2.appendChild(option);
    }
    for (let i = 0; i < data.length; i++) {  
        let option = document.createElement("option");
        option.value = data[i].name;
        option.text = data[i].name.toUpperCase();
        select3.appendChild(option);
    }
    let label1 = document.createElement("label");
    label1.innerHTML = "Choose Cryptocurrency:"
    label1.htmlFor = "chartOneForm";   

    let label2 = document.createElement("label");
    label2.innerHTML = "Choose Cryptocurrency:"
    label2.htmlFor = "chartTwoForm";   

    let label3 = document.createElement("label");
    label3.innerHTML = "Choose Cryptocurrency:"
    label3.htmlFor = "chartThreeForm";   

    document.getElementById('chartOneDropdown').appendChild(label1).appendChild(select1);
    document.getElementById('chartTwoDropdown').appendChild(label2).appendChild(select2);
    document.getElementById('chartThreeDropdown').appendChild(label3).appendChild(select3);
    })
    .catch(error => {
        console.log('Request failed', error);
  })
}
getDropdownOptions(url);