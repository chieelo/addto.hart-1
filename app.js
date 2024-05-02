let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Pearly Toploader',
        image:'product1.jpg',
        price: 50
    },
    {
        id: 2,
        name: 'Lolita Toploader',
        image: 'product2.jpg',
        price: 45
    },
    {
        id: 3,
        name: 'BlacknPink Toploader',
        image: 'product3.jpg',
        price: 45
    },
    {
        id: 4,
        name: 'Yellow Toploader',
        image: 'product5.jpg',
        price: 60
    },
    {
        id: 5,
        name: 'Resin Binder',
        image: 'product4.jpg',
        price: 320
    },
    {
        id: 6,
        name: 'Pink Petal Binder',
        image: 'product6.jpg',
        price: 250
    },
    {
        id: 7,
        name: 'Sunshine Binder',
        image: 'product7.jpg',
        price: 250
    },
    {
        id: 8,
        name: 'Sunset Binder',
        image: 'product8.jpg',
        price: 400
    },
    {
        id: 9,
        name: 'Victorian Frame charm',
        image: 'product11.jpg',
        price: 120
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
    newDiv.innerHTML = `
    <img src="${value.image}">
    <div class="title">${value.name}</div>
    <div class="price">${value.price.toLocaleString()}</div>
    <button onclick="addToCard(${key})">Add To Cart</button>`;

        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
        newDiv.innerHTML = `
    <div><img src="${value.image}"/></div>
    <div>${value.name}</div>
    <div>${value.price.toLocaleString()}</div>
    <div>
        <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
        <div class="count">${value.quantity}</div>
        <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
    </div>`;

                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}