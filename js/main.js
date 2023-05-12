const REACT_APP_AWS_API_URL = 'http://ec2-54-159-17-173.compute-1.amazonaws.com:3000/api'
const REACT_APP_AWS_AUTH_API_URL = 'http://ec2-54-159-17-173.compute-1.amazonaws.com:4000/api'

const user = JSON.parse(sessionStorage.getItem('user'))
if (!user) {
    sessionStorage.clear()
    window.location.href = 'login.html';
}

const SaveNewItem = async (data) => {
    const product = {
        name: data.name, description: data.description, price: parseInt(data.price), quantity: parseInt(data.quantity)
    }
    const response = await fetch(`${REACT_APP_AWS_API_URL}/products`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${user.token}`
        }
    });
    if (!response.ok) { throw new Error('Network response was not ok'); }
    const jsonResponse = await response.json();
    alert(JSON.stringify(jsonResponse))
}




const GetProducts = async () => {
    const response = await fetch(`${REACT_APP_AWS_API_URL}/products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${user.token}`
        },
    });
    if (!response.ok) { throw new Error('Network response was not ok'); }
    const jsonResponse = await response.json();
    reloadCards(jsonResponse)
}

const reloadCards = (jsonResponse) => {
    if (sessionStorage.getItem('products')) {
        const element = document.getElementById("product-container");
        element.innerHTML = '';
    }
    sessionStorage.setItem('products', JSON.stringify(jsonResponse))
    mapProducts()
}

const UpdateItems = async (product) => {
    let obj = {
        "ID": product.ID,
        "name": product.name,
        "description": product.description,
        "price": parseInt(product.price),
        "quantity": parseInt(product.quantity)
    }
    const response = await fetch(`${REACT_APP_AWS_API_URL}/products/${product.ID}`, {
        method: 'PUT',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${user.token}`
        }
    });
    if (!response.ok) { throw new Error('Network response was not ok'); }
    const products = JSON.parse(sessionStorage.getItem('products'))
    let index = products.findIndex(item => item.ID === product.ID)
    products.splice(index, 1, obj);
    reloadCards(products)
}

