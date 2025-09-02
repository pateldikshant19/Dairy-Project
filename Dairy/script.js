// Live Customer Counter
let customerCount = 0;
const customerCountElement = document.getElementById('customerCount');

function updateCustomerCount() {
    // Simulate live customer count with random increments
    const increment = Math.floor(Math.random() * 3) + 1;
    customerCount += increment;
    customerCountElement.textContent = customerCount;
}

// Initialize customer count
customerCount = Math.floor(Math.random() * 50) + 100; // Start with 100-150 customers
customerCountElement.textContent = customerCount;

// Update every 5 seconds
setInterval(updateCustomerCount, 5000);

// Login Modal Functionality
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('loginForm');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = e.target.querySelector('input[type="text"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    // Simple owner login check
    if (username === 'owner' && password === 'admin123') {
        window.location.href = 'owner-dashboard.html';
    } else {
        alert('Invalid credentials. Use: owner/admin123 for owner access');
    }
    loginModal.style.display = 'none';
});

// Signup link functionality
document.getElementById('signupLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('New customer registration would be implemented here!');
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Initialize first section
document.querySelector('#home').style.opacity = '1';
document.querySelector('#home').style.transform = 'translateY(0)';

// Language translations
const translations = {
    en: {
        home: 'Home', about: 'About', gallery: 'Gallery', reviews: 'Reviews', contact: 'Contact',
        login: 'Login', heroTitle: 'Fresh & Pure Dairy Products', heroSubtitle: 'Delivering quality milk and dairy products since 2022',
        liveCount: 'Live Customer Count:', aboutTitle: 'About Mahant Dairy', ownerDetails: 'Owner Details',
        name: 'Name', phone: 'Phone', address: 'Farm Address', experience: 'Experience', establish: 'Establish',
        expYears: '3+ Years in Dairy Business', feature1: '100% Pure & Fresh Milk', feature2: 'Organic Dairy Products',
        feature3: 'Home Delivery Available', feature4: 'Quality Assured', dairyFarm: 'Our Dairy Farm',
        review1: '"Best quality milk in the area. Always fresh and delivered on time!"',
        review2: '"Mahant Dairy has been our family\'s choice for 2.5 years. Excellent service!"',
        review3: '"Great quality products and reasonable prices. Highly recommended!"',
        deliveryHours: 'Delivery Hours', timings: 'Morning: 6:00 AM - 9:00 AM<br>Evening: 5:00 PM - 8:00 PM'
    },
    hi: {
        home: 'होम', about: 'हमारे बारे में', gallery: 'गैलरी', reviews: 'समीक्षा', contact: 'संपर्क',
        login: 'लॉगिन', heroTitle: 'ताज़ा और शुद्ध डेयरी उत्पाद', heroSubtitle: '2022 से गुणवत्तापूर्ण दूध और डेयरी उत्पाद प्रदान कर रहे हैं',
        liveCount: 'लाइव ग्राहक संख्या:', aboutTitle: 'महंत डेयरी के बारे में', ownerDetails: 'मालिक विवरण',
        name: 'नाम', phone: 'फोन', address: 'फार्म पता', experience: 'अनुभव', establish: 'स्थापना',
        expYears: 'डेयरी व्यवसाय में 3+ वर्ष', feature1: '100% शुद्ध और ताज़ा दूध', feature2: 'जैविक डेयरी उत्पाद',
        feature3: 'घर पहुँचाना उपलब्ध', feature4: 'गुणवत्ता आश्वासित', dairyFarm: 'हमारा डेयरी फार्म',
        review1: '"इस क्षेत्र में सबसे अच्छा दूध। हमेशा ताज़ा और समय पर पहुँचाया जाता है!"',
        review2: '"महंत डेयरी 2.5 सालों से हमारे परिवार की पसंद है। उत्कृष्ट सेवा!"',
        review3: '"उत्कृष्ट गुणवत्ता और उचित मूल्य। अत्यधिक सिफारिश!"',
        deliveryHours: 'डिलीवरी समय', timings: 'सुबह: 6:00 AM - 9:00 AM<br>शाम: 5:00 PM - 8:00 PM'
    },
    gu: {
        home: 'હોમ', about: 'અમારા વિશે', gallery: 'ગેલેરી', reviews: 'સમીક્ષા', contact: 'સંપર્ક',
        login: 'લોગિન', heroTitle: 'તાજા અને શુદ્ધ ડેરી ઉત્પાદનો', heroSubtitle: '2022 થી ગુણવત્તાયુક્ત દૂધ અને ડેરી ઉત્પાદનો પહોંચાડી રહ્યા છીએ',
        liveCount: 'લાઇવ ગ્રાહક સંખ્યા:', aboutTitle: 'મહંત ડેરી વિશે', ownerDetails: 'માલિક વિગતો',
        name: 'નામ', phone: 'ફોન', address: 'ફાર્મ સરનામું', experience: 'અનુભવ', establish: 'સ્થાપના',
        expYears: 'ડેરી વ્યવસાયમાં 3+ વર્ષ', feature1: '100% શુદ્ધ અને તાજા દૂધ', feature2: 'ઑર્ગેનિક ડેરી ઉત્પાદનો',
        feature3: 'ઘર પહોંચાડી ઉપલબ્ધ', feature4: 'ગુણવત્તા ખાતરી', dairyFarm: 'અમારું ડેરી ફાર્મ',
        review1: '"આ વિસ્તારમાં સર્વોત્તમ ગુણવત્તાનું દૂધ। હમેશાં તાજા અને સમયસર પહોંચાડી!"',
        review2: '"મહંત ડેરી 2.5 વર્ષથી અમારા કુટુંબની પસંદગી છે। ઉત્કૃષ્ટ સેવા!"',
        review3: '"ઉત્કૃષ્ટ ગુણવત્તા અને યોગ્ય મૂલ્ય। અત્યધિક શિફારસ!"',
        deliveryHours: 'ડિલિવરી સમય', timings: 'સવાર: 6:00 AM - 9:00 AM<br>સાંજ: 5:00 PM - 8:00 PM'
    }
};

// Language change functionality
document.getElementById('languageSelect').addEventListener('change', (e) => {
    const lang = e.target.value;
    const t = translations[lang];
    
    // Update navigation
    document.querySelector('a[href="#home"]').textContent = t.home;
    document.querySelector('a[href="#about"]').textContent = t.about;
    document.querySelector('a[href="#gallery"]').textContent = t.gallery;
    document.querySelector('a[href="#reviews"]').textContent = t.reviews;
    document.querySelector('a[href="#contact"]').textContent = t.contact;
    document.getElementById('loginBtn').textContent = t.login;
    
    // Update hero section
    document.querySelector('.hero-content h2').textContent = t.heroTitle;
    document.querySelector('.hero-content p').textContent = t.heroSubtitle;
    document.querySelector('.live-counter h3').innerHTML = t.liveCount + ' <span id="customerCount">' + document.getElementById('customerCount').textContent + '</span>';
    
    // Update about section
    document.querySelector('.about h2').textContent = t.aboutTitle;
    document.querySelector('.owner-details h3').textContent = t.ownerDetails;
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (t[key]) {
            if (key === 'timings') {
                element.innerHTML = t[key];
            } else {
                element.textContent = t[key];
            }
        }
    });
});

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance slides every 2 seconds
setInterval(nextSlide, 2000);