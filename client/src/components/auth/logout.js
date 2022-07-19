import {useNavigate} from 'react-router-dom';
import {useEffect,useContext} from 'react'
import {appContext} from '../../App'

let Logout = ()=>{
let appContextValue = useContext(appContext)
let navigation = useNavigate()
useEffect(()=>{
    localStorage.removeItem('sports_token')
    localStorage.removeItem('refresh_sports_token')
    localStorage.removeItem('REMEMBER_ME')
    appContextValue.setIsLoggedIn(false)
    navigation('/home')
},[])



}
export default Logout