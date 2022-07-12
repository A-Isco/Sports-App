import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react'


let Logout = ()=>{
let navigation = useNavigate()
useEffect(()=>{
    localStorage.removeItem('sports_token')
    navigation('/login')
},[])



}
export default Logout