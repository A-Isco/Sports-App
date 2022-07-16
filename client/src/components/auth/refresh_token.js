import axios from 'axios'


let Refresh_token = ()=>{

        let token = localStorage.getItem('sports_token')
        let ref_token = localStorage.getItem('refresh_sports_token')
        let tokens = {
            token:token,
            refresh_token:ref_token,
        }
    axios.post("http://localhost:4000/refresh_token",tokens).then((response)=>{
        if(response.status ===200){
            


            localStorage.setItem('sports_token',response.data.token)
            localStorage.setItem('refresh_sports_token',response.data.refresh_token)
            console.log('tokens have been refreshed');
        }
    })
    .catch((err)=>{console.log(err); }) 

}
export default Refresh_token