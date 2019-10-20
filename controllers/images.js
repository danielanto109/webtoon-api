const models = require('../models')
const Image = models.images
const Episode = models.episodes

exports.index = async (req, res) => {
    try{
        await Image.findAll({
            include: [{
                model: Episode,
                as: "idEpisode"
            }]
        }).then(result=>res.send(result))
    }catch(err){
        res.send({
            err
        })
    }
}

exports.show = async (req, res) => {
    try{
        await Image.findAll({
            where:{id_episode: req.params.id},
        }
        ).then(result=> res.send(result))
    }catch(err){
        res.send({
            err
        })
    }
}

exports.store = async (req, res) => {
    try{
        await Image.create (req.body).then(result=> {
            res.send({
                message: "success",
                result
            })
        })
    }catch(err){
        res.send({
            err
        })
    }
}

exports.update = async (req, res) => {
    try{
        await Image.update(
            req.body,
            {where: {id: req.params.id}}
        ).then(result=> {
            res.send({
                message: "success",
                result
            })
        })
    }catch(err){
        res.send({
            err
        })
    }
}

exports.delete = async (req, res) => {
    try{
        await Image.destroy({where: {id: req.params.id}}).then(result=> {
            res.send({
                message: "success",
                result
            })
        })
    }catch(err){
        res.send({
            err
        })
    }
}
