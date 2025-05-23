import CustomerModel from "../model/customerModel.js";
import {customer_db, item_db, order_db} from "../db/db.js";
import ItemModel from "../model/itemModel.js";
import OrderModel from "../model/OrderModel.js";


$("#customer-btn").on('click', function (event) {
    $('#place-order-section').css('display', "none");
    $('#item-section').css('display', "none");
    $('#customer-section').css('display', "block");
    $('#customer-section').addClass("active");
});
$("#item-btn").on('click', function (event) {
    $('#place-order-section').css('display', "none");
    $('#customer-section').css('display', "none");
    $('#item-section').css('display', "block");
});
$("#place-order-btn").on('click', function (event) {
    $('#customer-section').css('display', "none");
    $('#item-section').css('display', "none");
    $('#place-order-section').css('display', "block");
});

//////////////////////Customer//////////////////////////////
function clearCustomerFields(){
    $('#customerId').val("");
    $('#firstName').val("");
    $('#lastName').val("");
    $('#phoneNumber').val("");
    $('#address').val("");
    $('#btnRegister').text('Register');
}
$('#btnRegister').on('click', function (event) {
    event.preventDefault(); // Prevent form from submitting and refreshing
    let btnText = $('#btnRegister').text();

    let customerId = $('#customerId').val();
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let phoneNumber = $('#phoneNumber').val();
    let address = $('#address').val();

    //Customer Register
    if (btnText === 'Register'){
        let isNewCustomer = true;

        if (customerId === "" || firstName === "" || lastName === "" || phoneNumber === "" || address === "") {
            Swal.fire({
                title: "Enter data to all fields",
                icon: "error"
            });
            return;
        }
        customer_db.forEach(function (customer){
            if (customer.cId === $('#customerId').val()){
                Swal.fire({
                    title: "Customer Already exists",
                    text: "Please enter a different ID",
                    icon: "error"
                });
                isNewCustomer = false;
            }
        });
        if (!isNewCustomer){
            return;
        }

        let customer = new CustomerModel(customerId, firstName, lastName, phoneNumber, address);
        customer_db.push(customer);
        Swal.fire({
            title: "Customer Saved",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
    }

    //Customer Update
    if (btnText === 'Update'){

        if (customerId === "" || firstName === "" || lastName === "" || phoneNumber === "" || address === "") {
            Swal.fire({
                title: "Enter data to all fields",
                icon: "error"
            });
            return;
        }

        customer_db.forEach(function (customer){
            if (customer.cId === customerId){
                customer.firstName = firstName;
                customer.lastName = lastName;
                customer.phoneNumber = phoneNumber;
                customer.address = address;
            }
        });
        // customer_db.push(customer);
        // Swal.fire({
        //     title: "Customer Saved",
        //     icon: "success",
        //     timer: 1500,
        //     showConfirmButton: false
        // });
    }

    loadCustomers()
    clearCustomerFields()
});

function loadCustomers(){
    $('#customer-table-body').empty();

    customer_db.map(function (customer){
        let customerId = customer.cId
        let firstName = customer.firstName
        let lastName = customer.lastName
        let phoneNumber = customer.phoneNumber
        let address = customer.address

        let customer_data = `<tr>
                <td>${customerId}</td>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${phoneNumber}</td>
                <td>${address}</td>
                <td><button type="button" class="btn btn-danger" id="btn-delete">Delete</button></td>
            </tr>`
        $('#customer-table-body').append(customer_data);
    })
}

$('#customer-table-body').on('click', 'tr', function (event){
    if ($(event.target).closest('#btn-delete').length > 0) {
        return; // skip row click if delete button was clicked
    }

    const customer_index = $(this).index()
    let selected_customer = customer_db[customer_index];

    $('#customerId').val(selected_customer.cId);
    $('#firstName').val(selected_customer.firstName);
    $('#lastName').val(selected_customer.lastName);
    $('#phoneNumber').val(selected_customer.phoneNumber);
    $('#address').val(selected_customer.address);
    $('#btnRegister').text('Update');
    $('#customerId').prop('disabled', true);
});

$('#customer-table-body').on('click', '#btn-delete', function (event){
    Swal.fire({
        title: "Do you want to Delete this Customer?",
        showCancelButton: true,
        confirmButtonText: "Yes",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const customer_index = $(this).index();
            customer_db.splice(customer_index, 1);
            loadCustomers();
            Swal.fire({
                title: "Deleted",
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            });
        }
    });
});

//////////////////////Item//////////////////////////////
function clearItemFields(){
    $('#itemId').val("");
    $('#itemName').val("");
    $('#qty').val("");
    $('#price').val("");
    $('#btnAdd').text('Add');
}
$('#btnAdd').on('click', function (event) {
    event.preventDefault(); // Prevent form from submitting and refreshing
    console.log('btnAdd clicked');
    let btnText = $('#btnAdd').text();

    let itemId = $('#itemId').val();
    let itemName = $('#itemName').val();
    let qty = $('#qty').val();
    let price = $('#price').val();

    //Customer Register
    if (btnText === 'Add'){
        let isNewItem = true;

        if (itemId === "" || itemName === "" || qty === "" || price === "") {
            Swal.fire({
                title: "Enter data to all fields",
                icon: "error"
            });
            return;
        }
        item_db.forEach(function (item){
            if (item.iId === itemId){
                Swal.fire({
                    title: "Item Already exists",
                    text: "Please enter a different ID",
                    icon: "error"
                });
                isNewItem = false;
            }
        });
        if (!isNewItem){
            return;
        }

        let item = new ItemModel(itemId, itemName, qty, price);
        item_db.push(item);
        Swal.fire({
            title: "Item Saved",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
        });
    }

    //Customer Update
    if (btnText === 'Update'){

        if (itemId === "" || itemName === "" || qty === "" || price === "") {
            Swal.fire({
                title: "Enter data to all fields",
                icon: "error"
            });
            return;
        }

        item_db.forEach(function (item){
            if (item.iId === itemId){
                item.itemName = itemName;
                item.qty = qty;
                item.price= price;
            }
        });
        // customer_db.push(customer);
        // Swal.fire({
        //     title: "Customer Saved",
        //     icon: "success",
        //     timer: 1500,
        //     showConfirmButton: false
        // });
    }

    loadItems()
    clearItemFields()
});

function loadItems(){
    $('#item-table-body').empty();

    item_db.map(function (item){
        let itemId = item.iId;
        let itemName = item.itemName;
        let qty = item.qty;
        let price = item.price;

        let itemData = `<tr>
                <td>${itemId}</td>
                <td>${itemName}</td>
                <td>${qty}</td>
                <td>${price}</td>
                <td><button type="button" class="btn btn-danger" id="btn-delete">Delete</button></td>
            </tr>`
        $('#item-table-body').append(itemData);
    })
}

$('#item-table-body').on('click', 'tr', function (event){
    if ($(event.target).closest('#btn-delete').length > 0) {
        return; // skip row click if delete button was clicked
    }

    const item_index = $(this).index()
    let selected_item = item_db[item_index];

    $('#itemId').val(selected_item.iId);
    $('#itemName').val(selected_item.itemName);
    $('#qty').val(selected_item.qty);
    $('#price').val(selected_item.price);
    $('#btnAdd').text('Update');
    $('#itemId').prop('disabled', true);


});

$('#item-table-body').on('click', '#btn-delete', function (event){
    Swal.fire({
        title: "Do you want to Delete this Item?",
        showCancelButton: true,
        confirmButtonText: "Yes",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const item_index = $(this).index();
            item_db.splice(item_index, 1);
            loadItems();
            Swal.fire({
                title: "Deleted",
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            });
        }
    });
});

