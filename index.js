import * as bootstrap from 'bootstrap';

// Toasts
const inputErrorToast = document.getElementById('inputErrorToast');
const idDupeToast = document.getElementById('idDupeToast');
const editErrorToast = document.getElementById('editErrorToast');
const selectErrorToast = document.getElementById('selectErrorToast');
const deleteErrorToast = document.getElementById('deleteErrorToast')

const form1 = document.getElementById('form-1');
const form2 = document.getElementById('form-2');
// Form 1 Inputs
const productId1 = document.getElementById('productId-1');
const productName1 = document.getElementById('productName-1');
const productQuantity1 = document.getElementById('productQuantity-1');
// Form 1 Buttons
const insertBtn = document.getElementById('insert-btn');
const editBtn = document.getElementById('edit-btn');
const deleteBtn = document.getElementById('delete-btn');
// Form 2 Inputs
const productId2 = document.getElementById('productId-2');
// Form 2 Buttons
const selectBtn = document.getElementById('select-btn');
// Tables
const dataTable = document.getElementById('data-table');
const lookupTable = document.getElementById('lookup-table');

const data = JSON.parse(localStorage.getItem('data')) ?? [];
const lookup = [];

const addData = () => {
    const formValidity = form1.checkValidity();
    if (formValidity == true && productId1.value.length > 0 && productName1.value.length > 0 && productQuantity1.value.length > 0){
         const dataArrIndex = data.findIndex((item) => item.id === productId1.value);
         if (dataArrIndex === -1){
            const dataObj = {
                id: productId1.value,
                name: productName1.value,
                quantity: productQuantity1.value
            }
            data.push(dataObj);
            localStorage.setItem("data", JSON.stringify(data));
            updateContainer();
            resetForm1();
         } else {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(idDupeToast);
            toastBootstrap.show();
         }
    } else {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(inputErrorToast);
        toastBootstrap.show();
    }
};

const editData = () => {
    const formValidity = form1.checkValidity();
    if (formValidity == true && productId1.value.length > 0 && productName1.value.length > 0 && productQuantity1.value.length > 0){
         const dataArrIndex = data.findIndex((item) => item.id === productId1.value);
         if (dataArrIndex === -1){
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(editErrorToast);
            toastBootstrap.show();
         } else {
            const dataObj = {
                id: productId1.value,
                name: productName1.value,
                quantity: productQuantity1.value
            }
            data[dataArrIndex] = dataObj;
            const lookupArrIndex = lookup.findIndex((item) => item.id === productId1.value);
            if (lookupArrIndex !== -1){
                lookup[lookupArrIndex] = dataObj;
            }
            localStorage.setItem("data", JSON.stringify(data));
            updateContainer();
            updateLookupContainer();
            resetForm1();
         }
    } else {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(inputErrorToast);
        toastBootstrap.show();
    }
}

const selectData = () => {
    const formValidity = form2.checkValidity();
    if (formValidity == true && productId2.value.length > 0){
         const dataArrIndex = data.findIndex((item) => item.id === productId2.value);
         if (dataArrIndex === -1){
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(selectErrorToast);
            toastBootstrap.show();
         } else {
            const lookupArrIndex = lookup.findIndex((item) => item.id === productId2.value);
            if (lookupArrIndex === -1){
                lookup.push(data[dataArrIndex]);
                updateLookupContainer();
                resetForm2();
            }
            
         }
    } else {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(inputErrorToast);
        toastBootstrap.show();
    }
}

const deleteData = () => {
    const validity = productId1.checkValidity();
    if (validity == true && productId1.value.length > 0){
        const dataArrIndex = data.findIndex((item) => item.id === productId1.value);
        if (dataArrIndex === -1){
           const toastBootstrap = bootstrap.Toast.getOrCreateInstance(deleteErrorToast);
           toastBootstrap.show();
        } else {
            data.splice(dataArrIndex,1);
            const lookupArrIndex = lookup.findIndex((item) => item.id === productId1.value);
            if (lookupArrIndex !== -1){
                lookup.splice(lookupArrIndex,1);
            }
            localStorage.setItem("data", JSON.stringify(data));
            updateContainer();
            updateLookupContainer();
            resetForm1();
        }
   } else {
       const toastBootstrap = bootstrap.Toast.getOrCreateInstance(inputErrorToast);
       toastBootstrap.show();
   }
}

insertBtn.addEventListener('click',addData);
editBtn.addEventListener('click',editData);
selectBtn.addEventListener('click',selectData);
deleteBtn.addEventListener('click',deleteData)

const updateContainer = () => {
    dataTable.innerHTML = "";

    data.forEach(({id,name,quantity}) => {
        let row = document.createElement("tr");
        let idCell = document.createElement("td")
        let nameCell = document.createElement("td")
        let quantityCell = document.createElement("td")
        idCell.textContent = id;
        nameCell.textContent = name;
        quantityCell.textContent = quantity;
        row.appendChild(idCell)
        row.appendChild(nameCell)
        row.appendChild(quantityCell)
        dataTable.appendChild(row)
    });
};

const updateLookupContainer = () => {
    lookupTable.innerHTML = "";

    lookup.forEach(({id,name,quantity}) => {
        let row = document.createElement("tr");
        let idCell = document.createElement("td")
        let nameCell = document.createElement("td")
        let quantityCell = document.createElement("td")
        idCell.textContent = id;
        nameCell.textContent = name;
        quantityCell.textContent = quantity;
        row.appendChild(idCell)
        row.appendChild(nameCell)
        row.appendChild(quantityCell)
        lookupTable.appendChild(row)
    });
}

const resetForm1 = () => {
    productId1.value = "";
    productName1.value = "";
    productQuantity1.value = "";
}

const resetForm2 = () => {
    productId2.value = "";
}

updateContainer();