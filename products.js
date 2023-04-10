class products {
    constructor(id, image, name, quantityName, quantityDrink, price, priceSale) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.quantityName = quantityName;
        this.quantityDrink = quantityDrink;
        this.price = price;
        this.priceSale = priceSale;
    }
}
let image1 = "Image/cart-01.png";
let image2 = "Image/cart-02.png";
let image3 = "Image/cart-03.png";
let image4 = "Image/cart-04.png";
let image5 = "Image/cart-05.png";
let image6 = "Image/cart-06.png";
let image7 = "Image/cart-07.jpg";

let combo40 = new products(1, image1, "Combo 40,000đ", "01 Gà Tuyết Vàng", "01 Pepsi (M)", 40.000, 54.000);
let combo68 = new products(2, image2, "Combo 68,000đ", "01 Gà Tuyết Vàng", "01 khoai tây lắc", 68.000, 93.000);
let comboBurger1 = new products(3, image3, "Combo LChicken Burger1", "01 Combo LChicken Burger", "01 khoai tây lắc", 79.000, 102.000);
let comboBurger2 = new products(4, image4, "Combo LChicken Burger2", "02 Gà rán", "01 Burger LChicken", 169.000, 207.000);
let comboBestBurger = new products(5, image5, "Combo Best Burger", "01 Burger LChicken", "01 Burger Bulgogi", 139.000, 185.000);
let comboMala1 = new products(6, image6, "Combo Mala1", "03 Gà Sốt Mala", "01 Pepsi (M)", 122.000, 134.000);
let comboMala2 = new products(7, image7, "Combo Mala2", "01 Gà Sốt Mala", "01 Khoai tây chiên (M)", 65.000, 83.000);
let listProductsBestSeller = [];
let listProducts = [combo40, combo68, comboBurger1, comboBurger2, comboBestBurger, comboMala1, comboMala2];
// localStorage.listProducts = JSON.stringify(listProducts);
listProducts = localStorage.listProducts ? JSON.parse(localStorage.listProducts) : [];
listProductsBestSeller = localStorage.listProductsBestSeller ? JSON.parse(localStorage.listProductsBestSeller) : [];
function renderProducts(products) {
    return `<div class="col-lg-3 px-0">
    <div class="card mx-3 my-3 py-3 px-3">
        <img src=${products.image} class="card-img-top" alt="...">
        <div class="card-body">
            <div class="row card-body-name">
                <p class="col-lg-10">${products.name}</p>
                <p class="col-lg-2"><i class="fa-sharp fa-regular fa-heart"></i></p>
            </div>
            <div class="card-body-quantity">
                <p>${products.quantityName}</p>
                <p>${products.quantityDrink}</p>
            </div>
            <hr>
            <div class="card-body-price">
                <p class="price">${products.price} <span>đ</span></p>
                <p class="price-sale"><img src="https://www.lotteria.vn/grs-static/images/icon-discount.svg"
                        alt="">${products.priceSale}<span>đ</span>
                </p>
            </div>
            <button data-id=${products.id} type="button" class="btn btn-addcart btn-warning">Thêm vào giỏ hàng</button>
        </div>
    </div>
</div>`
}
// console.log(renderProducts(combo40));

function renderListProducts(listProducts) {
    let productsEl = document.querySelector('#products');
    let productsHtml = "";
    for (let item of listProducts) {
        productsHtml += renderProducts(item);
    }
    productsEl.innerHTML = productsHtml;
    addCart();
    // renderListCartProducts(listCart);
}
// console.log(renderListProducts (listProducts));
// ---------------add---------

function addProducts() {
    let btnAdd = document.querySelector('.btn-add');
    // console.log (btnAdd);
    btnAdd.addEventListener('click', function () {
        let id = document.querySelector('#id').value;
        let name = document.querySelector('#name').value;
        let quantityName = document.querySelector('#quantityName').value;
        let quantityDrink = document.querySelector('#quantityDrink').value;
        let price = document.querySelector('#price').value;
        let priceSale = document.querySelector('#priceSale').value;
        let kindOfFood = document.querySelector('#cars').value;
        console.log(kindOfFood);
        let newProducts = new products(id, image1, name, quantityName, quantityDrink, price, priceSale);

        if (kindOfFood == "Khuyến Mãi"){
            listProducts.push(newProducts);
        }else {
            listProductsBestSeller.push(newProducts);
        }
        localStorage.listProducts = JSON.stringify(listProducts);
        localStorage.listProductsBestSeller = JSON.stringify(listProductsBestSeller);

        // document.querySelector('#id').value = "";
        // document.querySelector('#name').value = "";
        // document.querySelector('#quantityName').value = "";
        // document.querySelector('#quantityDrink').value = "";
        // document.querySelector('#price').value = "";
        // document.querySelector('#priceSale').value = "";
        // renderListProducts(listProducts);
        // console.log(listProducts);
        renderListTable(listProducts);
        DeleteProducts();
        // updateProducts();
    })
}




