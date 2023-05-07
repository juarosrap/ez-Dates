/*
 * DO NOT EDIT THIS FILE, it is auto-generated. It will be updated automatically.
 * All changes done to this file will be lost upon re-running the 'silence createapi' command.
 * If you want to create new API methods, define them in a new file.
 *
 * Silence is built and maintained by the DEAL research group at the University of Seville.
 * You can find us at https://deal.us.es
 */

"use strict";

import { BASE_URL, requestOptions } from './common.js';

const fotosusuariosAPI_auto = {

    /** Gets all entries from 'fotosusuarios' */
    getAll: async function() {
        let response = await axios.get(`${BASE_URL}/fotosusuarios`, requestOptions);
        return response.data;
    },

    /** Gets an array entries from 'fotosusuarios' by their usuarioId.
        Note that this always returns an array. */
    getByUsuarioId: async function() {
        let response = await axios.get(`${BASE_URL}/fotosusuarios?usuarioId=${usuarioId}`, requestOptions);
        return response.data;
    },

    /** Gets an array entries from 'fotosusuarios' by their direccionId.
        Note that this always returns an array. */
    getByDireccionId: async function() {
        let response = await axios.get(`${BASE_URL}/fotosusuarios?direccionId=${direccionId}`, requestOptions);
        return response.data;
    },
};

export { fotosusuariosAPI_auto };