function getDropDownOptions (url) {
      
    fetch(url).then(response => response.json()).then (data => {
      let select = document.createElement("select");
      select.name = "chartForm";
      select.id = "chartForm";  
  
      for (let i = 0; i < data.length; i++) {  
          let option = document.createElement("option");
          option.value = data[i].name;
          option.text = data[i].name.toUpperCase();
          select.appendChild(option);
      }
  
      let label = document.createElement("label");
      label.innerHTML = "Choose Cryptocurrency:"
      label.htmlFor = "chartForm";   
  
      document.getElementById('chartDropdown').appendChild(label).appendChild(select);
      })
      .catch(error => {
          console.log('Request failed', error);
    })
  }
  export default getDropDownOptions;