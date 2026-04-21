// Smooth scroll
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Animate sections on scroll
const sections = document.querySelectorAll('section,header');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); }
  });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

// Contact form submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  formStatus.textContent = 'Sending message...';
});

// EmailJS send function
function sendMail() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formStatus = document.getElementById('form-status');

    // Check if any field is empty
    if (!name || !email || !message) {
        formStatus.textContent = '❌ Please fill in all fields before sending.';
        formStatus.style.color = 'red';
        return;
    }

    formStatus.textContent = 'Sending message...';
    formStatus.style.color = 'black';

    const params = { name, email, message };

    emailjs.send("service_zsmtru9", "template_zqavnpj", params)
        .then(() => {
            formStatus.textContent = '✅ Message sent! Thank you.';
            formStatus.style.color = 'green';
            document.getElementById("contact-form").reset();
        })
        .catch(err => {
            console.error('EmailJS error:', err);
            formStatus.textContent = '❌ Oops! Something went wrong. Please try again.';
            formStatus.style.color = 'red';
        });
}