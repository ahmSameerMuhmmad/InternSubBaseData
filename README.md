## InternSunBaseData

The Customer Management System is a web application that allows users to manage customer data. 
It provides features to add new customers, view the list of existing customers, update customer information,
and delete customers as needed.


### Features

####Authentication:

Users can log in using their credentials (email and password) to access the application. The API utilizes Bearer authentication, providing a bearer token for subsequent API calls.


####Create a New Customer

Users can create a new customer by providing mandatory details such as first name, last name, street, address, city, state, email, and phone number. The application validates the input and displays appropriate messages in case of missing information.


####View Customer List

The application allows users to view the list of all existing customers, displaying their first name, last name, street, address, city, state, email, and phone number.


####Update Customer Information

Users can update customer information by providing the unique UUID of the customer along with the updated details. The application ensures that the UUID is valid and the body contains the required data.



####Delete a Customer

Users can delete a customer by providing the UUID of the specific customer. The application verifies the existence of the customer with the provided UUID before performing the deletion.



###Getting Started

To run the application locally, follow the installation instructions provided in the README file. 
The project uses HTML, JavaScript, and API calls to interact with the Customer Management System.


###Usage

Upon running the application, users are presented with a login screen. 
After successful authentication, users can navigate through different screens to manage customers.


###API Documentation

The project interacts with the Customer Management System API, which provides endpoints for authentication, customer creation, retrieval, update, and deletion.
Refer to the API documentation for details on the API endpoints, request/response formats, and authentication methods.


