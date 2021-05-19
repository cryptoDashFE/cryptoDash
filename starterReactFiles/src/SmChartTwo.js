import './index.css';

function SmChartTwo() {

    const url = 'https://restcountries.eu/rest/v2/all';

    let getDropdownOptions = (url) => {
      
      fetch(url).then(response => response.json()).then (data => {
        let div2 = document.createElement("div");
        let select2 = document.createElement("select");
        select2.name = "chartTwoForm";
        select2.id = "chartTwoForm";  
    
        for (let i = 0; i < data.length; i++) {  
            let option = document.createElement("option");
            option.value = data[i].name;
            option.text = data[i].name.toUpperCase();
            select2.appendChild(option);
        }

        let label2 = document.createElement("label");
        label2.innerHTML = "Choose Cryptocurrency:"
        label2.htmlFor = "chartTwoForm";   

        div2.appendChild(label2).appendChild(select2);
        document.getElementById('chartTwoDropdown').replaceWith(div2);
        })
        .catch(error => {
            console.log('Request failed', error);
      })
    }
    getDropdownOptions(url);
  return (
    <section class="grid-container charts2">
        <div class="grid-item chart2">Chart Two</div>
        <div id="chartTwoDropdown"></div>
    </section>
  );
}

export default SmChartTwo;