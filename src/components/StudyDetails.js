import axios from "axios";
import { Field, FieldArray, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
import commonAxios from "../axios/CommonAxios";
import ApiUrls from "../API-urls/api-urls";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const StudyDetails = () => {

    const navigate=useNavigate();


    const validationSchema = Yup.object().shape({
        studyDetails: Yup.array().of(
            Yup.object().shape({
                classNo: Yup.string().required('Required'),
                school: Yup.string().required('Required'),
                hallTicket: Yup.string().required('Required'),
                yearOfPass: Yup.string().required('Required'),
                percentage: Yup.string().required('Required')
            })
        )
    });

    const formik = useFormik({
        initialValues: {
            studyDetails: [{
                classNo: '',
                school: '',
                hallTicket: '',
                yearOfPass: '',
                percentage: '',
            }]
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('Submitted:', values);
            await commonAxios.post(ApiUrls.contextURL + 'userStudyDetails', values).then((res) => {
                if (res.data.success === true) {
                    Swal.fire({
                        text: res.data.message,
                        icon: 'success'
                    }).then(() => {
                        navigate("/home")
                    })
                }
                else{
                     Swal.fire({
                        text: res.data.message,
                        icon: 'error'
                    })
                }
            })

        }

    })

    const classNo = [{
        classNo: '10th',
    }, {
        classNo: 'Intermediate',
    }, {
        classNo: 'Degree',
    }

    ]
 const handleBack = () => {
        navigate("/home")
    }



    return (

        <>
            <div className="container border mt-5 d-flex flex-column justify-content-center align-items-center">
                <h4>Study Details</h4>
                <div className="w-100 d-flex justify-content-end mt-3">
                <button
                    type="button"
                    className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                    onClick={handleBack}
                >
                    Back
                </button>
            </div>
                <FormikProvider value={formik}>
                    <Form>
                        <FieldArray name="studyDetails">
                            {({ push, remove }) => {
                                const selectedClassNos = formik.values.studyDetails
                                    .map(d => d.classNo)
                                    .filter(Boolean);
                                const isAddDisabled = selectedClassNos.length >= classNo.length;
                                return (
                                    <>
                                        {formik.values.studyDetails.map((_, index) => {
                                            const selectedClassNos = formik.values.studyDetails
                                                .map((item, i) => (i !== index ? item.classNo : null))
                                                .filter(Boolean);

                                            const availableOptions = classNo.filter(
                                                opt => !selectedClassNos.includes(opt.classNo) || opt.classNo === formik.values.studyDetails[index].classNo
                                            );
                                            return (
                                                <div key={index} className="border p-3 mb-3">
                                                    <div className="row">
                                                        <div className="col mb-2">
                                                            <label className="form-label">Degree / Class</label>
                                                            <Field className="form-control" as='select' name={`studyDetails[${index}].classNo`} >
                                                                <option>----select----</option>
                                                                {availableOptions.map((option, index) => (
                                                                    <option key={index} value={option.classNo}>{option.classNo}</option>
                                                                ))}
                                                            </Field>
                                                        </div>
                                                        <div className="col mb-2">
                                                            <label className="form-label">School or College Name</label>
                                                            <Field className="form-control" name={`studyDetails[${index}].school`} />
                                                        </div>
                                                        <div className="col mb-2">
                                                            <label className="form-label">Hall Ticket</label>
                                                            <Field className="form-control" name={`studyDetails[${index}].hallTicket`} />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col mb-2">
                                                            <label className="form-label">Year of Pass</label>
                                                            <Field className="form-control" name={`studyDetails[${index}].yearOfPass`} />
                                                        </div>
                                                        <div className="col mb-2">
                                                            <label className="form-label">Percentage (%)</label>
                                                            <Field className="form-control" name={`studyDetails[${index}].percentage`} />
                                                        </div>
                                                        <div className="col d-flex align-items-end">
                                                            {index > 0 && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger mb-2"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    - Remove
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )

                                        })}

                                        {isAddDisabled ? '' :
                                            <button
                                                type="button"
                                                className="btn btn-success mb-3"
                                                onClick={() =>
                                                    push({
                                                        classNo: '',
                                                        school: '',
                                                        hallTicket: '',
                                                        yearOfPass: '',
                                                        percentage: ''
                                                    })
                                                }

                                            >
                                                + Add More
                                            </button>
                                        }
                                    </>
                                )
                            }}
                        </FieldArray>

                        <div className="mt-4">
                            <button type="submit" className="btn btn-primary float-end mb-3">
                                Submit
                            </button>
                        </div>
                    </Form>
                </FormikProvider>

            </div >
        </>
    );


}

export default StudyDetails;