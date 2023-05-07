"use strict";


import { photoRenderer } from "/js/renderers/photos.js";
import { fotosAPI_auto } from "/js/api/_fotos.js";
import { messageRenderer } from "/js/renderers/messages.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("fotosId");

async function main() {
    // Assign the handler function to the delete button
    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete;
    let editBtn = document.querySelector("#button-edit");
    editBtn.onclick = handleEdit;
    if (photoId === null) {
        messageRenderer.showErrorMessage("Please, provide a photoId");
        return;
    }
    loadPhotoDetails();
}

function handleEdit(event) {
    window.location.href = "edit_photo.html?fotosId=" + photoId;
}

async function handleDelete(event) {
    let answer = confirm("Do you really want to delete this photo?");
    if (answer) {
        try {
            await fotosAPI_auto.delete(photoId);
            window.location = "/main.html";
        } catch (err) {
            messageRenderer.showErrorMessage(err.response.data.message);
        }
    }
}


async function loadPhotoDetails() {
    let photoContainer = document.querySelector("#photo-details-column");
    try {
        let photo = await fotosAPI_auto.getById(photoId)
        let photoDetails = photoRenderer.asDetails(photo);
        photoContainer.appendChild(photoDetails);
    } catch (err) {
        messageRenderer.showErrorMessage("Error loading photo", err);
    }
}


document.addEventListener("DOMContentLoaded", main);
