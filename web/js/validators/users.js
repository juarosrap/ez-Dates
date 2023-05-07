"use strict";

import {authAPI_auto} from "/js/api/_auth.js";

const userValidator = {
    validateRegister: function (formData){
        let errors = [];
        let Name = formData.get("nombre");
        let password = formData.get("contrasenya");

        if (password.length > 18 || password.length < 5){
            errors.push("La contraseña debe tener entre 5 y 18 caracteres");
        }
        return errors;
    },

    validateLogin: function (formData) {
        let errors = [];
        let email = formData.get("email");
        let contrasenya = formData.get("contrasenya");
    
        if (!email || !email.trim()) {
            errors.push("Por favor, ingrese un correo electrónico.");
        }
    
        if (!contrasenya || !contrasenya.trim()) {
            errors.push("Por favor, ingrese una contraseña.");
        }
    
        // Puedes agregar más validaciones aquí si es necesario.
    
        return errors;
    }
};




export { userValidator };