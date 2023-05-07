"use strict";

import { authAPI_auto } from "/js/api/_auth.js";
import { sessionManager } from "/js/utils/session.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";

// DOM elements that we will use
const loginForm = document.getElementById("login-form");
const errorsDiv = document.getElementById("errors");

// Main function that will run when the page is ready
function main() {
    // Handle the form's submit event
    loginForm.onsubmit = handleSubmitLogin;
}

///////////////////////////////////////////////////////////////////////////////

function handleSubmitLogin(event) {
    // Prevent the browser from sending the form,
    // because we'll do it using AJAX
    event.preventDefault();
    let formData = new FormData(loginForm);
    let errors = userValidator.validateLogin(formData);

    

    if (errors.length > 0) {

        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }
    else {
        sendLogin(formData);
    }
}

async function sendLogin(formData) {

    try {
        let loginData = await authAPI_auto.login(formData);

        // If the login is successful, store the session token and
        // the logged user data, and navigate to the main page.
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.email;
        sessionManager.login(sessionToken, loggedUser);
        console.log("Hola mundo");

        window.location.href = "main.html";
    } catch (error) {
        // If there is an error, access the mesage in the response and
        // show it to the user
        let message = error.response.data.message;
        messageRenderer.showErrorMessage(message);
    }
    
}

////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", main);