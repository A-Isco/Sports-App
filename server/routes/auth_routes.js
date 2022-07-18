const user_controller = require('../controllers/user_controller.js')
const authenticate_token = require('../middleware/authenticate_token.js')
const isAdmin = require('../middleware/isAdmin')
const multer  = require('multer');

var multerStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads');
    },
    filename: function (req, file, cb) {
        const ext=file.mimetype.split('/')[1];
        cb(null, req.file+"."+ext) //Appending .jpg
    }
});

const upload = multer({
    storage:multerStorage
});



module.exports=(app)=>{
    app.get('/',authenticate_token,(req,res)=>{
        res.send(req.player_id)
    })

    app.get('/login',(req,res)=>{
        res.send('login page')
    })

    app.get('/signup',(req,res)=>{
        res.send('signup page')
    })

    app.get('/users',user_controller.get_all_players )

    app.get('/users/:id',user_controller.get_player)

    app.post('/signup',upload.single('img'),user_controller.create_player)
    app.post('/login',user_controller.login)
    app.post('/refresh_token',user_controller.refresh_token)


}
