const mongoose = require('mongoose');

const Page = mongoose.model('Page');
const webshot = require('webshot');

module.exports = {

    /**
     * Analisa e formata uma requisição recebida através da notificação.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async parseRequest(request, response) {
        var page = await Page.findOne({
            url: request.url
        });

        if (! page) {
            try {

                this.uploadImage(request.url, response);

                page = await Page.create({
                    user: request.user,
                    name: request.url,
                    url: request.url,
                    status: 'active',
                    image: request.url.replace('/', '-') + '.png' 
                });


            } catch(e) {
                return response.status(400).send(e.message);
            }
        }

        if (page.status == 'blocked') {
            return response.status(403).send('Page blocked.');
        }

        return page;
    },

    async uploadImage(pageUrl, response) {
        await webshot(
            pageUrl, 
            'assets/tete.png', 
            {
                shotSize: {
                    width: 'all', 
                    height: 'all'
                }
            },
            function(error) {
                if (! error) {
                    console.log(pageUrl.text(pageUrl.text().replace('/', '-') + '.png'));
                    return pageUrl.replace('\/', '-') + '.png';
                }
            }
        );
    }
};