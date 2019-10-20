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
                var linkNew
        var urlTemp = pageUrl
        while(urlTemp.indexOf(".") >= 0) {
            urlTemp = urlTemp.replace(".","_")
            linkNew = urlTemp.replace(".","_");
            }

        while(linkNew.indexOf("/") >= 0) {
             linkNew = urlTemp.replace("/","_");
            }
                   
              images =  'assets/'+ linkNew + '.png'
               
              
               

                this.uploadImage(request.url, response);

                page = await Page.create({
                    user: request.user,
                    name: request.url,
                    url: request.url,
                    status: 'active',
                    image: linkNew + '.png' 
                });

                console.log(page)


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
        var linkNew
        var urlTemp = pageUrl
        while(urlTemp.indexOf(".") >= 0) {
            urlTemp = urlTemp.replace(".","_")
            linkNew = urlTemp.replace(".","_");
            }

        while(linkNew.indexOf("/") >= 0) {
             linkNew = urlTemp.replace("/","_");
            }
                   
              images =  'assets/'+ linkNew + '.png'
             
        await webshot(
            pageUrl, 
            images,
            {
                shotSize: {
                    width: 'all', 
                    height: 'all',
                }
            },
            function(error) {
                if (! error) {
                  
                    return linkNew + '.png';
                }
            }
        );
    }
};