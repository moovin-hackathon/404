const mongoose = require('mongoose');

const Page = mongoose.model('Page');

/** @var String Status de uma página ativa. */
const ACTIVE = 'active';

module.exports = {

    /**
     * Retorna todos as páginas cadastradas.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async getPages(request, response) {
        const { page = 1 } = request.query;
        const { limit = 10 } = request.query;

        const pages = await Page.paginate(
            {}, 
            {
                page, 
                limit
            }
        );
        
        return response.json(pages);
    },

    /**
     * Retorna uma página cadastrado.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async getPage(request, response) {
        try {
            
            var page = await Page.findById(request.params.id);
            
        } catch(exception) {
            return response.status(406).send(exception.message);
        }

        return response.json(page);
    },

    /**
     * Cria uma novo página.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async create(request, response) {
        var documentData = request.body;

        documentData.user = request.headers.user_id;
        documentData.status = ACTIVE;

        var page = await Page.findOne(documentData);

        if (! page) {
            try {
               
                page = await Page.create(documentData);
            
            } catch(exception) {
                return response.status(400).send(exception.message);
            } 
        }
        
        page.populate('user').execPopulate();
    
        return response.json(page);
    },

    /**
     * Atualiza uma página.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async update(request, response) {
        var documentData = request.body;

        documentData.user = request.headers.user_id;

        try {

            var page = await Page.findByIdAndUpdate(
                request.params.id, 
                request.body,
                {
                    new: true
                }
            );

        } catch (exception) {
            return response.status(406).send(exception.message);
        }
        
        page.populate('user').execPopulate();

        return response.json(page);
    },

    /**
     * Deleta uma página.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async delete(request, response) {
        try { 

            await Page.findByIdAndRemove(request.params.id);

        } catch(exception) {
            return response.status(406).send(exception.message);
        }

        return response.send();
    }
};