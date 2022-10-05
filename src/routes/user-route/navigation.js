const express = require('express');
const router = express.Router();
const navController = require('../../app/controllers/user/navController');

router.get('/:type',(req,res,next)=>{
    let type = req.params.type;
    if(type == 'booking'){
        return res.redirect('/');
    }
    next()
},navController.index);

module.exports = router;