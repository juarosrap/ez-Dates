"use strict";

import { messageRenderer } from "/js/renderers/messages.js";
import { userValidator } from "/js/validators/users.js";
import { sessionManager } from "/js/utils/session.js";
import { authAPI_auto } from "/js/api/_auth.js";




console.log("hola mamon");

function main() {
    let registerForm = document.getElementById("register-form");
    registerForm.onsubmit = handleSubmitRegister;
}

function handleSubmitRegister(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let errors = userValidator.validateRegister(formData);

    if (errors.length > 0) {

        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
    }
    else {
        sendRegister(formData);
    }
}

async function sendRegister(formData) {
    try {
        let loginData = await authAPI_auto.register(formData);
        sessionManager.login(
            loginData.sessionToken,
            loginData.user
        );
        window.location.href = "main.html";
    } catch (err) {
        console.error('Error detallado:', err); // Agrega esta línea para ver el error en detalle
        messageRenderer.showErrorMessage("Error registering a new user", err);
    }
}





document.addEventListener("DOMContentLoaded", main);