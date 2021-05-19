import './index.css';

function SmChart() {

    const url = 'https://restcountries.eu/rest/v2/all';

    let getDropdownOptions = (url) => {
      
      fetch(url).then(response => response.json()).then (data => {
        let div = document.createElement("div");
        let select = document.createElement("select");
    
        for (let i = 0; i < data.length; i++) {  
            let option = document.createElement("option");
            option.value = data[i].name;
            option.text = data[i].name.toUpperCase();
            select.appendChild(option);
        }
    
        let label = document.createElement("label");
        label.innerHTML = "Choose Cryptocurrency:"
        label.htmlFor = "chartForm";   
    
        div.appendChild(label).appendChild(select);
        document.getElementById('chartDropdown').replaceWith(div);
        })
        .catch(error => {
            console.log('Request failed', error);
      })
    }

    getDropdownOptions(url);
  
    return (
    <section class="grid-container charts">
        <div class="grid-item chart">Chart</div>
        <div id="chartDropdown"></div>
    </section>
  );
}

export default SmChart;
