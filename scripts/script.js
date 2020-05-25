window.onload = () => {
    // Menu functionality
    const openButton = document.querySelector('.navigation__button--open');
    const slideOut = document.querySelector('.navigation__slide-out');
    const closeButton = document.querySelector('.navigation__button--close');
    const main = document.querySelector('main');
    const firstFocusableElement = closeButton;
    const links = slideOut.getElementsByTagName('a');
    const lastFocusableElement = links[links.length - 1];

    openButton.addEventListener('click', openNavigation);
    closeButton.addEventListener('click', closeNavigation);
    slideOut.addEventListener('keyup', closeNavigation);
    firstFocusableElement.addEventListener('keydown', moveFocusToBottom);
    lastFocusableElement.addEventListener('keydown', moveFocusToTop);

    function openNavigation() {
        slideOut.classList.add('visible', 'active');
        setTimeout(() => {
            firstFocusableElement.focus();
        }, 1);
        main.setAttribute('aria-hidden', 'true');
        openButton.setAttribute('aria-hidden', 'true');
    }

    function closeNavigation(e) {
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
    }

    function moveFocusToTop(e) {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            firstFocusableElement.focus();
        }
    }

    function moveFocusToBottom(e) {
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            lastFocusableElement.focus();
        }
    }

    // Input validation

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const inputOutlineColor = getComputedStyle(
        document.documentElement
    ).getPropertyValue('--input-outline-color');
    const validColor = getComputedStyle(
        document.documentElement
    ).getPropertyValue('--input-valid-color');
    const invalidColor = getComputedStyle(
        document.documentElement
    ).getPropertyValue('--input-invalid-color');

    // Name Validation
    nameField.addEventListener('focus', () => {
        nameField.nextElementSibling.querySelector(
            '.icon-invalid'
        ).style.visibility = 'hidden';
        nameField.nextElementSibling.querySelector(
            '.icon-valid'
        ).style.visibility = 'hidden';
        nameField.style.boxShadow = `0 0 3px 3px ${inputOutlineColor}`;
    });

    const validateName = (e) => {
        if (nameField.checkValidity()) {
            nameField.setAttribute('aria-invalid', 'false');
            nameField.nextElementSibling.querySelector(
                '.icon-invalid'
            ).style.visibility = 'hidden';
            nameField.nextElementSibling.querySelector(
                '.icon-valid'
            ).style.visibility = 'visible';
            nameError.innerHTML = '';
            if (e.type === 'input') {
                nameField.style.boxShadow = `0 0 3px 3px ${validColor}`;
            } else {
                nameField.style.boxShadow = 'none';
            }
        } else {
            nameField.setAttribute('aria-invalid', 'true');
            nameField.nextElementSibling.querySelector(
                '.icon-valid'
            ).style.visibility = 'hidden';
            nameField.nextElementSibling.querySelector(
                '.icon-invalid'
            ).style.visibility = 'visible';
            nameError.innerHTML = 'Please enter your name';
            if (e.type === 'input') {
                nameField.style.boxShadow = `0 0 3px 3px ${invalidColor}`;
            } else {
                nameField.style.boxShadow = 'none';
            }
        }
    };

    nameField.addEventListener('input', validateName);
    nameField.addEventListener('blur', validateName);

    // Email validation
    emailField.addEventListener('focus', () => {
        emailField.nextElementSibling.querySelector(
            '.icon-invalid'
        ).style.visibility = 'hidden';
        emailField.nextElementSibling.querySelector(
            '.icon-valid'
        ).style.visibility = 'hidden';
        emailField.style.boxShadow = `0 0 3px 3px ${inputOutlineColor}`;
    });

    const validateEmail = (e) => {
        if (emailField.checkValidity()) {
            emailField.setAttribute('aria-invalid', 'false');
            emailField.nextElementSibling.querySelector(
                '.icon-invalid'
            ).style.visibility = 'hidden';
            emailField.nextElementSibling.querySelector(
                '.icon-valid'
            ).style.visibility = 'visible';
            emailError.innerHTML = '';
            if (e.type === 'input') {
                emailField.style.boxShadow = `0 0 3px 3px ${validColor}`;
            } else {
                emailField.style.boxShadow = 'none';
            }
        } else {
            emailField.setAttribute('aria-invalid', 'true');
            emailField.nextElementSibling.querySelector(
                '.icon-valid'
            ).style.visibility = 'hidden';
            emailField.nextElementSibling.querySelector(
                '.icon-invalid'
            ).style.visibility = 'visible';
            if (e.type === 'input') {
                emailField.style.boxShadow = `0 0 3px 3px ${invalidColor}`;
            } else {
                emailField.style.boxShadow = 'none';
            }
            if (emailField.value.length === 0) {
                emailError.innerHTML = 'Please enter an email address';
            } else {
                emailError.innerHTML = 'Please enter a valid email address';
            }
        }
    };

    emailField.addEventListener('input', validateEmail);
    emailField.addEventListener('blur', validateEmail);

    // Sample input field validation for the design system
    const sampleField = document.getElementById('sample');
    const sampleError = document.getElementById('sample-error');

    sampleField.addEventListener('focus', () => {
        sampleField.nextElementSibling.querySelector(
            '.icon-invalid'
        ).style.visibility = 'hidden';
        sampleField.nextElementSibling.querySelector(
            '.icon-valid'
        ).style.visibility = 'hidden';
        sampleField.style.boxShadow = `0 0 3px 3px ${inputOutlineColor}`;
    });

    const validateSampleField = (e) => {
        if (sampleField.checkValidity()) {
            sampleField.setAttribute('aria-invalid', 'false');
            sampleField.nextElementSibling.querySelector(
                '.icon-invalid'
            ).style.visibility = 'hidden';
            sampleField.nextElementSibling.querySelector(
                '.icon-valid'
            ).style.visibility = 'visible';
            emailError.innerHTML = '';
            if (e.type === 'input') {
                sampleField.style.boxShadow = `0 0 3px 3px ${validColor}`;
            } else {
                sampleField.style.boxShadow = 'none';
            }
        } else {
            sampleField.setAttribute('aria-invalid', 'true');
            sampleField.nextElementSibling.querySelector(
                '.icon-valid'
            ).style.visibility = 'hidden';
            sampleField.nextElementSibling.querySelector(
                '.icon-invalid'
            ).style.visibility = 'visible';
            if (e.type === 'input') {
                sampleField.style.boxShadow = `0 0 3px 3px ${invalidColor}`;
            } else {
                sampleField.style.boxShadow = 'none';
            }
            sampleError.innerHTML = 'Please enter a valid email address';
            if (sampleField.value.length === 0) {
                sampleError.innerHTML = 'Please enter an email address';
            } else {
            }
        }
    };

    sampleField.addEventListener('input', validateSampleField);
    sampleField.addEventListener('blur', validateSampleField);
};
