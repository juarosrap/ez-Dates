"use strict";

import {messageRenderer} from "/js/renderers/messages.js";
import { fotosAPI_auto } from "/js/api/_fotos.js";
import { galleryRenderer } from "/js/renderers/gallery.js";

async function main() {
    loadAllPhotos();
}
async function loadAllPhotos() {
    let galleryContainer = document.querySelector("div.photo-gallery");
    try {
        let photos = await fotosAPI_auto.getAll();
        let cardGallery = galleryRenderer.asCardGallery(photos);
        galleryContainer.appendChild(cardGallery);
    } catch (err) {
        if (err.response && err.response.status === 400) {
            console.error('Error 400 detallado:', err.response.data);
        } else {
            console.error('Error detallado:', err);
        }
        messageRenderer.showErrorMessage("Error while loading photos", err);
    }
}

document.addEventListener("DOMContentLoaded", main);