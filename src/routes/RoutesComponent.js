import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import Registration from "../components/Registration";
import Login from "../components/Login";
import Home from "../components/Home";
import ChangePassword from "../components/ChangePassword";
import Profile from "../components/Profile";
import UserAddressDetails from "../components/UserAddressDetails";
import SessionExpirationHandler from "./sessionHandler";
import DistrictWiseReport from "../components/reports/DistrictWiseReport";
import DistrictReport from "../components/reports/DistrictReport";
import AgeCalculator from "../components/AgeCalculator";
import CountDownTimer from "../components/CountDownTimer";
import StudyDetails from "../components/StudyDetails";

const RoutesComponent = () => {

  


    return (
        <BrowserRouter>
         <SessionExpirationHandler />
            <Routes>
                <Route path='/registration' element={<Registration />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/changePassword' element={<ChangePassword/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/userAddressDetails' element={<UserAddressDetails />} />
                <Route path='/districtWiseReport' element={<DistrictWiseReport/>} />
                <Route path='/districtReport' element={<DistrictReport/>} />
                <Route path='/ageCalcualtor' element={<AgeCalculator/>} />
                <Route path='/timer' element={<CountDownTimer/>} />
                <Route path='/StudyDetails' element={<StudyDetails/>} />
                
            </Routes>
        </BrowserRouter>
    )

}

export default RoutesComponent;