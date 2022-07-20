const user_controller = require('../controllers/user_controller.js')
const authenticate_token = require('../middleware/authenticate_token.js')
const isAdmin = require('../middleware/isAdmin')
const multer  = require('multer');
const {v4: uuidv4} = require("uuid");

const DIR = './uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4()+ '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
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
