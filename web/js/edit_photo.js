"use strict";
import { fotosAPI_auto } from "/js/api/_fotos.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("fotosId");
let currentPhoto = null;


async function main() {
    console.log(photoId);
    if (photoId !== null) {
        loadCurrentPhoto();
    }

    let registerForm = document.getElementById("form-photo-upload");
    registerForm.onsubmit = handleSubmitPhoto;

}

async function loadCurrentPhoto() {
    let pageTitle = document.getElementById("page-title");
    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let visibilityInput = document.getElementById("input-megustas");
    pageTitle.textContent = "Editing a photo";
    try {
        currentPhoto = await fotosAPI_auto.getById(photoId);
        urlInput.value = currentPhoto.url;
        titleInput.value = currentPhoto.nombre;
        descriptionInput.value = currentPhoto.descripcion;
        visibilityInput.value = currentPhoto.meGustas;
    } catch (err) {
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}

async function handleSubmitPhoto(event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    if (currentPhoto === null) { // Creating a new photo
        // Add the current user ID
        formData.append("userId", 1);
        try {
            let resp = await fotosAPI_auto.create(formData);
            let newId = resp.lastId;
            window.location.href = `photo_detail.html?fotosId=${newId}`;
        } catch (err) {
            messageRenderer.showErrorMessage(err.response.data.message);
        }
    }
    else { // Updating an existing photo
        formData.append("usuarioId", currentPhoto.usuarioId);
        try {
            console.log(photoId);
            await fotosAPI_auto.update(formData, photoId);
            window.location.href = `photo_detail.html?fotosId=${photoId}`;
        } catch (err) {
            messageRenderer.showErrorAsAlert(err.response.data.message);
        }

    }
}

document.addEventListener("DOMContentLoaded", main);