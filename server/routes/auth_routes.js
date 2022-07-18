const user_controller = require('../controllers/user_controller.js')
const authenticate_token = require('../middleware/authenticate_token.js')
const isAdmin = require('../middleware/isAdmin')

module.exports=(app)=>{
    app.get('/',authenticate_token,isAdmin,(req,res)=>{
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

    app.post('/signup',user_controller.create_player)
    app.post('/login',user_controller.login)
    app.post('/refresh_token',user_controller.refresh_token)

    
}