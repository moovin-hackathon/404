const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = {

    /**
     * Realiza o cadastro do usuário.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async create(request, response) {

        var user = await User.findOne(request.body);
        
        if (! user) {
            try {
                user = await User.create(request.body);
            } catch (exception) {
                return response.status(406).send(exception.message);                            
        }      
        
    }
        return response.json(user);
    },

    /**
     * Retorna dados do usuário
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async getUser(request, response) {

        try {
            var user = await User.findOne({
                email: request.params.email
            });
        } catch (exception) {
            return response.status(406).send(exception.message);
        }       

        response.json(user);
    },

    /**
     * Atualiza os dados do usuário
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async update(request, response) {

        try {
            var user = await User.findByIdAndUpdate(
                request.params.id,
                request.body,
                {
                    new: true
                }
            );
        } catch (exception) {
            return response.status(406).send(exception.message);
        }
        return response.json(user);
    },

    /**
     * Remove usuário
     * 
     * @param {*} request 
     * @param {*} response 
     */
    async delete(request, response) {
        try {
            await User.findByIdAndRemove(request.params.id);
        } catch (exception) {
            return response.status(406).send(exception.message);
        }
        response.send();
    }
};