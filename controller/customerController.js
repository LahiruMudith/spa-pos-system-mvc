import CustomerModel from "../model/customerModel.js";
import {customer_db, item_db} from "../db/db.js";

function clearFields(){
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
    clearFields()
});

function loadCustomers(){
    $('#table-body').empty();

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
        $('#table-body').append(customer_data);
    })
}

$('#table-body').on('click', 'tr', function (event){
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

$('#table-body').on('click', '#btn-delete', function (event){
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


