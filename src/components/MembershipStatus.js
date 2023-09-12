import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { connect } from 'react-redux'

import axios from 'axios'

// used for get id of the deligence
import { useLocation } from 'react-router-dom';

import { useFormik } from 'formik'
import { membershipApprovalValidationSchema } from '../validation/employee.validation';

const mapStateToProps = ({ session }) => ({
    session
})

const initialValues = {
    message: "",
    membershipStatus: ""
}



const MembershipStatus = ({ session }) => {

     // fetch membership phone number from the request
     const location = useLocation();
    
     // membership phone number
     const membershipPhoneNumber = location.state?.phone;

    const [data, setData] = useState({})
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };
    
    const onsubmit = async () =>{
        if (!isChecked) {
            alert("Please check the checkbox before submitting.");
            return;
        }

        axios.defaults.withCredentials = true
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/membership/apply-for-membership`, {}, {headers:{"Content-Type":"application/json"}})
        console.log(response.data)
        toast(response.data.message)
    }


    const fetchData = async () => {
        try {
            axios.defaults.withCredentials = true
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/membership/membership/${membershipPhoneNumber}`)
            console.log(response.data)
            if(response.data.success){
                setData(response.data.data)
            } else {
                toast(response.data.message)
            }


        } catch (error){
            console.log(error)
            toast("Internal Server Error while fetching data")
        }
    }

    const { values, touched, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema:membershipApprovalValidationSchema,

        onSubmit: async (values, action) => {
            console.log(values)
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/employee/approve-membership`, {...values, memberPhone: membershipPhoneNumber}, {headers: {"Content-Type":"application/json"}})
            console.log(response.data)
            toast(response.data.message)
            if(response.data.success){
                action.resetForm()
            }
        }
    })

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='' style={{paddingLeft:"100px", height:'100vh', overflow:'scroll'}}>
            <p className='text-black'>Form 1</p>
            <p className='text-black'>Company Name: {data.companyName}</p>
            <p className='text-black'>Company Address: {data.companyAddress}</p>
            <p className='text-black'>owner Name: {data.ownerName}</p>
            <p className='text-black'>Company Telephone: {data.companyTelephone}</p>
            <p className='text-black'>Company Phone: {data.companyPhone}</p>
            <p className='text-black'>Company Email: {data.companyEmail}</p>
            <p className='text-black'>Company Factory: {data.companyBranch}</p>
            <p className='text-black'>Company Branch: {data.companyFactory}</p>
            <p>.</p>
            <p className='text-black'>Membership form Status: {data.membershipFormStatus}</p>
            <p className='text-black'>Payment Status: {data.paymentStatus ? "TRUE" : "FALSE"}</p>
            <p>.</p>
            <p className='text-black'>Form 2</p>
            <p className='text-black'>Company Type: {data.companyType}</p>
            <p className='text-black'>Company Registration Year: {data.companyRegistrationYear}</p>
            <p className='text-black'>PAN Number: {data.panNumber}</p>
            <p className='text-black'>GST Number: {data.gstNumber}</p>
            <p className='text-black'>CIN Number: {data.cinNumber}</p>
            <p className='text-black'>Company Registration proof document name: {data?.companyRegistrationProofAttachment?.documentName}</p>
            <div style={{display:'flex', justifyContent:'center'}}>
                {data.companyRegistrationProofAttachment && <embed src={data.companyRegistrationProofAttachment.file} width="1000px" height="1000px" />}
            </div>
            <p>.</p>
            <p className='text-black'>Form 3</p>
            <p className='text-black'>Type Of Membership: {data.typeOfMembership}</p>
            <p className='text-black'>Company Turnover range: {data.companyTurnOverRange}</p>

            <p className='text-black'>Company Required ERDA Services: {
                data.companyERDARequiredServices?.map((val, index) => <span key={index}>{val}</span>)
            }</p>
            
            <p className='text-black'>Company Products: 
                {
                    data.companyProducts?.map((product, index) => {
                        return (
                            <div key={index}>
                                <p className='text-black'>No: {index + 1}</p>
                                <p className='text-black'>Name: {product.productName}</p>
                                <p className='text-black'>Capacity: {product.produtCapacity}</p>
                                <p className='text-black'>Unit: {product.productUnit}</p>
                            </div>
                        )
                    })
                }
            </p>

            
            <p className='text-black'>Membership status: {data.membershipStatus}</p>
            <p className='text-black'>Payment Status: {data.paymentStatus}</p>
            <div style={{display:'flex', justifyContent:'center'}}>
                {data.turnOverBalanceSheet && <embed src={data.turnOverBalanceSheet} width="1000px" height="1000px" />}
            </div>
            

            {/* show this when application is under draft stage or reverted stage && member with their membership logged in */}
            {((data?.membershipStatus == "draft" || data?.membershipStatus == "reverted") && data?.member?.phone == session.phone ) ? 
                <div style = {{width : '70%', margin:'20px auto', display:'flex', flexDirection:'column'}}>
                    <div style={{margin:"20px 0px"}}>
                        <input type="checkbox" id="Yes" name="Yes" value="Yes" checked={isChecked} onChange={handleCheckboxChange}/>
                        <label htmlFor="yes" style={{color: '#1300B3',marginLeft : 10}}>By submitting this application, I agree to abide by the terms and conditions set forth by the company and understand that my submission constitutes a legally binding affirmation of the statements made herein.</label><br/>
                    </div>
                    <div style={{margin:"auto"}}>
                        <button type="submit" className='savebtn'  style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 30, marginInline: 40, padding:"10px 30px" }} onClick={onsubmit} >Submit</button>
                    </div>
                </div> 
                : null
            }

            {(data?.membershipStatus == "pending" && data?.member?.phone == session.phone) ? <h1 style={{backgroundColor:"#0f3c69" , padding:"10px 20px", fontWeight:"bold", width:"70%", margin:"50px auto", textAlign:'center'}}>Your membership application is currently in the processing stage at ERDA.</h1> : null}

            {/* approval form handling */}
            {(session.phone == data?.approver?.phone && data?.membershipStatus == "pending") ? 
            <div>
                <div style={{ display:'flex', flexDirection:"column", width:'70%', margin:"auto", color:'black' }}>
                <div style={{margin:"10px 0px"}}>
                    <label style={{ display: 'inline-block', marginRight: '10px' }}>
                        Select the Action for Membership form :
                    </label>
                    <label style={{ display: 'inline-block', marginRight: '10px' }}>
                        <input
                        type="radio"
                        name="membershipStatus"
                        id="membershipStatus"
                        value="approved"
                        onChange={handleChange}
                        checked={values.membershipStatus === "approved"}
                        style={{margin:"0 5px"}}
                        />
                        Approve
                    </label>

                    <label style={{ display: 'inline-block', marginRight: '10px' }}>
                        <input
                        type="radio"
                        name="membershipStatus"
                        id="membershipStatus"
                        value="reverted"
                        onChange={handleChange}
                        checked={values.membershipStatus === "reverted"}
                        style={{margin:"0 5px"}}
                        />
                        Revert
                    </label>

                    <label style={{ display: 'inline-block', marginRight: '10px' }}>
                        <input
                        type="radio"
                        name="membershipStatus"
                        id="membershipStatus"
                        value="rejected"
                        onChange={handleChange}
                        checked={values.membershipStatus === "rejected"}
                        style={{margin:"0 5px"}}
                        />
                        Reject
                    </label>
                </div>

                <div  style={{margin:"10px 0px"}}>
                    <label style={{ marginRight: '10px' }}>
                        Remarks <span style={{ color: 'red' }}>*</span>
                    </label>
                    <textarea name="message" id="message" value={values.message} onChange={handleChange} required  style={{ backgroundColor: '#eee', width: '25%', minHeight: '0px', borderRadius: 4 }}></textarea>
                </div>
                <div style={{margin:"auto"}}>
                <button type="submit" className='savebtn'  style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 30, marginInline: 40, padding:"10px 30px" }} onClick={handleSubmit} >Submit</button>
                </div>
                </div>
            </div> 
            : null
            }
        </div>
    )
}


export default connect(
    mapStateToProps
)(MembershipStatus)
