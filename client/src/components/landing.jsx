import  {BrowserRouter,Route,Router,Routes } from 'react-router-dom'
import PrivateRoute from "./auth/privateRoute";
import PlacesList from "./placesList";
import PlayersList from "./playersList";
import Nav from "./core/newHomeBar";
import LandingNavbar from "./core/landingNavBar";
import PlaceDetails from "./placeDetails";
import CalenderComponent from "./calender/calendercomponent";
import PlacesCreatePage from "./PlacesCreatePage";
import PlacesEditPage from "./placesEditPage";
import AdminRoute from "./auth/adminRoute";
import NotFound from "./notFound";



let Landing = ()=>{

    return (
        <div>
            <LandingNavbar/>
            <Routes>

                <Route path="" element={<PrivateRoute component={PlacesList}/>} />
                <Route path="places" element={<PrivateRoute component={PlacesList}/>} />
                <Route path="players" element={<PrivateRoute component={PlayersList}/>} />
                <Route path="places/:placeId" element={<PrivateRoute component={PlaceDetails}/>} />
                {/* <Route path="/calender"   element={<PrivateRoute component={CalenderComponent}/>}/> */}
                <Route path="create-place"  element={<AdminRoute component={PlacesCreatePage}/>}/>
                < Route path = ":placeId/edit-place" element={<AdminRoute component={PlacesEditPage}/>}/>
                <Route path='/notfound'element={<NotFound/>}/>
                
            </Routes>

        </div>
    )
}

export default Landing;