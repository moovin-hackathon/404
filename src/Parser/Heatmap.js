const mongoose = require('mongoose');

const Heatmap = mongoose.model('Heatmap');
const moment = require('moment');

module.exports = {

    /**
     * Analisa e formata uma requisição recebida através da notificação.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async parseRequest(request, page, response) {
        var heatmaps = [];

        for (const date in request) {
            for (let iterator = 0; iterator < request[date].length; iterator++) {
                const coordinate = request[date][iterator];
                let start = moment(date);
                let end   = moment(start).endOf('day');

                heatmap = await Heatmap.findOne({
                    createdAt: {
                        $gte: start,
                        $lte: end
                    },
                    coordinates: [
                        coordinate.x,
                        coordinate.y
                    ],
                    page: page.id
                });
                

                if (heatmap) {
                    heatmap.incidents++;
                    
                    heatmaps.push(heatmap);
                } else {
                    heatmaps.push(new Heatmap({
                        user: page.user,
                        page: page.id,
                        coordinates: [
                            coordinate.x,
                            coordinate.y
                        ]
                    }));
                }
            }
        }

        return heatmaps;
    }
};