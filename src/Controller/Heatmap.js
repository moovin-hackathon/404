const mongoose = require('mongoose');

const Heatmap = mongoose.model('Heatmap');

module.exports = {

    /**
     * Recebe notificação de mapas de calor.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async notify(request, response) {
        response.send({
            'Olá'
        });
    }
};