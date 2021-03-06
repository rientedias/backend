/**
 * PROFILE CONTROLLER
 */
const connection = require('../database/connection');

module.exports = {
    
    //Listing
    async index(req, res){
        const ong_id = req.headers.authorization;
       
        const incidents = await connection('incedents')
        .where('ong_id', ong_id)
        .select('*');

        return res.json(incidents)

    }
}