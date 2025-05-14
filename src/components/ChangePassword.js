import axios from "axios";
import { Field, Form, FormikProvider, useFormik } from "formik";
import ApiUrls from "../API-urls/api-urls";
import Swal from "sweetalert2";
import commonAxios from "../axios/CommonAxios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () =>{

    const navigate=useNavigate();

    const formik=useFormik({
        initialValues:{
            password:'',
            username:'',
        },
        onSubmit: async(values) =>{
            try{
                const changePasswordRespone=await commonAxios.post(ApiUrls.contextURL+'changePassword',values)
                if(changePasswordRespone.data.success === true){
                    Swal.fire({
                        text:changePasswordRespone.data.message,
                        icon:'success',
                    }).then(()=>{
                        navigate("/login")
                    })

                    
                }
                else{
                    Swal.fire({
                        text:changePasswordRespone.data.message,
                        icon:'error',
                    })
                }
            }
            catch(e){
                Swal.fire({
                    text:e.message,
                    icon:'error',
                })
            }
        }

    })


    return(
        <div className="container mt-5">
            <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <div className="row mt-5 mb-5">
                    <label className="form-label">UserName</label>
                    <Field type='text' name='username' className='form-control'></Field>
                </div>
                <div className="row mt-5 mb-5">
                    <label className="form-label">New password</label>
                    <Field type='password' className='form-control' name='password'></Field>

                </div>
                <button type='submit' className="btn btn-primary mb-4">Change Password</button>
                
            </Form>
            </FormikProvider>
            

        </div>
    )
}

export default ChangePassword;
