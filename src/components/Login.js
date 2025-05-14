import { Field, Form, FormikProvider, useFormik } from "formik";
import ApiUrls from "../API-urls/api-urls";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import commonAxios from "../axios/CommonAxios";

const Login =() =>{

    const navigate=useNavigate();

    const validationSchema=Yup.object({
        username:Yup.string().required('UserName is required'),
        password:Yup.string().required("Password is required"),
    });

    const formik=useFormik({
        initialValues:{
            username:"",
            password:"",
        },
        validationSchema,
        onSubmit: async (values) =>{
            try{
                // console.log("API URL: ", ApiUrls.contextURL+"login");
                const loginResponse= await commonAxios.post(ApiUrls.contextURL+"login",values);
                // console.log("loginResponse.data.success >>>>>",loginResponse.data.success );
                // console.log("Full API Response:", loginResponse);
                if(loginResponse.data.success === true){
                    // alert("okk")
                    const token=loginResponse.data.token;
                    localStorage.setItem("token",token);
                    const decodedToken=jwtDecode(token);
                    localStorage.setItem("candidateName",decodedToken.username);
                    localStorage.setItem("tokenExpiration",decodedToken.exp * 1000);
                    // console.log("tokenExpiration>>>",new Date(decodedToken.exp * 1000));
                    
                    Swal.fire({
                        text:loginResponse.data.message,
                        icon:"success"
                    }).then(()=>{
                        navigate('/home');
                    })
                }
                else{
                    Swal.fire({
                        text:loginResponse.data.message,
                        icon:"error"
                    })
                }
                formik.resetForm();
                
            }
            catch(e){
                // console.log("e.response>>>>>>>>>>",e.response);
                
                Swal.fire({
                    text:"Internal Server Issue",
                    icon:"error"
                })
            }
            
        },
    });

    return(
        <div className="conatiner d-flex flex-column align-items-center vh-100 mt-5 border">
            <h1 className="mt-5">Login Form</h1>
            <div className="conatiner border shadow-lg mt-5 p-4">
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                    <div className="row mt-5  mb-5">
                    <label className="form-label">UserName</label><br/>
                    <Field type="text" name="username" className="form-control"></Field>
                    {formik.touched.username && formik.errors.username ?(
                        <div className="text-danger">{formik.errors.username}</div>
                    ):null}
                    </div>
                    <div className="row  mb-5">
                    <label className="form-label">Password</label><br/>
                    <Field type="password" name="password" className="form-control"></Field>
                    {formik.touched.password && formik.errors.password ?(
                        <div className="text-danger">{formik.errors.password}</div>
                    ):null}
                    </div>
                    <button className="btn btn-primary float-end">Login</button>
                    <a className="float-left" href="/changePassword">Forgot password</a>
                </Form>
            </FormikProvider>
            </div>
            
        </div>
    )

}

export default Login;