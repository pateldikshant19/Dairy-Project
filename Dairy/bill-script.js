// Global variables
let bills = JSON.parse(localStorage.getItem('dairyBills')) || [];
let settings = JSON.parse(localStorage.getItem('dairySettings')) || {
    farmName: 'Mahant Dairy',
    farmAddress: 'Gaaj, Vadodara',
    defaultPrice: 60,
    defaultDiscount: 5
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
    loadBillsHistory();
    loadCustomerBills();
});

// User type selection functions
function showOwnerDashboard() {
    document.getElementById('userTypeSelection').style.display = 'none';
    document.getElementById('ownerDashboard').style.display = 'block';
    document.getElementById('customerDashboard').style.display = 'none';
    loadBillsHistory();
}

function showCustomerDashboard() {
    document.getElementById('userTypeSelection').style.display = 'none';
    document.getElementById('ownerDashboard').style.display = 'none';
    document.getElementById('customerDashboard').style.display = 'block';
    loadCustomerBills();
}

function showUserTypeSelection() {
    document.getElementById('userTypeSelection').style.display = 'flex';
    document.getElementById('ownerDashboard').style.display = 'none';
    document.getElementById('customerDashboard').style.display = 'none';
}

// Settings functions
function loadSettings() {
    document.getElementById('farmName').value = settings.farmName;
    document.getElementById('farmAddress').value = settings.farmAddress;
    document.getElementById('defaultPrice').value = settings.defaultPrice;
    document.getElementById('defaultDiscount').value = settings.defaultDiscount;
    document.getElementById('milkPrice').value = settings.defaultPrice;
    document.getElementById('discountPercent').value = settings.defaultDiscount;
}

function updateDefaultPrice() {
    settings.defaultPrice = parseFloat(document.getElementById('defaultPrice').value);
    document.getElementById('milkPrice').value = settings.defaultPrice;
    saveSettings();
}

function updateDefaultDiscount() {
    settings.defaultDiscount = parseFloat(document.getElementById('defaultDiscount').value);
    document.getElementById('discountPercent').value = settings.defaultDiscount;
    saveSettings();
}

function updateFarmName() {
    settings.farmName = document.getElementById('farmName').value;
    saveSettings();
}

function updateFarmAddress() {
    settings.farmAddress = document.getElementById('farmAddress').value;
    saveSettings();
}

function saveSettings() {
    localStorage.setItem('dairySettings', JSON.stringify(settings));
}

// Bill generation functions
function generateBill() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const milkQuantity = parseFloat(document.getElementById('milkQuantity').value);
    const milkPrice = parseFloat(document.getElementById('milkPrice').value);
    const totalDays = parseInt(document.getElementById('totalDays').value);
    const daysTaken = parseInt(document.getElementById('daysTaken').value);
    const extraDays = parseInt(document.getElementById('extraDays').value) || 0;
    const discountPercent = parseFloat(document.getElementById('discountPercent').value) || 0;
    const pendingAmount = parseFloat(document.getElementById('pendingAmount').value) || 0;

    if (!customerName || !customerPhone || !milkQuantity || !milkPrice || !totalDays || !daysTaken) {
        alert('Please fill in all required fields');
        return;
    }

    const billData = {
        billNo: 'MD-2024-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        date: new Date().toLocaleDateString('en-IN'),
        customerName,
        customerPhone,
        customerAddress,
        milkQuantity,
        milkPrice,
        totalDays,
        daysTaken,
        extraDays,
        discountPercent,
        pendingAmount,
        status: 'Pending'
    };

    const calculations = calculateBillAmount(billData);
    billData.calculations = calculations;
    billData.finalAmount = calculations.finalAmount;

    showBillPreview(billData);
}

function calculateBillAmount(billData) {
    const regularAmount = billData.daysTaken * billData.milkQuantity * billData.milkPrice;
    const extraAmount = billData.extraDays * billData.milkQuantity * billData.milkPrice;
    const subtotal = regularAmount + extraAmount;
    const discountAmount = Math.round(subtotal * (billData.discountPercent / 100));
    const totalAmount = subtotal - discountAmount;
    const finalAmount = totalAmount + billData.pendingAmount;
    const daysNotTaken = billData.totalDays - billData.daysTaken;

    return {
        regularAmount,
        extraAmount,
        subtotal,
        discountAmount,
        totalAmount,
        finalAmount,
        daysNotTaken
    };
}

function showBillPreview(billData) {
    const modal = document.getElementById('billPreviewModal');
    const content = document.getElementById('billPreviewContent');
    
    content.innerHTML = generateBillHTML(billData);
    modal.style.display = 'flex';
    
    // Store current bill data for saving
    window.currentBillData = billData;
}

