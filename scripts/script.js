// ***** Menu functionality *****
// Accesible Slide Menu adapted from https://knowbility.org/blog/2020/accessible-slide-menus/

// ** Constants **
const openButton = document.querySelector('.navigation__button--open');
const slideOut = document.querySelector('.navigation__slide-out');
const closeButton = document.querySelector('.navigation__button--close');
const main = document.querySelector('main');
const links = slideOut.getElementsByTagName('a');
const lastLink = links[links.length - 1];

// ** Event handlers **
const openNavigation = () => {
    slideOut.classList.add('visible', 'active');
    setTimeout(() => {
        closeButton.focus();
    }, 1);
    main.setAttribute('aria-hidden', 'true');
    openButton.setAttribute('aria-hidden', 'true');
};

// The timeouts in the previous and next function are necessary for the transitions to be properly animated
const closeNavigation = (e) => {
    if (e.type == 'keyup' && e.key !== 'Escape') {
        return;
    }

    slideOut.classList.remove('active');
    main.removeAttribute('aria-hidden');
    openButton.removeAttribute('aria-hidden');
    setTimeout(() => {
        openButton.focus();
    }, 1);
    setTimeout(() => {
        slideOut.classList.remove('visible');
    }, 501);
};

// The next two functions ensure that the focus stays within the menu when it is open
const moveFocusToTop = (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        closeButton.focus();
    }
};

const moveFocusToBottom = (e) => {
    if (e.key === 'Tab' && e.shiftKey) {
        e.preventDefault();
        lastLink.focus();
    }
};

// ** Adding event listeners **
openButton.addEventListener('click', openNavigation);
closeButton.addEventListener('click', closeNavigation);
slideOut.addEventListener('keyup', closeNavigation);
closeButton.addEventListener('keydown', moveFocusToBottom);
lastLink.addEventListener('keydown', moveFocusToTop);

// *******************************************************************************

// ***** Input validation *****

// ** Constants **
const nameField = document.getElementById('name');
nameField.errorMessages = {
    empty: 'Please enter your name',
    invalid: 'Please enter a valid name',
};

const emailField = document.getElementById('email');
emailField.errorMessages = {
    empty: 'Please enter an email address',
    invalid: 'Please enter a valid email address',
};

// ** Helper functions **
const resetField = (field) => {
    field.classList.remove('signup__field--focused');
    field.classList.remove('signup__field--valid');
    field.classList.remove('signup__field--invalid');
};

const hideIcons = (field) => {
    field.nextElementSibling
        .querySelector('.icon-invalid')
        .classList.remove('icon--visible');
    field.nextElementSibling
        .querySelector('.icon-valid')
        .classList.remove('icon--visible');
};

const setIconsToValid = (field) => {
    field.nextElementSibling
        .querySelector('.icon-invalid')
        .classList.remove('icon--visible');
    field.nextElementSibling
        .querySelector('.icon-valid')
        .classList.add('icon--visible');
};

const setIconsToInvalid = (field) => {
    field.nextElementSibling
        .querySelector('.icon-valid')
        .classList.remove('icon--visible');
    field.nextElementSibling
        .querySelector('.icon-invalid')
        .classList.add('icon--visible');
};

const setValid = (event, field) => {
    resetField(field);
    field.setAttribute('aria-invalid', 'false');
    setIconsToValid(field);
    field.parentElement.querySelector('.signup__error').innerHTML = '';
    if (event.type === 'input') {
        field.classList.add('signup__field--valid');
    }
};

const setInvalid = (event, field) => {
    resetField(field);
    field.setAttribute('aria-invalid', 'true');
    setIconsToInvalid(field);
    if (event.type === 'input') {
        field.classList.add('signup__field--invalid');
    }
};

const setErrorMessage = (field) => {
    if (field.value.length === 0) {
        field.parentElement.querySelector('.signup__error').innerHTML =
            field.errorMessages['empty'];
    } else {
        field.parentElement.querySelector('.signup__error').innerHTML =
            field.errorMessages['invalid'];
    }
};

// ** Event handlers **
const setFocus = (field) => {
    resetField(field);
    hideIcons(field);
    field.classList.add('signup__field--focused');
};

const validate = (event, field) => {
    if (field.checkValidity()) {
        setValid(event, field);
    } else {
        setInvalid(event, field);
        setErrorMessage(field);
    }
};

// ** Adding event listeners **

// Name
nameField.addEventListener('focus', () => setFocus(nameField));
nameField.addEventListener('input', (event) => validate(event, nameField));
nameField.addEventListener('blur', (event) => validate(event, nameField));

// Email
emailField.addEventListener('focus', () => setFocus(emailField));
emailField.addEventListener('input', (event) => validate(event, emailField));
emailField.addEventListener('blur', (event) => validate(event, emailField));

// ** Sample email field for the design system.**
const sampleField = document.getElementById('sample');

if (sampleField) {
    sampleField.errorMessages = emailField.errorMessages;
    sampleField.addEventListener('focus', () => setFocus(sampleField));
    sampleField.addEventListener('input', (event) =>
        validate(event, sampleField)
    );
    sampleField.addEventListener('blur', (event) =>
        validate(event, sampleField)
    );
}
