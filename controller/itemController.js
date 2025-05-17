import CustomerModel from "../model/customerModel.js";
import { customer_db, item_db } from "../db/db.js";
// import {ItemModel} from "../model/itemModel";
import  ItemModel from "../model/itemModel.js";

function clearFields(){
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

    loadCustomers()
    clearFields()
});

function loadCustomers(){
    $('#table-body').empty();

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
        $('#table-body').append(itemData);
    })
}

$('#table-body').on('click', 'tr', function (event){
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

$('#table-body').on('click', '#btn-delete', function (event){
    Swal.fire({
        title: "Do you want to Delete this Item?",
        showCancelButton: true,
        confirmButtonText: "Yes",
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            const item_index = $(this).index();
            item_db.splice(item_index, 1);
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


