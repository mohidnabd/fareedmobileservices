const loginForm = document.getElementById('login-form');
const mainLoginForm = document.getElementById('login-form1');
const mainContent = document.getElementById('main-content');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'fareed' && password === 'letmein2024') {
        loginForm.reset();
        loginForm.style.display = 'none';
        mainContent.style.display = 'block';
        mainLoginForm.style.display= 'none';
    } else {
        alert('Invalid username or password');
    }
});


const customerForm = document.getElementById('customer-form');
const recordsTable = document.getElementById('records-body');
const weeklyIncomeElement = document.getElementById('weekly-income');
const monthlyIncomeElement = document.getElementById('monthly-income');
const yearlyIncomeElement = document.getElementById('yearly-income');
let weeklyIncome = parseFloat(localStorage.getItem('weeklyIncome')) || 0;
let monthlyIncome = parseFloat(localStorage.getItem('monthlyIncome')) || 0;
let yearlyIncome = parseFloat(localStorage.getItem('yearlyIncome')) || 0;

// Load existing records from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const records = JSON.parse(localStorage.getItem('records')) || [];
    records.forEach(record => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
        <td>${record.name}</td>
        <td>${record.phone}</td>
        <td>${record.device}</td>
        <td>${record.issue}</td>
        <td>${record.date}</td>
        <td>${record.amount}</td>
        `;
        recordsTable.appendChild(newRow);
    });
    updateIncomeDisplay();
});

customerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const device = document.getElementById('device').value;
    const issue = document.getElementById('issue').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${name}</td>
    <td>${phone}</td>
    <td>${device}</td>
    <td>${issue}</td>
    <td>${date}</td>
    <td>${amount}</td>
    <td><button class="delete-btn">Delete</button></td>
    `;
    recordsTable.appendChild(newRow);

    // Update income
    weeklyIncome += amount;
    monthlyIncome += amount;
    yearlyIncome += amount;

    updateIncomeDisplay();

    // Save record to localStorage
    const records = JSON.parse(localStorage.getItem('records')) || [];
    records.push({ name, phone, device, issue, date, amount });
    localStorage.setItem('records', JSON.stringify(records));
});

function updateIncomeDisplay() {
    weeklyIncomeElement.textContent = weeklyIncome.toFixed(2);
    monthlyIncomeElement.textContent = monthlyIncome.toFixed(2);
    yearlyIncomeElement.textContent = yearlyIncome.toFixed(2);

    // Save income to localStorage
    localStorage.setItem('weeklyIncome', weeklyIncome);
    localStorage.setItem('monthlyIncome', monthlyIncome);
    localStorage.setItem('yearlyIncome', yearlyIncome);
}
function searchRecords() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#records-body tr');

    rows.forEach(row => {
        const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        if (name.includes(searchValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const row = event.target.parentElement.parentElement;
        const amount = parseFloat(row.querySelector('td:nth-child(6)').textContent);
        
        // Update income
        weeklyIncome -= amount;
        monthlyIncome -= amount;
        yearlyIncome -= amount;

        // Update income display
        updateIncomeDisplay();

        // Remove the row from the table
        row.remove();

        // Update records in localStorage
        const records = JSON.parse(localStorage.getItem('records')) || [];
        const rowIndex = Array.from(row.parentNode.children).indexOf(row);
        records.splice(rowIndex, 1);
        localStorage.setItem('records', JSON.stringify(records));
    }
});
