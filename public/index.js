console.log("connected");
const table = document.getElementById("table");
console.log(table.childNodes);

const addDataBtn = document.getElementById("btn-add-data");

async function readDataFromDatabase() {
    const response = await fetch("http://localhost:5500/cars");
    const data = await response.json();
    console.log(data);
    data.forEach((car) => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td>${car.name}</td><td>${car.model || "--"}</td><td>${car.type || "--"}</td><td>${car.color || "--"}</td><td>${car.number}</td><td>${car.active}</td><td>$${car.price || "--"}</td><button type="button" id="btn-edit">Edit</button>`;
        table.appendChild(tableRow);
    });
}
readDataFromDatabase().then(() => {
    const editDataBtn = document.getElementById('btn-edit')
    editDataBtn.addEventListener('click', () => {
        document.getElementById("form-container").style.display = "block";
    })
})



