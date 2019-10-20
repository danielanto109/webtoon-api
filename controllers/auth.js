const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const models = require('../models')
const User = models.users


exports.login = async (req, res)=>{    

    const email = req.body.email
    const password = req.body.password 

    try{
        await User.findOne({where: {email}}).then(user=>{
            if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    if(result){
                        const token = jwt.sign({ userId: user.id }, 'RahasiaIlahi');
                        res.send({
                            message:"Success!",
                            data:{
                                id: user.id.toString(),
                                image: user.image,
                                name: user.name,
                                email: user.email,
                                token,
                            }
                        }) 
                    }else{
                        res.send({
                            error: true,
                            message: "Wrong Password!"
                        })                    
                    }
                });            
            }else{
                res.send({
                    error: true,
                    message: "Wrong Email!"
                })
            }
        }) 
    }catch(err){
        res.send({
            message: "error",
            err
        })
    }
       

}

exports.register = (req, res)=>{
    const email = req.body.email
    const password = req.body.password //use encryption in real world case!
    const name = req.body.name


        bcrypt.hash(password, 10, function(err, hash) {
             User.create({
                name,
                email,
                password: hash
            }).then(result=> {
                const token = jwt.sign({ userId: result.dataValues.id }, 'RahasiaIlahi');
                res.send({
                    message: "success",
                    data: {
                        id: result.dataValues.id.toString(),
                        image: result.dataValues.image,
                        name: result.dataValues.name,
                        email: result.dataValues.email,
                        token: token
                    }
                })
            }).catch(err=>{
                res.send({
                    err
                })
            })         
    
        });   


}