const BASE_URL = 'http://localhost:3001'; // Replace with your backend server URL

const loginBtn = document.getElementById('loginBtn');
const customerList = document.getElementById('customerList');
const customerTableBody = document.getElementById('customerTableBody');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

loginBtn.addEventListener('click', async () => {
  try {
    const response = await authenticateUser(usernameInput.value, passwordInput.value);
    if (response.token) {
      // Hide login screen and show customer list
      customerList.classList.remove('hidden');
      customerTableBody.innerHTML = ''; // Clear existing data
      const customers = await getCustomerList(response.token);
      populateCustomerTable(customers);
    } else {
      alert('Login failed');
    }
  } catch (error) {
    // console.error('Login error:', error);
    alert('An error occurred during login');
  }
});

async function authenticateUser(username, password) {
  try {
    const response = await fetch(`${BASE_URL}/sunbase/portal/api/assignment_auth.jsp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login_id: username,
        password: password
      })
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to authenticate user');
  }
}

async function getCustomerList(token) {
  try {
    const response = await fetch(`${BASE_URL}/sunbase/portal/api/assignment.jsp?cmd=get_customer_list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch customer list');
  }
}

function populateCustomerTable(customers) {
  customers.forEach(customer => {
    const row = customerTableBody.insertRow();
    row.insertCell().textContent = customer.first_name;
    row.insertCell().textContent = customer.last_name;
    row.insertCell().textContent = customer.email;
    row.insertCell().textContent = customer.phone;
    const actionCell = row.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async () => {
      try {
        const response = await deleteCustomer(customer.uuid);
        if (response.message === 'Successfully deleted') {
          // Remove the row from the table
          customerTableBody.removeChild(row);
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('An error occurred while deleting the customer');
      }
    });
    actionCell.appendChild(deleteButton);
  });
}

async function deleteCustomer(uuid) {
  try {
    const response = await fetch(`${BASE_URL}/sunbase/portal/api/assignment.jsp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cmd: 'delete',
        uuid: uuid
      })
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to delete customer');
  }
}




const first_name=document.getElementById("firstName");
const last_name=document.getElementById("lastName");
const email=document.getElementById("email");
const phone=document.getElementById("phone");
const tBody=document.getElementById("customerTableBody");

function addCustomer(){
  console.log("abc");
  const container=document.getElementById("customerContainer");
  container.innerHTML=`<form >
  <input type="text" placeholder="First Name" id="firstName">
  <input type="text" placeholder="Last Name" id="lastName">
  <input type="email" placeholder="Email" id="email">
  <input type="text" placeholder="Phone" id="phone">
  <button onClick="addCustomerForm()" type="submit">submit</button>
</form>`


}
function addCustomerForm(event){
  event.preventDefault();
  console.log(tBody);
  const trElement=document.createElement("tr");
  trElement.innerHTML=`<td>${first_name}</td>
  <td>${last_name}</td>
  <td>${address}</td>
  <td>${email}</td>
  <td>${phone}</td>
  <td>
  <button id="deleteButton">Delete</button>
  </td>`
  tBody.append(trElement);
 

}


