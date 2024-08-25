// move carousel
const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(){
    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 2000);
    }
}

function showSlide(index){
    if(index >= slides.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide(){
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}

// event expand
let events = document.querySelectorAll('.event');
let overlay = document.querySelector('.overlay');

events.forEach((event, index) => {
  event.addEventListener('click', () => {
    openTile(index);
  });
});

function openTile(index) {
  let event = events[index];
  event.classList.add('expanded');
  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-btn')) {
    let event = e.target.parentNode;
    event.classList.remove('expanded');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// atc using lclstorage
let cart = [];

function addToCart(index) {
    const selectedEvent = events[index];
    const eventDetails = {
        name: selectedEvent.querySelector('h4').innerText,
        image: selectedEvent.querySelector('img').src
    };

    let cartEvents = JSON.parse(localStorage.getItem('cartEvents')) || [];
    if (!cartEvents.some(event => event.name === eventDetails.name)) {
        cartEvents.push(eventDetails);
        localStorage.setItem('cartEvents', JSON.stringify(cartEvents));
        alert(`${eventDetails.name} has been added to your cart!`);
    } else {
        alert(`${eventDetails.name} is already in your cart!`);
    }
}

function loadCart() {
    const storedCart = JSON.parse(localStorage.getItem('cartEvents')) || [];
    cart = storedCart;
    renderCart();
}

function renderCart() {
    const cartContainer = document.querySelector('.cart-container');
    const emptyCartMessage = document.getElementById('emptyCartMessage');

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';
        cart.forEach((item, index) => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('cart-event');
            eventElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h4>${item.name}</h4>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove from Cart</button>
            `;
            cartContainer.appendChild(eventElement);
        });
    }
}
    
function removeFromCart(index) {
    let cartEvents = JSON.parse(localStorage.getItem('cartEvents')) || [];
    cartEvents.splice(index, 1);
    localStorage.setItem('cartEvents', JSON.stringify(cartEvents));
    location.reload(); 
}

document.addEventListener("DOMContentLoaded", loadCart);
