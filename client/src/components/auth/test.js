import { useState,useEffect } from "react";
import axios from 'axios'
import Refresh_token from './refresh_token'
let Test = ()=>{
    let [user, setUser] = useState(null)
    let [error, setError] = useState({})
   
        // console.log('after refresh token function');
        
        
        let send_req = ()=>{
            Refresh_token()
                let token=localStorage.getItem('sports_token')
                axios.get("http://localhost:4000/",{
                    headers:{'authorization':'token '+token}
                }).then((response)=>{
                    if(response.status ===200){
                        setUser(response.data.id)
                    }
                    
                })
                .catch((err)=>{ setError(err.message); console.log(error); }) 
                return(
                    <div>
                        <p>user</p>
                       <p>{user}</p>
                    </div>
                )
            

            
        }

       




    return(
        <div>
            {send_req()}
            
        </div>
    )

// }else{
//     return (
//         <div>
//         {error}
//     </div>
//     )
// }


}
export default Test