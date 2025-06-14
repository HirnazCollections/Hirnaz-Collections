document.querySelectorAll('.order-button').forEach(btn => {
    btn.addEventListener('click', function () {
        const productName = this.getAttribute('data-product');
        const price = this.parentElement.querySelector('p.price').textContent;

        document.getElementById('productName').value = productName;
        document.getElementById('productPrice').value = price;

        document.getElementById('orderModal').style.display = 'block';
    });
});

// Close modal functionality
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('thankYouMsg').style.display = 'none';
    document.getElementById('orderForm').style.display = 'block';
    document.getElementById('orderForm').reset();
});

// Form submission with WhatsApp integration
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.customerName.value;
    const phone = this.phoneNumber.value;
    const address = this.address.value;
    const product = this.productName.value;
    const price = this.productPrice.value;

    const message = `New Order:%0AProduct: ${product}%0APrice: ${price}%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}`;
    const whatsappURL = `https://wa.me/919587949813?text=${message}`;

    window.open(whatsappURL, '_blank');

    document.getElementById('thankYouMsg').style.display = 'block';
    this.style.display = 'none';
    this.reset();
});

// Newsletter form handling
document.getElementById('newsletterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
    this.reset();
});

// Ensure modal is hidden on page load and show all products
window.onload = function() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('hero').style.display = 'block';
    document.getElementById('home').style.display = 'block';
    document.getElementById('about').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    filterProducts('all');
    loadBestSellers();
};

// Navigation links ke liye functionality
const navLinks = document.querySelectorAll('.nav-right a');
const sections = document.querySelectorAll('section:not(#hero)');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        sections.forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(targetId).style.display = 'block';

        if (targetId === 'home') {
            document.getElementById('hero').style.display = 'block';
        } else {
            document.getElementById('hero').style.display = 'none';
        }
        
        document.getElementById('searchInput').value = '';
        filterProducts('all');
        loadBestSellers();
    });
});

// Products ka array with category and description
const products = [
    { 
        name: "Gold Plated Earrings", 
        price: "₹149", 
        image: "images/womens-items/ruan-richard-rodrigues-s9idT2PQUt4-unsplash.jpg", 
        category: "jewellery", 
        isBestSeller: false, 
        description: "Elegant gold-plated earrings, perfect for daily wear or special occasions."
    },
    { 
        name: "Ring Set", 
        price: "₹499", 
        image: "images/womens-items/Ring-plash.jpg", 
        category: "jewellery", 
        isBestSeller: true, 
        description: "A set of stylish rings, designed to complement any outfit."
    },
    { 
        name: "T-Shirt", 
        price: "₹250", 
        image: "images/kids-items/hector-reyes-WNQLkBUV68k-unsplash.jpg", 
        category: "baby-clothes", 
        isBestSeller: false, 
        description: "Soft and comfortable cotton T-shirt for kids, ideal for daily wear."
    },
    { 
        name: "T-Shirt & Jeans", 
        price: "₹599", 
        image: "images/kids-items/the-nix-company-CkCUvwMXAac-unsplash.jpg", 
        category: "baby-clothes", 
        isBestSeller: false, 
        description: "A cute combo of T-shirt and jeans, perfect for your little one Size 0 to 5 years ."
    },
    { 
        name: "Bracelet", 
        price: "₹299", 
        image: "images/womens-items/Bracelet-plash.jpg", 
        category: "jewellery", 
        isBestSeller: false, 
        description: "Chic bracelet with a modern design, suitable for all occasions."
    },
    { 
        name: "Baby Frock", 
        price: "₹499", 
        image: "images/kids-items/Babygirl-plash.jpg", 
        category: "baby-clothes", 
        isBestSeller: true, 
        description: "Adorable baby frock with soft fabric and cute prints."
    },
    { 
        name: "Baby Set", 
        price: "₹699", 
        image: "images/kids-items/eugenia-pankiv.jpg", 
        category: "baby-clothes", 
        isBestSeller: false, 
        description: "A complete baby set with top and bottom, designed for comfort."
    },
    { 
        name: "Earrings", 
        price: "₹399", 
        image: "images/womens-items/johny-silver.jpg", 
        category: "jewellery", 
        isBestSeller: false, 
        description: "Stylish earrings to add a touch of elegance to your look."
    }
];

// Track current category
let currentCategory = 'all'; // Default category

// Modified filterProducts to update currentCategory and show description
function filterProducts(category) {
    currentCategory = category; // Update current category
    const productGrid = document.querySelector('#home .product-grid');
    productGrid.innerHTML = '';

    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p>No products found.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <p class="product-description">${product.description}</p>
                <button class="order-button" data-product="${product.name}">Order Now</button>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', productCard);
    });

    const newOrderButtons = productGrid.querySelectorAll('.order-button');
    newOrderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const productPrice = button.parentElement.querySelector('p.price').textContent;
            document.getElementById('productName').value = productName;
            document.getElementById('productPrice').value = productPrice;
            document.getElementById('orderModal').style.display = 'block';
        });
    });
}

// Updated searchProducts function
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const productGrid = document.querySelector('#home .product-grid');
    productGrid.innerHTML = '';

    // Filter products based on search input and current category
    let filteredProducts = products;
    if (currentCategory !== 'all') {
        filteredProducts = products.filter(product => product.category === currentCategory);
    }
    filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchInput)
    );

    if (searchInput === '' && currentCategory === 'all') {
        filterProducts('all'); // Empty input par saare products show karo
        return;
    }

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = '<p>No products found.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <p class="product-description">${product.description}</p>
                <button class="order-button" data-product="${product.name}">Order Now</button>
            </div>
        `;
        productGrid.insertAdjacentHTML('beforeend', productCard);
    });

    const newOrderButtons = productGrid.querySelectorAll('.order-button');
    newOrderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const productPrice = button.parentElement.querySelector('p.price').textContent;
            document.getElementById('productName').value = productName;
            document.getElementById('productPrice').value = productPrice;
            document.getElementById('orderModal').style.display = 'block';
        });
    });
}

// Load Best Sellers
function loadBestSellers() {
    const bestSellerGrid = document.querySelector('.best-seller-grid');
    bestSellerGrid.innerHTML = '';

    const bestSellers = products.filter(product => product.isBestSeller);

    if (bestSellers.length === 0) {
        bestSellerGrid.innerHTML = '<p>No best sellers available.</p>';
        return;
    }

    bestSellers.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <p class="product-description">${product.description}</p>
                <button class="order-button" data-product="${product.name}">Order Now</button>
            </div>
        `;
        bestSellerGrid.insertAdjacentHTML('beforeend', productCard);
    });

    const newOrderButtons = bestSellerGrid.querySelectorAll('.order-button');
    newOrderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-product');
            const productPrice = button.parentElement.querySelector('p.price').textContent;
            document.getElementById('productName').value = productName;
            document.getElementById('productPrice').value = productPrice;
            document.getElementById('orderModal').style.display = 'block';
        });
    });
}
