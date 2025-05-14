import { Field, Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { getDistricts } from "../CommonAPIs";
import commonAxios from "../../axios/CommonAxios";
import ApiUrls from "../../API-urls/api-urls";
import { useNavigate } from "react-router-dom";

const DistrictReport = () => {

    const navigate = useNavigate();

    const [distDrillReport, setDistDrillReport] = useState([]);
    const [distData, setdistData] = useState([]);
    const [districtName, setDistrictName] = useState("");


    useEffect(() => {
        const fetchDistricts = async () => {
            const Disrtictdata = await getDistricts();
            setdistData(Disrtictdata);
        }
        fetchDistricts();

    }, []);


    const formik = useFormik({
        initialValues: {
            distCode: "",
        },
        onSubmit: async (values) => {
            const district = distData.find((district) => district.dist_code == values.distCode);
            setDistrictName(district ? district.dist_name : "");
            await commonAxios.get(ApiUrls.contextURL + "distDrillReport?distCode=" + values.distCode).then((res) => {
                if (res.data.success === true) {
                    // console.log("API Response:", res.data.data);
                    setDistDrillReport(res.data.data);
                }
                else {
                    setDistDrillReport([]);
                }
            })

        }
    })

    const handleBack = () => {
        navigate("/home")
    }

    return (
        <>
            <div className=" border container  d-flex flex-column align-items-center mt-5">

                <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit}>

                        {/* <div className="  container d-flex flex row">
                                <div className="  col">
                                <h4 className="text-center mt-3">District Report</h4>
                                </div>
                                <div className="  col">
                                <button type="button" className="mt-3 float-end" onClick={handleBack}>Back</button>
                                </div>
                            </div> */}
                        <div className="container d-flex justify-content-between align-items-center mt-3 position-relative">
                            <h4 className="position-absolute start-50 translate-middle-x m-0">District Report</h4>
                            <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                        </div>

                        <div className=" container flex d-flex mt-5 mb-3 row">
                            <div className="col mt-3 mb-2">

                                {/* <label className="form-label" name="distCode">Select District</label><br></br> */}
                                <Field as="select" name="distCode" className="form-control mt-4" >
                                    <option className='text-center' value=''>---Select District---</option>
                                    {distData.map((district) => (
                                        <option key={district.dist_code} value={district.dist_code}>{district.dist_name}</option>
                                    ))}
                                </Field>

                            </div>
                            <div className="col mt-3 mb-2">
                                <button type="submit" className=" btn btn-primary float-end mt-4">Get Details</button>
                            </div>


                        </div>
                    </Form>
                </FormikProvider>
            </div>
            {distDrillReport.length > 0 && (
                distDrillReport.length > 0 ? (
                    <div className="border container d-flex  flex-column align-items-center mt-5">
                        <div>
                            <h4 className="mt-4">{districtName} Report</h4>
                            <div className="d-flex  justify-content-end p-3">
                                <button type="button" onClick={handleBack}>Back</button>
                            </div>
                        </div>
                        <div className=" container mt-3 mb-2">
                            <table className="table table-bordered mt-3">
                                <thead className="table-light mt-3 text-center">
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Aadhar</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {distDrillReport.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.mobile}</td>
                                            <td>{user.uid}</td>
                                            <td>{user.email}</td>
                                            <td>{`${user.dist_name}, ${user.mandal_name}, ${user.village_name}, ${user.street}, ${user.door_no} - ${user.pin_code}`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (<center className="mt-4 text-danger">No Data Found</center>)

            )}
        </>
    )

}
export default DistrictReport;