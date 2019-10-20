const mongoose = require('mongoose');

const Heatmap = mongoose.model('Heatmap');
const HeatmapParser = require('../Parser/Heatmap');
const PageParser = require('../Parser/Page');

module.exports = {

    /**
     * Recebe notificação de mapas de calor.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async notify(request, response) {
        let pageData = await PageParser.parseRequest(request.body, response);

        const heatmapData = await HeatmapParser.parseRequest(
            request.body.heatmap, 
            pageData, response
        );

        for (const heatmap of heatmapData) {
            await heatmap.save();
        }

        return response.send();
    }
};