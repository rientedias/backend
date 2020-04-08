/**
 * INCIDENT CONTROLLER
 */
const connection = require('../database/connection');

module.exports = {

    //Creating
    async create(req, res) {

        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incedents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return res.json({ id })

    },
    //Listing
    async list(req, res) {
        const { page = 1 } = req.query;//paginação 

        const [count] = await connection('incedents').count();//contando todos os casos registrado pela ong.

        const incidents = await connection('incedents')
            .join('ongs', 'ongs.id', '=', 'incedents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incedents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        res.header('X-Total-Count', count['count(*)']);//enviando a resposta para o Header da resposta.

        return res.json(incidents);
    },
    //Deleting
    async delete(req, res) {

        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incedents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return res.status(401).json({ error: 'Operation not permitted' });
        }
        await connection('incedents').where('id', id).delete();
        return res.status(204).send();
    }


}