function renderListDeleteEdit(products) {
    return `<tr class = "row${products.id}">
    <th scope="row">${products.id}</th>
    <td>${products.name}</td>
    <td>${products.quantityName}</td>
    <td>${products.quantityDrink}</td>
    <td>${products.price}</td>
    <td>${products.priceSale}</td>
    <td><button type="button" data-id=${products.id} class="btn btn-delete btn-warning">Delete</button></td>
    <td><button type="button" data-id=${products.id} class="btn btn-edit btn-warning">Edit</button></td>
  </tr>`
}

function renderListTable(listProducts) {
    let list = document.querySelector('#list');
    list.innerHTML="";
    let listHtml;
    for (let item of listProducts) {
        listHtml += renderListDeleteEdit(item);
    }
    list.innerHTML = listHtml;
    addProducts();
    DeleteProducts();
}


// -------- Delete -------
function DeleteProducts() {
    let btnDelete = document.querySelectorAll('.btn-delete');
    btnDelete.forEach(function (item) {
        item.addEventListener('click', function () {
            let idDelete = this.getAttribute('data-id');
            if (confirm('do u want delete it???')) {
                let index = listProducts.findIndex(function (item) {
                    return item.id == idDelete;
                })
                console.log(index);
                if (index >= 0) {
                    listProducts.splice(index, 1);
                }
                let deleteProduct = document.querySelector(`.row${idDelete}`)
                deleteProduct.remove();
                // renderListProducts (listProducts);
                localStorage.listProducts = JSON.stringify(listProducts);
                renderListProducts(listProducts);
            }
        })
    })
}

// ----------- edit-------
let idUpdate;
let btnEdit = document.querySelectorAll('.btn-edit');

btnEdit.forEach(function (item) {
    item.addEventListener('click', function () {
        let idEdit = this.getAttribute('data-id');
        idUpdate = idEdit;
        let index = listProducts.findIndex(function (item) {
            return item.id == idEdit;
        })
        if (index >= 0) {
            let productFind = listProducts[index];
            document.querySelector('#id').value = productFind.id;
            document.querySelector('#name').value = productFind.name;
            document.querySelector('#quantityName').value = productFind.quantityName;
            document.querySelector('#quantityDrink').value = productFind.quantityDrink;
            document.querySelector('#price').value = productFind.price;
            document.querySelector('#priceSale').value = productFind.priceSale;
        }
    })
})



// -------------- Update ---------



// -------cart------------
let listCart = [];
listCart = localStorage.listCart ? JSON.parse(localStorage.listCart) : [];

function addCart() {
    let btnAddCart = document.querySelectorAll('.btn-addcart');
    //  console.log(btnAddCart);
    btnAddCart.forEach(function (item) {
        item.addEventListener('click', function () {
            // console.log(1);
            let idAddCart = this.getAttribute('data-id');
            // console.log(idAddCart);
            let index = listProducts.findIndex(function (item) {
                return item.id == idAddCart;
            })
            // console.log(index);
            if (index >= 0) {
                let productFind = listProducts[index];
                listCart.push(productFind);
                localStorage.listCart = JSON.stringify(listCart);

            }
            renderListCartProducts(listCart);

        })
    })
}

function renderListCart(products) {
    return `<tr>
    <td class="image" ><img width="150px" height="100px" src="${products.image}" alt=""></td>
   <td class="name">${products.name}</td>
   <td class="price">${products.price}</td>
   <td class="pricesale">${products.priceSale}</td>
   <td><button type="button" class="btn btn-danger">Xoá</button>
                </td>
</tr>`
}
function  renderListCartProducts(listCart){
    let list = document.querySelector('#listProductsCart');
    // console.log(list);
    let listHtml="";
    for (let item of listCart) {
        listHtml += renderListCart(item);
    }
    list.innerHTML = listHtml;
}



    
   


