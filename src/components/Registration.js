import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import ApiUrls from '../API-urls/api-urls';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useState } from 'react';
import commonAxios from '../axios/CommonAxios';


const Registration = () => {

    const [getPassword, setPassword] = useState()

    const validationSchema = Yup.object({
        uid: Yup.string().required('Aadhar is required').matches(/^\d{12}$/, 'Should be 12 digits'),
        mobile: Yup.string().required('Mobile is required').matches(/^[6-9]\d{9}$/, 'Should be 10 digits'),
        username: Yup.string().required("Username is required"),
        dob: Yup.string().required('Dob is required').max(new Date(), 'Future Dates Not Allowed'),
        email: Yup.string().required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            uid: "",
            mobile: "",
            username: "",
            dob: "",
            email: "",

        },
        validationSchema,
        onSubmit: async (values) => {
            const registrationResponse = await commonAxios.post(ApiUrls.contextURL + "register", values);
            try {
                if (registrationResponse.data.success === true) {
                    setPassword(registrationResponse.data.userPassword);
                    Swal.fire({
                        title: registrationResponse.data.message,
                        icon: "success"
                    })
                }
                else {
                    Swal.fire({
                        title: registrationResponse.data.message,
                        icon: "info"
                    })
                }
                formik.resetForm();
                // console.log("registrationResponse.data.password>>>>",registrationResponse.data.userPassword);
            }
            catch (e) {
                Swal.fire({
                    title: "Some thing Went Wrong",
                    icon: "failure"
                })
            }


        }
    });


    return (
        getPassword ? (
            <div className='container d-flex flex-column  align-items-center justify-content-center  mt-5 p-4'>
                <span className='text-center'>
                    <span className='text-success'>Your password to Login is : </span>
                    <b className='text-dark'>{getPassword}</b>
                </span>
                <br />
                <p>Click here to <a href='/login'>Login</a></p>
            </div>
        ) : (
            <div className="container  d-flex  flex-column align-items-center vh-100 mb-4 mt-5">
                <h1 className='text-center mb-4 mt-0'>Registartion Form</h1>
                <div className="container border shadow-lg  p-4">
                    <FormikProvider value={formik}>
                        <Form onSubmit={formik.handleSubmit} autoComplete='off'>
                            <div className='row mb-3'>
                                <div className='col-md-4 mt-3'>
                                    <span className='text-danger'>* </span><label className='form-label'> UserName </label><br />
                                    <Field type="text" name="username" className="form-control mb-3"></Field>
                                    <ErrorMessage name='username' component='div' className='text-danger'></ErrorMessage>
                                </div>
                                <div className='col-md-4 mt-3'>
                                    <span className='text-danger'>* </span><label className='form-label'> Aadhar Number </label>
                                    <Field type="text" name="uid" className="form-control mb-3"
                                        maxLength="12" onInput={(e) =>
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                        }></Field>
                                    <ErrorMessage name='uid' component='div' className='text-danger'></ErrorMessage>
                                </div>
                                <div className='col-md-4 mt-3'>
                                    <span className='text-danger'>* </span><label className='form-label'> Mobile Number </label>
                                    <Field type="text" name="mobile" className="form-control mb-3" maxLength="10"
                                        onInput={(e) =>
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                                .replace(/^[0-5]/, '')
                                        }></Field>
                                    <ErrorMessage name='mobile' component='div' className='text-danger'></ErrorMessage>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='col-md-4 mt-3'>
                                    <span className='text-danger'>* </span> <label className='form-label'> Date of Birth </label><br />
                                    <Field type="date" name="dob" className="form-control mb-3" max={new Date().toISOString().split('T')[0]}></Field>
                                    {/* {formik.touched.dob && formik.errors.dob ?(
                                        <div className='text-danger'>{formik.errors.dob}</div>
                                    ):null} */}
                                    <ErrorMessage name="dob" component='div' className='text-danger'></ErrorMessage>
                                </div>
                                <div className='col-md-4 mt-3'>
                                    <span className='text-danger'>* </span><label className='form-label'> Email </label>
                                    <Field type="text" name="email" className="form-control mb-3"></Field>
                                    <ErrorMessage name='email' component='div' className='text-danger'></ErrorMessage>

                                </div>
                            </div>
                            {/* disabled={!formik.isValid || !formik.dirty} */}
                            <button type="submit" className='btn border btn-primary float-end'>
                                Submit
                            </button>



                        </Form>
                    </FormikProvider>

                </div>
            </div>
        )
    )



}
export default Registration;