const deleteProduct = async (id) => {
    const response = await fetch(`${REACT_APP_AWS_API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${user.token}`
        }
    });
    if (!response.ok) { throw new Error('Network response was not ok'); }
    const products = JSON.parse(sessionStorage.getItem('products'))
    let index = products.findIndex(item => item.ID === id)
    products.splice(index, 1);
    reloadCards(products)
}
//map the cards
const mapProducts = () => {
    var products = JSON.parse(sessionStorage.getItem('products'));
    var productContainer = document.getElementById('product-container');
    productContainer.style.border = 'none';
    if (products && products.length > 0 && productContainer) {
        products.forEach(function (product) {
            var card = document.createElement('div');
            card.classList.add('card', 'm-2');



            var cardBody = document.createElement('div');
            cardBody.classList.add('card-body');


            var cardID = document.createElement('h5');
            cardID.classList.add('card-title');
            cardID.style.color = '#FFFFFF';
            cardID.textContent = 'ID: ' + product.ID;


            var cardTitle = document.createElement('p');
            cardTitle.classList.add('card-text');
            cardTitle.style.color = '#FFFFFF';
            cardTitle.style.display = 'inline-block';
            cardTitle.style.width = 'calc(100%)';
            cardTitle.textContent = 'Name: ' + product.name;

            var cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.style.color = '#FFFFFF';
            cardText.style.display = 'inline-block';
            cardText.style.width = 'calc(100% )';
            cardText.textContent = 'Description: ' + product.description;

            var cardPrice = document.createElement('p');
            cardPrice.classList.add('card-text');
            cardPrice.style.color = '#FFFFFF';
            cardPrice.style.display = 'inline-block';
            cardPrice.style.width = 'calc(100% )';
            cardPrice.textContent = 'Price: ' + product.price;

            var cardqty = document.createElement('p');
            cardqty.classList.add('card-text');
            cardqty.style.color = '#FFFFFF';
            cardqty.style.display = 'inline-block';
            cardqty.style.width = 'calc(100% )';
            cardqty.textContent = 'Quantity: ' + product.quantity;

            var addButton = document.createElement('button');
            addButton.classList.add('add-btn', 'btn', 'rounded', 'my-2');
            addButton.textContent = 'Edit';

            var delButton = document.createElement('button');
            delButton.classList.add('add-btn', 'btn', 'rounded', 'products-buttons', 'delete-btn', 'btn-danger', 'delBtn');
            delButton.title = 'delBtn';
            delButton.textContent = 'Delete';


            delButton.onclick = function () { deleteProduct(product.ID); };


            addButton.addEventListener('click', function () {
                if (cardTitle.firstChild.nodeType === Node.TEXT_NODE) {
                    var inputTitle = document.createElement('input');
                    inputTitle.type = 'text';
                    inputTitle.value = product.name;
                    inputTitle.title = 'name';
                    inputTitle.style.color = '#000000';
                    inputTitle.style.width = 'calc(100%)';

                    var inputDesc = document.createElement('input');
                    inputDesc.type = 'text';
                    inputDesc.value = product.description;
                    inputTitle.title = 'description';
                    inputDesc.style.color = '#000000';
                    inputDesc.style.width = 'calc(100%)';

                    var inputPrice = document.createElement('input');
                    inputPrice.type = 'text';
                    inputPrice.value = product.price;
                    inputTitle.title = 'price';
                    inputPrice.style.color = '#000000';
                    inputPrice.style.width = 'calc(100%)';

                    var inputQty = document.createElement('input');
                    inputQty.type = 'text';
                    inputQty.value = product.quantity;
                    inputQty.style.color = '#000000';
                    inputTitle.title = 'quantity';
                    inputQty.style.width = 'calc(100%)';

                    cardTitle.replaceChild(inputTitle, cardTitle.firstChild);
                    cardText.replaceChild(inputDesc, cardText.firstChild);
                    cardPrice.replaceChild(inputPrice, cardPrice.firstChild);
                    cardqty.replaceChild(inputQty, cardqty.firstChild);
                    addButton.textContent = 'Save';
                } else {
                    var updatedProduct = {
                        ID: product.ID,
                        name: cardTitle.firstChild.value,
                        description: cardText.firstChild.value,
                        price: cardPrice.firstChild.value,
                        quantity: cardqty.firstChild.value
                    };

                    var textTitle = document.createTextNode('Name: ' + cardTitle.firstChild.value);
                    var textDesc = document.createTextNode('Description: ' + cardText.firstChild.value);
                    var textPrice = document.createTextNode('Price: ' + cardPrice.firstChild.value);
                    var textQty = document.createTextNode('Quantity: ' + cardqty.firstChild.value);
                    cardTitle.replaceChild(textTitle, cardTitle.firstChild);
                    cardText.replaceChild(textDesc, cardText.firstChild);
                    cardPrice.replaceChild(textPrice, cardPrice.firstChild);
                    cardqty.replaceChild(textQty, cardqty.firstChild);
                    addButton.textContent = 'Edit';
                    UpdateItems(updatedProduct)
                }
            });
            cardBody.appendChild(cardID);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(cardPrice);
            cardBody.appendChild(cardqty);
            cardBody.appendChild(addButton);
            cardBody.appendChild(delButton);
            card.appendChild(cardBody);
            productContainer.appendChild(card);
        });
    }
}





//event listeners
const cancelButton = document.getElementById('cancel');
const addNew = document.getElementById('add-new');
const saveItem = document.getElementById('save-item');
const logout = document.getElementById('logout');
const container = document.getElementById('add-item');

saveItem.addEventListener('click', async function () {
    const inputElements = document.querySelectorAll('#add-item input');
    const values = {};
    inputElements.forEach(input => {
        if (input.title === 'price' || input.title === 'quantity') {
            values[input.title] = parseInt(input.value);
        } else {
            values[input.title] = input.value;
        }
    });
    await SaveNewItem(values);
    await GetProducts()
    container.style.display = 'none';

});

cancelButton.addEventListener('click', function () {
    container.style.display = 'none';
});
addNew.addEventListener('click', function () {
    container.style.display = 'block';
});
logout.addEventListener('click', function () {
    sessionStorage.clear()
    window.location.href = 'login.html';

});

window.addEventListener('load', () => {
    GetProducts();
});

