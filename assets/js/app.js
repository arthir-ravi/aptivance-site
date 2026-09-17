const initializeApp = () => {
document.querySelectorAll('.nav-link[href^="#"], footer a[href^="#"]').forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
      });
    }
  });
});

const whatsappNumber = '919443356858';
const programEnquiryForm = document.getElementById('programEnquiryForm');

if (programEnquiryForm) {
  const fields = Array.from(programEnquiryForm.querySelectorAll('input[required], select[required], textarea[required]'));

  const validateField = (field) => {
    const value = field.value.trim();
    let message = '';

    if (!value) {
      message = field.nextElementSibling.textContent;
    } else if (field.type === 'email' && !field.validity.valid) {
      message = 'Please enter a valid email address.';
    } else if (field.name === 'phone' && !/^\d{10}$/.test(value)) {
      message = 'Please enter a 10-digit phone number.';
    }

    field.classList.toggle('is-invalid', Boolean(message));
    if (message) field.nextElementSibling.textContent = message;
    return !message;
  };

  fields.forEach((field) => {
    const clearError = () => field.classList.remove('is-invalid');
    field.addEventListener('input', clearError);
    field.addEventListener('change', clearError);
  });

  programEnquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstInvalidField = fields.find((field) => !validateField(field));

    if (firstInvalidField) {
      firstInvalidField.focus();
      return;
    }

    const data = new FormData(programEnquiryForm);
    const firstName = data.get('firstName').trim();
    const lastName = data.get('lastName').trim();
    const fullName = lastName ? `${firstName} ${lastName}` : firstName;
    const message = `Hello Aptivance Team,\n\nI am interested in Aptivance programs.\n\nName: ${fullName}\nEmail: ${data.get('email').trim()}\nPhone: ${data.get('phone').trim()}\nCollege / University: ${data.get('college').trim()}\nCourse / Degree: ${data.get('course').trim()}\nEnquiry Type: ${data.get('programType')}\nPreferred Learning Mode: ${data.get('learningMode')}\nCourse / Internship Domain: ${data.get('domain')}\n\nMessage:\n${data.get('message').trim()}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener');
  });
}
};

if (window.layoutReady) {
  window.layoutReady.then(initializeApp);
} else {
  initializeApp();
}