//////////////////////Place Order//////////////////////////////
var cart = [];
var total = 0;
$("#discount").val(0);

// loadId()

// function loadId(){
//     console.log(order_db);
//     let lastOrderId = order_db[order_db.length - 1];
//     console.log(lastOrderId);
// }

$('#btnSearchCustomer').on('click', function(event) {
    event.preventDefault();
    console.log(customer_db);
    let cudtomerId = $('.customerId').val();
    let isNewCustomer = true;
    customer_db.forEach(function (customer){
        if (customer.cId === cudtomerId){
            isNewCustomer = false;
            console.log(isNewCustomer)
            $('#place-order-table-body').empty();
            $('.firstName').val(customer.firstName);
            $('.lastName').val(customer.lastName);
            $('.phoneNumber').val(customer.phoneNumber);
            $('.address').val(customer.address);
        }
    })
    if (isNewCustomer){
        Swal.fire({
            title: "Can't findCustomer ",
            icon: "warning",
            timer: 1000,
            // position: "bottom-end",
            showConfirmButton: false,
            // backdrop: false
        });
    }
});

$('#btnSearchItem').on('click', function(event) {
    event.preventDefault();
    let itemId = $('.itemId').val();

    item_db.forEach(function (item){
        if (item.iId === itemId){
            if (item.qty === 0) {
                Swal.fire({
                    title: "This Product Out of stock",
                    icon: "error",
                    timer: 1000
                });
                return;
            }

            $('.itemName').val(item.itemName);
            $('.qty').val(item.qty);
            $('.price').val(item.price);
        }
    })
});

