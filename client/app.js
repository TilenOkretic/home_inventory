const BASE_URL = "http://localhost:5050/api/v1/"
const app = document.querySelector('.app');

/* First Request */

async function load() {
    let req = await fetch(BASE_URL + "items");
    let data = await req.json();
    console.log(data);
    data.forEach(itm => {
        let lable = document.createElement('lable');
        lable.innerHTML = itm.name;
        app.appendChild(lable);
    });
}

load();
