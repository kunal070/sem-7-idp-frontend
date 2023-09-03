import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { connect } from 'react-redux'

import axios from 'axios'

const mapStateToProps = ({ session }) => ({
    session
})

const MembershipStatus = ({ session }) => {
    const [data, setData] = useState({})
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
      };
    
    const onsubmit = () =>{
        if (!isChecked) {
            alert("Please check the checkbox before submitting.");
            return;
        }
    }
    const fetchData = async () => {
        try {
            axios.defaults.withCredentials = true

            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/membership/membership/${session.memberId}`)

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
            <p className='text-black'>Payment Status: {data.companyType}</p>
            <p className='text-black'>Payment Status: {data.companyRegistrationYear}</p>
            <p className='text-black'>Payment Status: {data.panNumber}</p>
            <p className='text-black'>Payment Status: {data.gstNumber}</p>
            <p className='text-black'>Payment Status: {data.cinNumber}</p>
            <p className='text-black'>Payment Status: {data?.companyRegistrationProofAttachment?.documentName}</p>
            <div style={{display:'flex', justifyContent:'center'}}>
                {data.companyRegistrationProofAttachment && <embed src={data.companyRegistrationProofAttachment.file} width="1000px" height="1000px" />}
            </div>
            <p>.</p>
            <p className='text-black'>Form 3</p>
            <p className='text-black'>Payment Status: {data.companyType}</p>
            <p className='text-black'>Payment Status: {data.typeOfMembership}</p>
            <p className='text-black'>Payment Status: {data.companyTurnOverRange}</p>

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

            <p className='text-black'>Payment Status: {data.cinNumber}</p>
            <div style={{display:'flex', justifyContent:'center'}}>
                {data.turnOverBalanceSheet && <embed src={data.turnOverBalanceSheet} width="1000px" height="1000px" />}
            </div>
            <div class="spacer"></div>
            <div class="spacer"></div>


            {/* //checkbox for member */}
            <div style = {{marginLeft : 210,width : 1000}}>
                <input type="checkbox" id="Yes" name="Yes" value="Yes" checked={isChecked} onChange={handleCheckboxChange}/>
                <label htmlFor="yes" style={{color: '#1300B3',marginLeft : 10}}>By submitting this application, I agree to abide by the terms and conditions set forth by the company and understand that my submission constitutes a legally binding affirmation of the statements made herein.</label><br/>
            </div>
            <div class="spacer"></div>
            <div class="spacer"></div>

            
            {/* // radio for approver */}
            <div style={{ marginLeft: 210, width: 1000, color: '#1300B3' }}>
                <label style={{ display: 'inline-block', marginRight: '10px' }}>
                    Select the Action for Membership form :
                </label>
                <label style={{ display: 'inline-block', marginRight: '10px' }}>
                    <input
                    type="radio"
                    name="approvalStatus"
                    value="approve"
                    // checked={selectedOption === 'approve'}
                    // onChange={handleOptionChange}
                    />
                    Approve
                </label>

                <label style={{ display: 'inline-block', marginRight: '10px' }}>
                    <input
                    type="radio"
                    name="approvalStatus"
                    value="revert"
                    // checked={selectedOption === 'revert'}
                    // onChange={handleOptionChange}
                    />
                    Revert
                </label>

                <label style={{ display: 'inline-block', marginRight: '10px' }}>
                    <input
                    type="radio"
                    name="approvalStatus"
                    value="reject"
                    // checked={selectedOption === 'reject'}
                    // onChange={handleOptionChange}
                    />
                    Reject
                </label>
            </div>
            <div class="spacer"></div>



            {/* // textarea for approver*/}
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 10, paddingBottom: 20, paddingTop: 33, marginInlineStart: '12em', color: '#0F3C69' }}>
            <label style={{ marginRight: '10px' }}>
                Remarks <span style={{ color: 'red' }}>*</span> :
            </label>
            <textarea name="remark" required style={{ backgroundColor: '#eee', width: '25%', minHeight: '0px', borderRadius: 4 }}></textarea>
            </div>

                {/* // Submit for member */}
            <div style={{ paddingLeft:45, paddingBottom:20, paddingTop:33, marginInlineStart: '40em'}}>
                <button type="submit" className='savebtn'  style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 30, marginInline: 40 }} onClick={onsubmit} >Submit</button>
            </div>
        </div>
    )
}




export default connect(
    mapStateToProps
)(MembershipStatus)