function generateBillHTML(billData) {
    const calc = billData.calculations;
    
    return `
        <div class="bill-container">
            <div class="bill-header">
                <div class="farm-details">
                    <h1>${settings.farmName}</h1>
                    <p data-translate="tagline">Fresh & Pure Since 1995</p>
                    <p data-translate="farmAddress">Farm Address: ${settings.farmAddress}</p>
                    <p>Phone: +91 XXXXXXXXXX</p>
                </div>
                <div class="bill-info">
                    <h2 data-translate="monthlyBill">Monthly Bill</h2>
                    <p>Bill No: ${billData.billNo}</p>
                    <p data-translate="date">Date: <span id="billDate">${billData.date}</span></p>
                </div>
            </div>

            <div class="greeting">
                <h3 data-translate="greeting">Dear Valued Customer,</h3>
                <p data-translate="greetingMsg">Thank you for choosing ${settings.farmName} for your daily milk needs. We appreciate your trust in our quality products.</p>
            </div>

            <div class="customer-details">
                <h3>Customer Details</h3>
                <div class="customer-info">
                    <p><strong>Name:</strong> ${billData.customerName}</p>
                    <p><strong>Phone:</strong> ${billData.customerPhone}</p>
                    <p><strong>Address:</strong> ${billData.customerAddress || 'Not provided'}</p>
                </div>
            </div>

            <div class="bill-summary">
                <h3>Bill Summary</h3>
                <table class="summary-table">
                    <tr>
                        <td>Total Days in Month:</td>
                        <td>${billData.totalDays}</td>
                    </tr>
                    <tr>
                        <td>Days Milk Taken:</td>
                        <td>${billData.daysTaken}</td>
                    </tr>
                    <tr>
                        <td>Days Not Taken:</td>
                        <td>${calc.daysNotTaken}</td>
                    </tr>
                    <tr>
                        <td>Extra Days:</td>
                        <td>${billData.extraDays}</td>
                    </tr>
                    <tr>
                        <td>Daily Quantity:</td>
                        <td>${billData.milkQuantity}L</td>
                    </tr>
                    <tr>
                        <td>Price per Litre:</td>
                        <td>₹${billData.milkPrice}</td>
                    </tr>
                </table>
            </div>

            <div class="bill-calculation">
                <h3>Bill Calculation</h3>
                <table class="calc-table">
                    <tr>
                        <td>Regular Amount (${billData.daysTaken} days × ${billData.milkQuantity}L × ₹${billData.milkPrice}):</td>
                        <td>₹${calc.regularAmount.toLocaleString('en-IN')}</td>
                    </tr>
                    ${billData.extraDays > 0 ? `
                    <tr>
                        <td>Extra Amount (${billData.extraDays} days × ${billData.milkQuantity}L × ₹${billData.milkPrice}):</td>
                        <td>₹${calc.extraAmount.toLocaleString('en-IN')}</td>
                    </tr>
                    ` : ''}
                    <tr class="total-row">
                        <td>Subtotal:</td>
                        <td>₹${calc.subtotal.toLocaleString('en-IN')}</td>
                    </tr>
                    ${billData.discountPercent > 0 ? `
                    <tr class="discount-row">
                        <td>Discount (${billData.discountPercent}%):</td>
                        <td>-₹${calc.discountAmount.toLocaleString('en-IN')}</td>
                    </tr>
                    ` : ''}
                    <tr class="total-row">
                        <td>Total Amount:</td>
                        <td>₹${calc.totalAmount.toLocaleString('en-IN')}</td>
                    </tr>
                    ${billData.pendingAmount > 0 ? `
                    <tr>
                        <td>Previous Pending Amount:</td>
                        <td>₹${billData.pendingAmount.toLocaleString('en-IN')}</td>
                    </tr>
                    ` : ''}
                    <tr class="final-row">
                        <td><strong>Final Amount:</strong></td>
                        <td><strong>₹${calc.finalAmount.toLocaleString('en-IN')}</strong></td>
                    </tr>
                </table>
            </div>

            <div class="footer-message">
                <p>Thank you for your continued trust in our dairy products.</p>
                <p>For any queries, please contact us at the above number.</p>
                <p>Fresh Milk, Happy Family! 🥛</p>
            </div>
        </div>
    `;
}

function closeBillPreview() {
    document.getElementById('billPreviewModal').style.display = 'none';
}

