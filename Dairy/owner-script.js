// Real-time stats updates
function updateStats() {
    const totalCustomers = document.getElementById('totalCustomers');
    const activeOrders = document.getElementById('activeOrders');
    const dailyRevenue = document.getElementById('dailyRevenue');
    const milkProduction = document.getElementById('milkProduction');
    
    // Simulate real-time updates
    setInterval(() => {
        const currentCustomers = parseInt(totalCustomers.textContent);
        if (Math.random() > 0.7) {
            totalCustomers.textContent = currentCustomers + 1;
        }
        
        const currentOrders = parseInt(activeOrders.textContent);
        if (Math.random() > 0.8) {
            activeOrders.textContent = Math.max(0, currentOrders + (Math.random() > 0.5 ? 1 : -1));
        }
    }, 10000);
}

// Settings form handling
document.querySelector('.save-btn').addEventListener('click', () => {
    const phone = document.getElementById('phoneInput').value;
    const address = document.getElementById('addressInput').value;
    const price = document.getElementById('priceInput').value;
    
    alert(`Settings saved!\nPhone: ${phone}\nAddress: ${address}\nPrice: ₹${price}/L`);
});

// Review approval
document.querySelectorAll('.approve-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.textContent = 'Approved';
        e.target.style.background = '#28a745';
        e.target.disabled = true;
    });
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
});

// Initialize stats updates
updateStats();