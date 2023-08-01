// Global variable to store the Bearer token
let bearerToken = null;

// Function to handle form submission on login screen
document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    const response = await fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_id: email,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error("Invalid Authorization");
    }
    const data = await response.json();
    bearerToken = data.token;
    // Move to the customer list screen after successful login
    showCustomerListScreen();
  } catch (error) {
    alert("Login failed. Please check your email and password.");
    console.error(error);
  }
});

// Function to fetch the customer list from the API
async function fetchCustomerList() {
  try {
    const response = await fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${bearerToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch customer list");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Failed to fetch customer list. Please try again later.");
    console.error(error);
    return [];
  }
}

// Function to display the customer list on the customer list screen
async function showCustomerListScreen() {
  const customerListBody = document.getElementById("customerListBody");
  customerListBody.innerHTML = "";
  const customerList = await fetchCustomerList();
  customerList.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${customer.first_name}</td>
      <td>${customer.last_name}</td>
      <td>${customer.street}</td>
      <td>${customer.address}</td>
      <td>${customer.city}</td>
      <td>${customer.state}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>
        <button onclick="deleteCustomer('${customer.uuid}')">Delete</button>
        <button onclick="showUpdateCustomerScreen('${customer.uuid}')">Edit</button>
      </td>
    `;
    customerListBody.appendChild(row);
  });
  // Show the customer list screen
  document.getElementById("customerListScreen").style.display = "block";
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("addCustomerScreen").style.display = "none";
}

// Function to handle adding a new customer
document.getElementById("addCustomerForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const street = document.getElementById("street").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!firstName || !lastName) {
    alert("First Name and Last Name are mandatory fields.");
    return;
  }

  try {
    const response = await fetch("https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        "first_name": firstName,
        "last_name": lastName,
        "street": street,
        "address": address,
        "city": city,
        "state": state,
        "email": email,
        "phone": phone,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to create customer");
    }
    alert("Customer created successfully!");
    showCustomerListScreen();
  } catch (error) {
    alert("Failed to create customer. Please try again later.");
    console.error(error);
  }
});

// Function to handle deleting a customer
async function deleteCustomer(uuid) {
  const confirmDelete = confirm("Are you sure you want to delete this customer?");
  if (!confirmDelete) {
    return;
  }
  try {
    const response = await fetch(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${uuid}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${bearerToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete customer");
    }
    alert("Customer deleted successfully!");
    showCustomerListScreen();
  } catch (error) {
    alert("Failed to delete customer. Please try again later.");
    console.error(error);
  }
}

// Function to show the add customer screen
function showAddCustomerScreen() {
  // Clear the form fields
  document.getElementById("addCustomerForm").reset();
  // Show the add customer screen
  document.getElementById("addCustomerScreen").style.display = "block";
  document.getElementById("customerListScreen").style.display = "none";
}

// // Function to show the update customer screen
// function showUpdateCustomerScreen(uuid) {

//  }

     // Function to fetch customer details using the uuid
async function fetchCustomerDetails(uuid) {
    try {
      const response = await fetch(`https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer&uuid=${uuid}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${bearerToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch customer details");
      }
      const customerDetails = await response.json();
      return customerDetails;
    } catch (error) {
      alert("Failed to fetch customer details. Please try again later.");
      console.error(error);
      return null;
    }
  }
  
  // Function to show the update customer screen with pre-filled form fields
  async function showUpdateCustomerScreen(uuid) {
    const customerDetails = await fetchCustomerDetails(uuid);
    if (!customerDetails) {
      return;
    }
  
    // Populate the form fields with customer details
    document.getElementById("updateFirstName").value = customerDetails.first_name;
    document.getElementById("updateLastName").value = customerDetails.last_name;
    document.getElementById("updateStreet").value = customerDetails.street;
    document.getElementById("updateAddress").value = customerDetails.address;
    document.getElementById("updateCity").value = customerDetails.city;
    document.getElementById("updateState").value = customerDetails.state;
    document.getElementById("updateEmail").value = customerDetails.email;
    document.getElementById("updatePhone").value = customerDetails.phone;
  
    // Show the update customer screen
    document.getElementById("updateCustomerScreen").style.display = "block";
    document.getElementById("customerListScreen").style.display = "none";
  }

// Initialize the app with the login screen
document.getElementById("loginScreen").style.display = "block";
document.getElementById("customerListScreen").style.display = "none";
document.getElementById("addCustomerScreen").style.display = "none";
