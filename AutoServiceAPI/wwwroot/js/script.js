const uri = 'api/services'; // [cite: 411]
let services = []; // [cite: 412]

// Отримання списку (GET)
function getServices() { // [cite: 413]
    fetch(uri) // [cite: 415]
        .then(response => response.json()) // Функція fetch повертає об'єкт Promise, який містить відповідь НТТР. Отримання тексту відповіді JSON відбувається шляхом виклику функції json [cite: 3, 4, 416]
        .then(data => _displayServices(data)) // [cite: 417]
        .catch(error => console.error('Помилка отримання послуг.', error)); // [cite: 418]
}

// Додавання нової послуги (POST)
function addService() { // [cite: 419]
    const addNameTextbox = document.getElementById('add-name'); // [cite: 420]
    const addDescTextbox = document.getElementById('add-description'); // [cite: 421]
    const addPriceTextbox = document.getElementById('add-price');

    const service = { // [cite: 422]
        name: addNameTextbox.value.trim(), // [cite: 423]
        description: addDescTextbox.value.trim(), // [cite: 424]
        price: parseFloat(addPriceTextbox.value.trim())
    }; // [cite: 425]

    fetch(uri, { // [cite: 426]
        method: 'POST', // [cite: 427]
        headers: { // [cite: 428]
            'Accept': 'application/json', // [cite: 429]
            'Content-Type': 'application/json' // [cite: 430]
        }, // [cite: 431]
        body: JSON.stringify(service) // [cite: 432]
    }) // [cite: 433]
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(() => { // [cite: 435]
            getServices(); // [cite: 437]
            addNameTextbox.value = ''; // [cite: 438]
            addDescTextbox.value = ''; // [cite: 439]
            addPriceTextbox.value = '';
        })
        .catch(error => alert('Помилка додавання: ' + error.message)); // [cite: 440]
}

// Видалення (DELETE)
function deleteService(id) { // [cite: 441]
    fetch(`${uri}/${id}`, { // [cite: 442]
        method: 'DELETE' // [cite: 443]
    }) // [cite: 444]
        .then(() => getServices()) // [cite: 445]
        .catch(error => console.error('Помилка видалення.', error)); // [cite: 447]
}

// Відображення форми редагування
function displayEditForm(id) { // [cite: 448]
    const service = services.find(s => s.id === id); // [cite: 450]

    document.getElementById('edit-id').value = service.id; // [cite: 451]
    document.getElementById('edit-name').value = service.name; // [cite: 451]
    document.getElementById('edit-description').value = service.description;
    document.getElementById('edit-price').value = service.price;

    document.getElementById('editForm').style.display = 'block'; // [cite: 452]
}

// Оновлення послуги (PUT)
function updateService() { // [cite: 453]
    const serviceId = document.getElementById('edit-id').value; // [cite: 454]

    const service = { // [cite: 454]
        id: parseInt(serviceId, 10), // [cite: 456]
        name: document.getElementById('edit-name').value.trim(), // [cite: 457]
        description: document.getElementById('edit-description').value.trim(), // [cite: 458]
        price: parseFloat(document.getElementById('edit-price').value.trim())
    }; // [cite: 455]

    fetch(`${uri}/${serviceId}`, { // [cite: 459]
        method: 'PUT', // [cite: 460]
        headers: { // [cite: 461]
            'Accept': 'application/json', // [cite: 462]
            'Content-Type': 'application/json' // [cite: 463]
        }, // [cite: 464]
        body: JSON.stringify(service) // [cite: 465]
    }) // [cite: 466]
        .then(() => getServices()) // [cite: 467]
        .catch(error => console.error('Помилка оновлення.', error)); // [cite: 468]

    closeInput(); // [cite: 469]
    return false; // [cite: 470]
}

function closeInput() { // [cite: 472]
    document.getElementById('editForm').style.display = 'none'; // [cite: 473]
}

// JavaScript змінює сторінку, використовуючи відомості з відповіді АРІ [cite: 5]
function _displayServices(data) { // [cite: 475]
    const tBody = document.getElementById('services-body'); // [cite: 476]
    tBody.innerHTML = ''; // [cite: 476]

    const button = document.createElement('button'); // [cite: 477]

    data.forEach(service => { // [cite: 478]
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Редагувати';
        editButton.className = 'btn btn-sm btn-warning me-2 fw-bold'; // Додали стилі Bootstrap
        editButton.setAttribute('onclick', `displayEditForm(${service.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Видалити';
        deleteButton.className = 'btn btn-sm btn-danger fw-bold'; // Додали стилі Bootstrap
        deleteButton.setAttribute('onclick', `deleteService(${service.id})`);

        let tr = tBody.insertRow(); // [cite: 485, 486]

        let td1 = tr.insertCell(0); // [cite: 487]
        td1.appendChild(document.createTextNode(service.name)); // [cite: 488, 489]

        let td2 = tr.insertCell(1); // [cite: 490]
        td2.appendChild(document.createTextNode(service.description)); // [cite: 491, 492]

        let td3 = tr.insertCell(2); // [cite: 493]
        td3.appendChild(document.createTextNode(service.price));

        let td4 = tr.insertCell(3); // [cite: 495]
        td4.appendChild(editButton); // [cite: 494]
        td4.appendChild(document.createTextNode(' '));
        td4.appendChild(deleteButton); // [cite: 496]
    }); // [cite: 497]

    services = data; // [cite: 498]
} // [cite: 499]