function printBill() {
    const printContent = document.getElementById('billPreviewContent').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Print Bill</title>
                <link rel="stylesheet" href="bill-styles.css">
                <style>
                    body { margin: 0; padding: 20px; }
                    .modal-actions { display: none; }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function saveBill() {
    if (window.currentBillData) {
        bills.push(window.currentBillData);
        localStorage.setItem('dairyBills', JSON.stringify(bills));
        loadBillsHistory();
        closeBillPreview();
        clearForm();
        alert('Bill saved successfully!');
    }
}

function clearForm() {
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('customerAddress').value = '';
    document.getElementById('milkQuantity').value = '';
    document.getElementById('milkPrice').value = settings.defaultPrice;
    document.getElementById('totalDays').value = '';
    document.getElementById('daysTaken').value = '';
    document.getElementById('extraDays').value = '0';
    document.getElementById('discountPercent').value = settings.defaultDiscount;
    document.getElementById('pendingAmount').value = '0';
}

function loadBillsHistory() {
    const tbody = document.getElementById('billsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    bills.slice(-10).reverse().forEach(bill => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bill.billNo}</td>
            <td>${bill.customerName}</td>
            <td>${bill.date}</td>
            <td>₹${bill.finalAmount.toLocaleString('en-IN')}</td>
            <td><span class="status-${bill.status.toLowerCase()}">${bill.status}</span></td>
            <td>
                <button class="action-btn view-btn" onclick="viewBill('${bill.billNo}')">View</button>
                <button class="action-btn edit-btn" onclick="editBill('${bill.billNo}')">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteBill('${bill.billNo}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function viewBill(billNo) {
    const bill = bills.find(b => b.billNo === billNo);
    if (bill) {
        showBillPreview(bill);
    }
}

function editBill(billNo) {
    const bill = bills.find(b => b.billNo === billNo);
    if (bill) {
        // Populate form with bill data
        document.getElementById('customerName').value = bill.customerName;
        document.getElementById('customerPhone').value = bill.customerPhone;
        document.getElementById('customerAddress').value = bill.customerAddress || '';
        document.getElementById('milkQuantity').value = bill.milkQuantity;
        document.getElementById('milkPrice').value = bill.milkPrice;
        document.getElementById('totalDays').value = bill.totalDays;
        document.getElementById('daysTaken').value = bill.daysTaken;
        document.getElementById('extraDays').value = bill.extraDays;
        document.getElementById('discountPercent').value = bill.discountPercent;
        document.getElementById('pendingAmount').value = bill.pendingAmount;
        
        // Remove the old bill
        bills = bills.filter(b => b.billNo !== billNo);
        localStorage.setItem('dairyBills', JSON.stringify(bills));
        loadBillsHistory();
    }
}

function deleteBill(billNo) {
    if (confirm('Are you sure you want to delete this bill?')) {
        bills = bills.filter(b => b.billNo !== billNo);
        localStorage.setItem('dairyBills', JSON.stringify(bills));
        loadBillsHistory();
    }
}

function exportBills() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Bill No,Customer Name,Phone,Date,Amount,Status\n"
        + bills.map(bill => 
            `${bill.billNo},${bill.customerName},${bill.customerPhone},${bill.date},${bill.finalAmount},${bill.status}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dairy_bills.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function loadCustomerBills() {
    const currentBillDisplay = document.getElementById('currentBillDisplay');
    const customerBillsList = document.getElementById('customerBillsList');
    
    if (!currentBillDisplay || !customerBillsList) return;
    
    // Show current month bill (latest bill)
    const latestBill = bills[bills.length - 1];
    if (latestBill) {
        currentBillDisplay.innerHTML = `
            <div class="customer-bill-summary">
                <h4>Bill No: ${latestBill.billNo}</h4>
                <p><strong>Date:</strong> ${latestBill.date}</p>
                <p><strong>Amount:</strong> ₹${latestBill.finalAmount.toLocaleString('en-IN')}</p>
                <p><strong>Status:</strong> <span class="status-${latestBill.status.toLowerCase()}">${latestBill.status}</span></p>
                <button onclick="viewBill('${latestBill.billNo}')" class="view-btn action-btn">View Full Bill</button>
            </div>
        `;
    } else {
        currentBillDisplay.innerHTML = '<p>No bills available</p>';
    }
    
    // Show bill history
    customerBillsList.innerHTML = '';
    bills.slice(-5).reverse().forEach(bill => {
        const billItem = document.createElement('div');
        billItem.className = 'customer-bill-item';
        billItem.innerHTML = `
            <div>
                <strong>${bill.billNo}</strong> - ${bill.date}
                <br>
                <small>₹${bill.finalAmount.toLocaleString('en-IN')}</small>
            </div>
            <div>
                <span class="status-${bill.status.toLowerCase()}">${bill.status}</span>
                <button onclick="viewBill('${bill.billNo}')" class="view-btn action-btn" style="margin-left: 10px;">View</button>
            </div>
        `;
        customerBillsList.appendChild(billItem);
    });
}