$('#btnAddToCart').on('click', function (event){
    event.preventDefault();

    // if ($('#firstName').val() === "") {
    //     Swal.fire({
    //         title: "Please select a customer",
    //         icon: "error",
    //         timer: 1000
    //     });
    //     return;
    // }
    if ($('.itemName').val() === "") {
        Swal.fire({
            title: "Please select a item",
            icon: "error",
            timer: 1000
        });
        return;
    }
    if ($('.orderQty').val() === "") {
        Swal.fire({
            title: "Please fill the order quantity",
            icon: "error",
            timer: 1000
        });
        return;
    }

    let itemId = $('.itemId').val();
    let itemName = $('.itemName').val();
    let qty = $('.qty').val();
    let price = $('.price').val();
    let orderQty = $('.orderQty').val();
    let totalPrice = Number(price) * Number(orderQty);

    let isValidItem = true;
    item_db.forEach(function (item) {
        if (item.iId === itemId) {
            if (Number(orderQty) > Number(item.qty)) {
                Swal.fire({
                    title: "Not enough stock",
                    icon: "error",
                    timer: 1000
                });
                isValidItem = false;
            } else {
                item.qty = Number(item.qty) - Number(orderQty);
            }
        }
    });

    if (!isValidItem){
        return;
    }

    let item = {itemId, itemName, price, orderQty, totalPrice};
    let isNewItem = true;
    cart.forEach(function (cart){
        if (cart.itemId === itemId){
            cart.orderQty = Number(orderQty) + Number(cart.orderQty);
            isNewItem = false;
        }
    });
    if (isNewItem){
        cart.push(item);
    }
    loadCart();
});

function loadCart(){
    $('#place-order-table-body').empty();
    total = 0;
    cart.forEach(function (cart){
        let itemData = `<tr class="row">
                            <td class="col">${cart.itemId}</td>
                            <td class="col">${cart.itemName}</td>
                            <td class="col">${cart.orderQty}</td>
                            <td class="col">${cart.price}</td>
                            <td class="col">${cart.totalPrice}</td>
                            <td class="col"><button type="button" class="btn btn-danger" id="delete-btn">Delete</button></td>
                        </tr>`

        $('#place-order-table-body').append(itemData);

        total = Number(total) + ((Number(cart.price) * Number(cart.orderQty)));
    });
    $('#lblTotal').text(`TOTAL : ${total} /=`);
}
$('#btn-place-order').on('click', function (event){
    event.preventDefault();

    if ($('.firstName').val() === "") {
        Swal.fire({
            title: "Please select a customer",
            icon: "error",
            timer: 1000
        });
        return;
    }
    if (cart.length === 0){
        Swal.fire({
            title: "Please add items to cart",
            icon: "error",
            timer: 1000
        });
        return;
    }
    if ($('#cash').val() === 0 || $('#cash').val() === "") {
        Swal.fire({
            title: "Please enter cash",
            icon: "error",
            timer: 1000
        });
        return;
    }
    let customerId = $('.customerId').val();
    let customerName = $('.firstName').val() + " " + $('.lastName').val();
    let phoneNumber = $('.phoneNumber').val();
    let orderDate = new Date().toLocaleDateString();
    let orderId = $('#orderId').val();
    let cash = $('#cash').val();
    let balance = $('#balance').val();
    let discount = $('#discount').val();
    let items = [];
    cart.forEach(function (cart){
        let item = {
            itemId: cart.itemId,
            itemName: cart.itemName,
            qty: cart.orderQty,
            price: cart.price,
            totalPrice : Number(cart.price) * Number(cart.orderQty)
        }
        items.push(item);
    });
    // if (Number(cash) <= total) {
    //     Swal.fire({
    //         title: "Enter Valid Cash Amount",
    //         icon: "error",
    //         timer: 1000
    //     });
    //     return;
    // }
    let order = new OrderModel(orderId, orderDate, customerId, customerName, phoneNumber, total,cash, balance, discount, items);
    order_db.push(order);
    Swal.fire({
        title: "Done",
        icon: "success",
        timer: 1000
    });
    console.log(order_db);
});

$("#cash").on('keyup', function (event){
    let discount = $("#discount").val();
    let cash  = $("#cash").val();
    let balance = 0;
    let discountPrice = discount * total / 100;


    console.log(total);
    if (total <= Number(cash)) {
        $("#balance").val(Number(cash) - (total - discountPrice));
    }
});
$('#place-order-table-body').on('click', '#delete-btn', function (event){
    Swal.fire({
        title: "Do you want to Delete this Item?",
        showCancelButton: true,
        confirmButtonText: "Yes",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const item_index = $(this).index();
            let item = cart[item_index];
            cart.splice(item_index, 1);
            item_db.forEach(function (item){
                if (item.iId === item.itemId){
                    item.qty = Number(item.qty) + Number(item.orderQty);
                }
            });
            loadItems();
            Swal.fire({
                title: "Deleted",
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            });
        }
        loadCart();
    });

});



