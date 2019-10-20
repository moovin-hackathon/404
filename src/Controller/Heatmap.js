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
    },

    async getHetmaps(request, response) {
        const { page = 1 } = request.query;
        const { limit = 10 } = request.query;
        
        let userId = request.headers.user_id;

        if (! userId) {
            return response.status(400).send('Header user_id is required');
        }

        const heatmaps = await Heatmap.paginate(
            {
                user: userId
            }, 
            {
                page, 
                limit,
                populate: ['user', 'page']
            }
        );
        
        return response.json(heatmaps);
    },

    async getHetmap(request, response) {
        let userId = request.headers.user_id;
        let pageId = request.headers.page_id;

        if (! userId) {
            return response.status(400).send('Header user_id is required.');
        }
        
        if (! pageId) {
            return response.status(400).send('Header page_id is required.');
        }

        var heatmap = await Heatmap.findOne({
            user: userId,
            page: pageId
        });
        
        if (! heatmap) {
            return response.status(406).send({});
        }

        await heatmap.populate('user').populate('page').execPopulate();

        return response.json(heatmap);
    }
};