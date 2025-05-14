import React, { useState } from "react";
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, FormikProvider, swap, useFormik } from "formik";
import Swal from "sweetalert2";

const AgeCalculator = () => {

    const [ageResult, setAgeResult] = useState("");

    const validationSchema=Yup.object({
        dob:Yup.string().required("Enter Your DOB")
    })

    const formik=useFormik({
        initialValues:{
            dob:''
        },

        validationSchema,
        onSubmit:async(value)=>{
            const dob=value.dob;
            if(!dob){
                Swal.fire({
                    title:"Please select your Date of Birth",
                    icon:'info'
                })
            }
            const today=new Date();
            const birthDate=new Date(dob);

            let years=today.getFullYear()-birthDate.getFullYear();
            let months=today.getMonth()-birthDate.getMonth();
            let days=today.getDate()-birthDate.getDate();

            if(months<0){
                years--;
                months+=12;
            }
            if(days<0){
                months--;
                const previousMonthDays=new Date(today.getFullYear(),today.getMonth(),0);
                days+=previousMonthDays.getDate();
            }
            setAgeResult(`You are ${years} years, ${months} months, and ${days} days old.`);
            // if(years && months&& days){
            //     Swal.fire({
            //         title:`You are ${years} years ${months} months ${days} days old`,
            //         icon:'success'
            //     })
            // }
        }
    })

    return (
        <>
        <div className="container border mt-5 d-flex flex-column align-items-center mb-3">
            <h5>Age Calculator</h5>
            <FormikProvider value={formik}>
                <Form onSubmit={formik.handleSubmit}>
                    <div className="border row mt-2 mb-3">
                    <div className="col mt-3 mb-2">
                    <label className="from-label" name='dob'>Date of Birth</label>
                    <Field type='date' name='dob' className='form-control'>

                    </Field>
                    <ErrorMessage name="dob" component='div' className="text-danger"></ErrorMessage>
                    <br/>
                    </div>
                    <div className="col  mt-3 mb-2">
                    <button className="btn btn-primary float-end mt-3 mb-2" type="submit">Calculate Age</button>
                    </div>
                    </div>
                    
                    
                </Form>
            </FormikProvider>
            {ageResult && (
                    <div className="alert alert-info text-center mt-3" role="alert">
                        {ageResult}
                    </div>
                )}
            </div>
        </>
    )
}



export default AgeCalculator;


