import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import ApiUrls from "../API-urls/api-urls";
import axios from "axios";
import { useEffect, useState } from "react";
import { getDistricts, getMandals, getVillages } from "./CommonAPIs";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import commonAxios from "../axios/CommonAxios";
import { useNavigate } from "react-router-dom";

const UserAddressDetails = () => {
    const [getDistrictsData, setDistrictsData] = useState([]);
    const [getMandalsData, setMandalsData] = useState([]);
    const [getVillagesData, setVillagesData] = useState([]);
    const [getAddressData, setAddressData] = useState([]);


    const navigate = useNavigate();



    //Fetchig Districts Data
    useEffect(() => {
        const fetchDistricts = async () => {
            const Disrtictdata = await getDistricts();
            setDistrictsData(Disrtictdata);
        }
        fetchDistricts();

    }, []);

    //Fetchig Mandals Data
    useEffect(() => {
        const fetchMandals = async () => {
            const Mandalsdata = await getMandals();
            setMandalsData(Mandalsdata);
        }
        fetchMandals();
    }, []);

    //Fetching Villages Data
    useEffect(() => {
        const fetchVillages = async () => {
            const Villagesdata = await getVillages();
            setVillagesData(Villagesdata);
        }
        fetchVillages();

    }, []);

    useEffect(() => {
        getAddressDetails();
    }, []);

    const getAddressDetails = () => {
        commonAxios.get(ApiUrls.contextURL + 'address-details').then((res) => {
            if (res.data.success === true) {
                setAddressData(res.data.message);
            }
        })
    }

    const validationSchema = Yup.object({
        district: Yup.number().required('District is required'),
        mandal: Yup.number().required('Mandal is required'),
        village: Yup.number().required('Village is required'),
        street: Yup.string().required('Street is required'),
        doorNo: Yup.string().required('Door No is required'),
        pinCode: Yup.number().required('PinCode is required'),

    });

    const formik = useFormik({
        initialValues: { 
            district: getAddressData.length > 0 ? getAddressData[0].dist_code : '',
            mandal: getAddressData.length > 0 ? getAddressData[0].mandal_code : '',
            village: getAddressData.length > 0 ? getAddressData[0].village_code : '',
            street: getAddressData.length > 0 ? getAddressData[0].street : '',
            doorNo: getAddressData.length > 0 ? getAddressData[0].doorNo : '',
            pinCode: getAddressData.length > 0 ? getAddressData[0].pinCode : ''
        },
  enableReinitialize: true, 
        validationSchema,
        onSubmit: async (values) => {
            const addressDetailsResponse = await commonAxios.post(ApiUrls.contextURL + 'userAddressDetails', values);
            try {
                if (addressDetailsResponse.data.success === true) {
                    Swal.fire({
                        text: addressDetailsResponse.data.message,
                        icon: 'success'
                    }).then(() => {
                       navigate("/home")
                    })
                }
                else {
                    Swal.fire({
                        text: addressDetailsResponse.data.message,
                        icon: "error"
                    })
                }

            }
            catch (e) {
                Swal.fire({
                    text: 'Internal Server Error',
                    icon: 'error'
                })
            }

        }
    })



    //Filter Mandals Based on Selected District
    const filteredMandalsData = getMandalsData.filter(
        (mandal) => mandal.dist_code == formik.values.district
    ) || [];

    //Filter Villages Based on Selected District and Mandal
    const filteredVillagesData = getVillagesData.filter(
        (village) => village.dist_code == formik.values.district && village.mandal_code == formik.values.mandal
    ) || [];

    // console.log("formik.values", formik.values);

    const handleBack = () => {
        navigate("/home")
    }

const isAddressReadOnly = getAddressData.length > 0;
    return (

        <div className="container d-flex flex-column align-items-center  mt-5">
            <h3>User Address Details</h3>

            {/* <button  type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full flex justify-end mt-4">Back</button> */}

            <div className="w-100 d-flex justify-content-end mt-3">
                <button
                    type="button"
                    className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                    onClick={handleBack}
                >
                    Back
                </button>
            </div>


            <div className="container border mt-5 mb-4">
                <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit} autoComplete="off">
                        <div className="row mb-3 ">
                            <div className="col md-4 mt-3 ">
                                <span className="text-danger">*</span><label className="form-label"> District</label>
                                <Field as='select' className='form-control' name='district' disabled={isAddressReadOnly} onChange={(e) => {
                                    formik.handleChange(e);
                                    formik.setFieldValue("mandal", '');
                                }}>
                                    <option value=''>Select District</option>
                                    {getDistrictsData.map((district) => (
                                        <option key={district.dist_code} value={district.dist_code}>{district.dist_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="district" className="text-danger" component='div'></ErrorMessage>
                            </div>
                            <div className="col md-4 mt-3 ">
                                <span className="text-danger">*</span><label className="form-label"> Mandal</label>
                                <Field as='select' className='form-control' name='mandal' disabled={isAddressReadOnly} onChange={(e) => {
                                    formik.handleChange(e);
                                    formik.setFieldValue("villge", '');
                                }} >
                                    <option value=''>Select Mandal</option>
                                    {filteredMandalsData.map((mandal) => (
                                        <option key={mandal.mandal_code} value={mandal.mandal_code}>{mandal.mandal_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name='mandal' className="text-danger" component='div'></ErrorMessage>
                            </div>
                            <div className="col md-4 mt-3 ">
                                <span className="text-danger">*</span><label className="form-label" >Village</label>
                                <Field as='select' className='form-control' name='village' disabled={isAddressReadOnly}> 
                                    <option value=''>Select Village</option>
                                    {filteredVillagesData.map((village) => (
                                        <option key={village.village_code} value={village.village_code}>{village.village_name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name='village' className="text-danger" component='div'></ErrorMessage>
                            </div>

                        </div>


                        <div className="row mb-3 ">
                            <div className="col md-4 mt-3 ">
                                <span className="text-danger">*</span><label className="form-label">Enter Street</label>
                                <Field className='form-control' name="street" maxLength='20' disabled={isAddressReadOnly}></Field>
                                <ErrorMessage name='street' className="text-danger" component='div'></ErrorMessage>
                            </div>
                            <div className="col md-4 mt-3 ">
                                <span className="text-danger">*</span><label className="form-label">Enter Door-No</label>
                                <Field className='form-control' name="doorNo" maxLength='10' disabled={isAddressReadOnly}></Field>
                                <ErrorMessage name='doorNo' className="text-danger" component='div'></ErrorMessage>
                            </div>
                            <div className="col md-4 mt-3 ">
                                <span className="text-danger">*</span><label className="form-label">Enter Pincode</label>
                                <Field className='form-control' name='pinCode' maxLength='6' disabled={isAddressReadOnly}
                                    onInput={(e) =>
                                        e.target.value = e.target.value.replace(/[^0-9]/g, '')
                                    }></Field>
                                <ErrorMessage name='pinCode' className="text-danger" component='div'></ErrorMessage>
                            </div>

                        </div>
                        {!isAddressReadOnly && (
                        <button type="submit" className=" btn  btn-primary border float-end mb-4">Submit</button>
                        )}
                    </Form>
                </FormikProvider>


            </div>

        </div>

    )
}

export default UserAddressDetails;