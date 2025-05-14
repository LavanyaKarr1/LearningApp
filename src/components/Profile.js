import { FormikProvider, useFormik } from "formik";

const Profile =({UserName}) =>{

// console.log("UserName",UserName);


    return (
        <div className="container mt-5 mb-5">
            <label className="form-label">UserName: </label>
            <input type='text' value={UserName} readOnly className="border-0 bg-transparent text-dark fw-bold"/>

        </div>
    )

}

export default Profile;