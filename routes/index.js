var express = require('express');
var router = express.Router();
var userModel=require('../models/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',
      {
        title: 'Travel',
        layout: 'layout',
      });
});

router.get('/login', function(req, res, next) {
    res.render('login',
        {
            title: 'Iniciar Sesion',
            layout: 'layout2',
        });
});

router.get('/registro', function(req, res, next) {
    res.render('registro',
        {
            title: 'Registro de Usuario',
            layout: 'layout2',
        });
});

router.get('/userlist', (req,res,next)=>{
    userModel.fetchAll((error,users)=>{
        if(error) return res.status(500).json(error);
        res.render('user-list',{
            title:"Listado de Ususrias",
            layout:"layout2",
            users
        })
    })
});


router.post('/registrook', function (req, res) {
    let Usuario={
        usuario:req.body.usuario,
        email:req.body.email,
        password:req.body.password
    }
    userModel.registro(Usuario,function (error,result) {
        if(error) res.status(500).json(error);
        else res.render('login',{
            title:"Registro correcto",
            layout:'layout2',
            correcto:true
        })
    })
})

router.get('/*', function(req, res, next) {
    res.render('error404',
        {
            title: 'error',
            layout: 'layout2',
        });
})

module.exports = router;
