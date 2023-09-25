import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../companyform.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios

import { toast } from 'react-toastify'
import { connect } from 'react-redux';
import Loader from "./Loader";


const mapStateToProps = ({ session }) => ({
    session
})

let initialSubmit = false

const MagazineUpload = ({ session }) => {
    const navigate = useNavigate();

    const [isDataUpdated, setIsDataUpdated] = useState(false)
    
    const [loader, setLoader] = useState(false)

    const [formData, setFormData] = useState({
        magazineName: '',
        magazineAuthor: '',
        magazineDescription: '',
        magazineDate: '',
        magazinePrice: '',
        magazinePages: '',
        magazineStock: '',
        magazinePdf: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setIsDataUpdated(true)
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateMagazineName = () => {
        let str = "";
        if (!formData.magazineName.trim()) {
            str = 'Magazine Name is required';
        }
        else if (formData.magazineName.trim().length < 2) {
            str = 'magazineName must be at least 2 characters long';
        }

        if(str == ''){
            setErrors(err => {
                const { magazineName, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                magazineName:str
            }))
        }
    }

    const validateMagazineAuthor = () => {
        let str = '';
    
        if (!formData.magazineAuthor.trim()) {
            str = 'Author Name is required';
        }
        else if (formData.magazineAuthor.trim().length < 5) {
            str = 'magazineAuthor must be at least 5 characters long';
        }

        if(str == ''){
            setErrors(err => {
                const { magazineAuthor, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                magazineAuthor:str
            }))
        }
    }

    const validateMagazineDescription = () => {
        let str = ""
    
        if (!formData.magazineDescription.trim()) {
            str = 'Magazine description is required';
        }
        else if (formData.magazineDescription.trim().length < 2) {
            str = 'magazineDescription must be at least 2 characters long';
        }


        if(str == ''){
            setErrors(err => {
                const { magazineDescription, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                magazineDescription:str
            }))
        }
    }

    const validateMagazineDate = () => {
        let str = "";
        if (!formData.magazineDate.trim()) {
            str = 'Magazine published date is required';
        }

        if(str == ''){
            setErrors(err => {
                const { magazineDate, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                magazineDate:str
            }))
        }
    }

    const validateMagazinePrice = () => {
        let str = "";
        if (!formData.magazinePrice.trim()) {
            str = 'Magazine price is required';
        }

        if (name === 'magazinePrice' && parseFloat(value) < 0) {
            errors.magazinePrice = 'Magazine Price must be a positive number';
          } else {
            errors.magazinePrice = '';
          }

        if(str == ''){
            setErrors(err => {
                const { magazinePrice, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                magazinePrice:str
            }))
        }
    }

    const validateMagazinePages = () => {
        let str = "";
        if (!formData.magazinePages.trim()) {
            str = 'No. of pages is required';
        }

        if (name === 'magazinePages' && parseFloat(value) < 0) {
            errors.magazinePages = 'No.of Pages must be a positive number';
          } else {
            errors.magazinePages = '';
          }

        if(str == ''){
            setErrors(err => {
                const { magazinePages, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                magazinePages:str
            }))
        }
    }

    const validateMagazineStock = () => {
        let str = "";
        if (!formData.magazineStock.trim()) {
            str = 'No. of available magazines is required';
        }

        if (name === 'magazineStock' && parseFloat(value) < 0) {
            errors.magazineStock = 'No. of available magazines must be a positive number';
          } else {
            errors.magazineStock = '';
          }

        if(str == ''){
            setErrors(err => {
                const { magazineStock, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                magazineStock:str
            }))
        }
    }

    const validateMagazinePdf = () => {
        let str = "";
        if (!formData.magazinePdf) {
            str = 'Please upload a PDF file';
          } else {
            const fileExtension = formData.magazinePdf.name.split('.').pop().toLowerCase();
            if (fileExtension !== 'pdf') {
              str = 'Please upload a PDF file';
            }
          }
          

        if(str == ''){
            setErrors(err => {
                const { magazinePdf, ...rest } = err
                return rest;
            })
        } else {
            setErrors(err => ({
                ...err,
                magazinePdf:str
            }))
        }


    }

    useEffect(() => {
        if(initialSubmit){
            validateMagazineName()
        }
    }, [formData.magazineName])

    useEffect(() => {
        if(initialSubmit){
            validateMagazineAuthor()
        }
    }, [formData.magazineAuthor])
    
    useEffect(() => {
        if(initialSubmit){
            validateMagazineDescription()
        }
    }, [formData.magazineDescription])

    useEffect(() => {
        if(initialSubmit){
            validateMagazineDate()
        }
    }, [formData.magazineDate])

    useEffect(() => {
        if(initialSubmit){
            validateMagazinePrice()
        }
    }, [formData.magazinePrice])

    useEffect(() => {
        if(initialSubmit){
            validateMagazinePages()
        }
    }, [formData.magazinePages])

    useEffect(() => {
        if(initialSubmit){
            validateMagazineStock()
        }
    }, [formData.magazineStock])

    useEffect(() => {
        if(initialSubmit){
            validateMagazinePdf()
        }
    }, [formData.magazinePdf])

    const handleSubmit = async (e) => {
        e.preventDefault();

        validateMagazineName()
        validateMagazineAuthor()
        validateMagazineDescription()
        validateMagazineDate()
        validateMagazinePrice()
        validateMagazinePages()        
        validateMagazineStock()
        validateMagazinePdf()

        if(!isDataUpdated){
            console.log('Navigating to /company-info-2');
            navigate("/company-info-2")
            return;
        }
    
        if (Object.keys(errors).length === 0 && formData.magazineAuthor != "") {
            setLoader(true)

            // withCredentials to send httpOnly cookie via request
            axios.defaults.withCredentials = true;

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/membership/company-info-1`, {...formData}, {headers:{"Content-Type":"application/json"}})
            console.log(response.data)
            setLoader(false)
          
            if(response.data.success){
                toast(response.data.message)
                navigate('/company-info-2');
            } else {
                toast(response.data.message)
            }

        } else {
            toast("Enter Correct Input Data")
        }
    };
    
    if(loader){
        return (
        <div style={{width : '100%', height:'100%'}}>
            <Loader/>
        </div>
        )
      }
      else{

      
    return (
        <div className="flex" style={{justifyContent:'center', alignItems:'center', paddingTop:"100px"}}>
        <center>
            <form className="company-form" onSubmit={handleSubmit} style={{color:'black', backgroundColor:'white'}}>
            <h1 style={{margin:10, padding:30}} className='form-heading' >Magazine Details</h1>    
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'50px'}}>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Magazine Name:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="magazineName" value={formData.magazineName} onChange={handleChange} required style={{backgroundColor:'#eee'}} />
                        {errors.magazineName && <p className="error-message" style={{color: 'red', fontSize: '12px'}}>{errors.magazineName}</p>}   
                    </div>
                </div>
                <div className="form-group flex width-50" >
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Author Name:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="text" name="magazineAuthor" value={formData.magazineAuthor} onChange={handleChange} required style={{backgroundColor:'#eee'}} />
                        {errors.magazineAuthor && <p className="error-message" style={{color: 'red', fontSize: '12px'}}>{errors.magazineAuthor}</p>}   
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'50px'}}>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Magazine Description:</p>
                    </div>
                    <div className='width-50' style={{marginRight:'24px'}}>
                    <textarea name="magazineDescription" value={formData.magazineDescription} onChange={handleChange} required style={{ backgroundColor: '#eee', width: '112%', minHeight: '0px',borderRadius : 4, color:"#0f3c69" }}
/>
                        {errors.magazineDescription && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.magazineDescription}</p>}
                    </div>
                </div>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>Publication Date:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="date" name="magazineDate" value={formData.magazineDate} onChange={handleChange} style={{backgroundColor:'#eee'}}/>
                        {errors.magazineDate && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.magazineDate}</p>}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'50px'}}>
            <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>Magazine Price:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="number" name="magazinePrice" value={formData.magazinePrice} onChange={handleChange} style={{backgroundColor:'#eee'}} min="0"/>
                        {errors.magazinePrice && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.magazinePrice}</p>}   
                    </div>
                </div>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'45px'}}>
                        <p className='label' style={{textAlign:'start'}}>No. of Pages:</p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="number" name="magazinePages" value={formData.magazinePages} onChange={handleChange} required style={{backgroundColor:'#eee'}} min="0"/>
                        {errors.magazinePages && <p className="error-message" style={{color: 'red', fontSize: '12px'}} >{errors.magazinePages}</p>}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'50px'}}>
                <div className="form-group flex width-50">
                    <div className='width-50' style={{marginLeft:'50px'}}>
                        <p className='label' style={{textAlign:'start'}}>No. of Available Magazine: <span style={{color : 'black'}}></span> </p>
                    </div>
                    <div className='width-50' style={{marginLeft:'10px'}}>
                        <input type="number" name="magazineStock" value={formData.magazineStock} onChange={handleChange} style={{backgroundColor:'#eee'}} min="0"/>   
                        {errors.magazineStock && <p className="error-message"style={{color: 'red', fontSize: '12px'}}>{errors.magazineStock}</p>}
                    </div>
                </div>
                
            </div>

            <div style={{textAlign:'start' ,marginLeft:'70px', paddingTop:10}}>
                <div className="form-group flex" style={{alignItems:'center'}}>
                    <div className=''>
                        <p className='label'  style={{ marginRight: 20, textAlign:'start'}}>Upload The Magazine:</p>
                    </div>
                    <div className='flex' style={{marginLeft:'0px'}}>
                        <input type="file" name="file" id='file-input' title={formData.magazinePdf} onChange={handleChange} accept=".pdf" required style={{ backgroundColor: '#eee' }} />
                        {(formData != null && formData.magazinePdf?.type !== 'application/pdf' && formData.magazinePdf?.includes("https://idp-sem-7.s3.us-east-1.amazonaws.com")) && 
                        <Link to={formData.magazinePdf} target="_blank" rel="noopener noreferrer"> <button type="button" className='savebtn' style={{ borderColor: '#0f3c69', backgroundColor: '#0f3c69', color: 'white', borderRadius: 5, height:'44px', margin:'auto',marginLeft:55,marginTop:8}} >View Document</button> </Link>}
                        {errors.magazinePdf && <p className="error-message" style={{color: 'red', fontSize: '12px'}}>{errors.magazinePdf}</p>}
                    </div>
                </div>
            </div>
            <div style={{paddingBottom:20, paddingTop:30, marginInlineStart: '50em' }}>
            <button type="submit" onClick={handleSubmit} style={{borderColor:'#0f3c69', backgroundColor:'#0f3c69', color:'white' , borderRadius:20 , marginInline:5}}  className='savebtn'>Upload</button>
            </div>
        </form>
        </center>
        </div>
    )};
};

export default connect(
    mapStateToProps
)(MagazineUpload);
