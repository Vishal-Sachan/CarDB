console.log("connected");
const table = document.getElementById("table");
console.log(table.childNodes);

const addDataBtn1 = document.getElementById("btn-add");
const cancelBtn = document.getElementById("btn-cancel")
const addDataBtn2 = document.getElementById("btn-add-data")
const deleteDataBtn = document.getElementById("btn-delete")
const formContainer = document.querySelector(".form-container")
const form = document.createElement('div');
async function readDataFromDatabase() {
    const response = await fetch("http://localhost:5500/cars",);
    const data = await response.json();
    console.log(data);
    data.forEach((car) => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `<td>${car.name}</td>
                        <td>${car.model || "--"}</td>
                        <td>${car.type || "--"}</td>
                        <td>${car.color || "--"}</td>
                        <td>${car.number}</td>
                        <td>${car.active}</td>
                        <td>$${car.price || "--"}</td>
                        <button type="button" id="btn-edit" data-id=${car._id}>Edit</button>
                        <button type="submit" id="btn-delete" data-id=${car._id}>Delete</button>`;
        table.appendChild(tableRow);
    });
}
const createForm = (carObj, form) => {
    form.innerHTML = `
        <form id="edit-form" action="/update" method="post">
        <input type="text" value="${carObj._id}" id="_id" name="_id" disabled>
                <div>
                <input type="text" value="${carObj.name}" id="name" name="name" required>
                <input type="text" value="${carObj.model}" id="model" name="model">
                </div>
                <div>
                <input type="text" value="${carObj.type}" id="type" name="type">
                <input type="text" value="${carObj.color}" id="color" name="color">
                </div>
                <div>
                <input type="text" value="${carObj.number}" id="number" name="number" required>
                <select name="active" required>
                <option value="true" ${carObj.active ? 'selected' : ""}>RC Active</option>
                <option value="false" ${carObj.active ? '' : "selected"}>RC Expired</option>
                </select>
                </div>
                <input type="number" value="${carObj.price}" id="price" name="price">
                <div>
                    <button type="submit" id="btn-save-data">SAVE</button>
                    <button type="button" id="btn-cancel2">CANCEL</button>
                </div>
            </form>`
    form.classList.add("edit-form-container");
    return form
}


async function singleDataFromDatabase(dataId) {
    const response = await fetch(`http://localhost:5500/cars/${dataId}`,);
    const data = await response.json();
    const form2 = createForm(data, form);
    document.body.appendChild(form2);
}

readDataFromDatabase()
    .then(() => {

        const editDataBtn = document.querySelectorAll('#btn-edit')
        const deleteDataBtn = document.querySelectorAll("#btn-delete")
        //const editForm = document.querySelector('.edit-form-container')
        editDataBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                var dataId = btn.getAttribute("data-id")
                console.log(dataId)
                singleDataFromDatabase(dataId).then(() => {
                    const cancelBtn2 = document.querySelector("#btn-cancel2")
                    cancelBtn2.addEventListener('click', () => {
                        // console.log("clicked cancel btn")
                        document.body.removeChild(form)
                        // editForm.classList.add('hidden')
                    })
                    //editForm.classList.remove('hidden')
                })
            })
        })
        deleteDataBtn.forEach((btn) => {
            btn.addEventListener('click', async () => {
                try {
                    var dataId = btn.getAttribute("data-id")
                    const response = await fetch('http://localhost:5500/delete', {
                        method: 'post',
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            _id: dataId

                        })
                    });
                    console.log('Completed!', response);
                } catch (err) {
                    console.error(`Error: ${err}`);
                }
            });


        })
    })

addDataBtn1.addEventListener('click', () => {
    formContainer.classList.remove('hidden')
    console.log("clicked add btn")
})

cancelBtn.addEventListener('click', () => {
    console.log("clicked cancel btn")
    formContainer.classList.add('hidden')
})

addDataBtn2.addEventListener('click', () => {
    console.log("clicked cancel btn")
    formContainer.classList.add('hidden')
})






