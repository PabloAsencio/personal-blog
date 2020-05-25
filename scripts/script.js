window.onload = () => {
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
        setTimeout(function () {
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
        setTimeout(function () {
            openButton.focus();
        }, 1);
        setTimeout(function () {
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

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');

    nameField.addEventListener('blur', () => {
        if (nameField.checkValidity()) {
            nameField.setAttribute('aria-invalid', 'false');
            nameError.innerHTML = '';
        } else {
            nameField.setAttribute('aria-invalid', 'true');
            nameField.nextElementSibling.querySelector(
                '.icon-invalid'
            ).style.visibility = 'visible';
            nameError.innerHTML = 'Please enter your name';
        }
    });

    nameField.addEventListener('focus', () => {
        nameField.nextElementSibling.querySelector(
            '.icon-invalid'
        ).style.visibility = 'hidden';
    });

    emailField.addEventListener('blur', () => {
        if (emailField.checkValidity()) {
            emailField.setAttribute('aria-invalid', 'false');
            emailError.innerHTML = '';
        } else {
            emailField.setAttribute('aria-invalid', 'true');
            emailField.nextElementSibling.querySelector(
                '.icon-invalid'
            ).style.visibility = 'visible';
            if (emailField.value.length === 0) {
                emailError.innerHTML = 'Please enter an email address';
            } else {
                emailError.innerHTML = 'Please enter a valid email address';
            }
        }
    });

    emailField.addEventListener('focus', () => {
        emailField.nextElementSibling.querySelector(
            '.icon-invalid'
        ).style.visibility = 'hidden';
    });
};
