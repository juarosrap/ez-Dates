"use strict";

import { parseHTML } from '/js/utils/parseHTML.js';


const photoRenderer = {
    asCard: function (photo) {
        let html = `<div class="col-md-4">
        <div class="photo-block">
            <div class="photo-header-block">
                <h2 class="photo-title">${photo.nombre}</h2>
            </div>
            <div class="photo-image-block">
            <a href="photo_detail.html?fotosId=${photo.fotosId}"">
                <img class="photo-image" src="${photo.url}">
                </a>
            </div>
            <div class="photo-metadata-block">
                <p class="photo-description">${photo.descripcion}</p>
            </div>
            <div class="photo-edit-block">
                <button class="btn-block">Solicitud de Amistad</button>
                <a href="chat.html"><button class="btn-block">Enviar mensaje</button></a> 
            </div>
        </div>
    </div>`;
        let newCard = parseHTML(html);
        return newCard;
    },

    

    asDetails: function (photo) {
        let html = `<div class="photo-details">
        <h3>${photo.nombre}</h3>
        <h6>${photo.descripcion}</h6>
        <img src="${photo.url}" class="img-fluid">
        <div>`;
        let photoDetails = parseHTML(html);
        return photoDetails;
    }
};

export { photoRenderer };