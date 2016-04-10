var check = 6; //fields checked

//btnNumber 1 = Log in , btnNumber 2 = Sign up
function checkPressed(btnNumber) {

    var formOverlay = document.getElementById("overlay");
    var loginForm = document.getElementById("login-form-container");
    var signupForm = document.getElementById("signup-form-container");

    if (btnNumber == 1) {
        formOverlay.className += ' show';
        loginForm.className += ' show';
    } else {
        formOverlay.className += ' show';
        signupForm.className += ' show';
    }
}

function validateSignUpForm() {
    if (check >= 6) {
        return true;
    } else {
        return false;
    }
}

function validate(input, errorSpan) {

    var inputValue = document.getElementById(input.id).value;
    var errorValue = document.getElementById(errorSpan);

    if (inputValue == null || inputValue == '') {
        errorValue.className += " show";
        errorValue.innerHTML = "Please fill this field";
    } else {
        errorValue.className = "error";
        errorValue.innerHTML = "";
    }
}

function checkPressedDiv(event) {

    var formOverlay = document.getElementById("overlay");
    var loginFormContainer = document.getElementById("login-form-container");
    var loginForm = document.getElementById("login-form");
    var signupFormContainer = document.getElementById("signup-form-container");
    var signupForm = document.getElementById("signup-form");

    if (event.target == document.getElementById("overlay")) {
        formOverlay.className = 'overlay';
        loginFormContainer.className = 'login-form-container';
        loginForm.reset();
        signupFormContainer.className = 'signup-form-container';
        signupForm.reset();
    }
}
