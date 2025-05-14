import { Field, Form, FormikProvider, useFormik } from "formik";

const CountDownTimer = () => {

    const Months = [
        { value: 1, label: 'Jan' },
        { value: 2, label: 'Feb' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'Aug' },
        { value: 9, label: 'Sep' },
        { value: 10, label: 'Oct' },
        { value: 11, label: 'Nov' },
        { value: 12, label: 'Dec' }
    ];

    const formik = useFormik({
        initialValues: {
            month: '',
            date: '',
            year: '',
        },
        onSubmit: async (values) => {

            const currentYear= new Date().getFullYear();
            const currentMonth=new Date().getMonth();
            const currentDate=new Date().getDate();


        }
    })


    return (
        <>
            <div className="container border mt-3 d-flex flex-column align-items-center">
                <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit}>
                        <div className="container mt-3">
                            <div className="row mt-3">
                                <div className="col mt-2">
                                    <label className="form-label">year</label>
                                    <Field as='select' name='year' className='form-control' onChange={(e)=>{
                                        formik.handleChange(e);
                                        formik.setFieldValue("month",'');
                                        formik.setFieldValue("date",'');
                                    }}>
                                        <option>select</option>
                                        {Array.from({ length: 2050 - new Date().getFullYear() + 1 }, (_, index) => new Date().getFullYear() + index).map((year) => (
                                            <option value={year}>{year}</option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="col mt-2">
                                    <label className="form-label">Month</label>
                                    <Field as='select' name='month' className='form-control' >
                                        <option>select</option>
                                        {formik.values.year == new Date().getFullYear() ? Months.filter((_,index)=> index>= new Date().getMonth()).map((month)=>(
                                            <option value={month.value}>{month.label}</option>
                                        )):
                                            Months.map((month) => (
                                            <option value={month.value}>{month.label}</option>
                                        ))}
                                    </Field>
                                </div>
                                <div className="col mt-2">
                                    <label className="form-label">Date</label>
                                    <Field as='select' name='date' className='form-control' >
                                        <option>select</option>
                                        
                                        {Array.from({ length: formik.values.month && formik.values.year ? 
                                         new Date(formik.values.year ,formik.values.month,0).getDate() :31 }, (_, index) => index + 1).map((date) => (
                                            <option value={date}>{date}</option>
                                        ))}
                                    </Field>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary float-end mt-5 mb-2">Submit</button>
                        </div>
                    </Form>
                </FormikProvider>


            </div>
        </>
    )

}

export default CountDownTimer;