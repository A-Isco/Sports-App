const user_controller = require('../controllers/user_controller.js')
const authenticate_token = require('../middleware/authenticate_token.js')


module.exports=(app)=>{
    app.get('/',authenticate_token,(req,res)=>{
        res.send('heeey')
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
    app.get('/refresh_token',user_controller.refresh_token)

    
}