import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router';
import CircleLoader from './CircleLoader';

import { pdfjs, Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();



const Magazine = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const location = useLocation();
    const magazine = location.state?.magazine;

    return (
        <>
        <div className='w-4/5' style={{margin:"auto"}}>
            {/* <div className='PdfDiv' style={{width : '200px' , height : '2000px'}}> */}
            <Document loading={<div className='flex justify-center items-center' style={{width:'100%', height:'2500px'}}> <CircleLoader/> </div>} file={magazine.file}> 
                <Page pageNumber={currentPage}/>
            </Document>
            {/* </div> */}
            <div className='flex justify-center items-center'>
                {currentPage < magazine.page ? <div>
                    <button className='savebtn' onClick={() => {setCurrentPage(currentPage + 1)}}> + </button>
                </div> : null}
                {currentPage > 1 ? <div>
                    <button className='savebtn' onClick={() => {setCurrentPage(currentPage - 1)}}> - </button>
                </div>: null}
            </div>
        </div>

        <div className='w-4/5' style={{margin:"auto"}}>
            <div style={{ display: 'flex', flexDirection: 'row' ,paddingLeft:'10px', paddingRight:'10px'}}>
                <div className="form-group width-50" >
                <div className='section2' style={{marginLeft : '15px'}}>
                    <p className='text-black bold'>Magazine Info</p>
                    <div style={{display : 'flex', flexDirection : 'row'}}>
                        <p className='text-black b'>Magazine Name :  </p>
                        <p className='text-black' style ={{marginLeft : '5px'}}> {magazine.name}</p>
                    </div>

                    <div style={{display : 'flex', flexDirection : 'row'}}>
                         <p className='text-black b'>Magazine Author:  </p>
                        <p className='text-black'style ={{marginLeft : '5px'}}> {magazine.author}</p>
                    </div>
                    <div style={{display : 'flex', flexDirection : 'row'}}>
                         <p className='text-black b'>Magazine Description:  </p>
                        <p className='text-black'style ={{marginLeft : '5px'}}> {magazine.description}</p>
                    </div>

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Magazine Price:  </p>
            <p className='text-black'style ={{marginLeft : '5px'}}> {magazine.price}</p>
            </div>

            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Magazine Page: </p>
            <p className='text-black'style ={{marginLeft : '5px'}}> {magazine.page}</p>
            </div>


            <div style={{display : 'flex', flexDirection : 'row'}}>
            <p className='text-black b'>Magazine Stock: </p>
            <p className='text-black'style ={{marginLeft : '5px'}}> {magazine.stock}</p>
            </div>
            </div>
            </div>
            </div>
        </div>
    </>
    )
}

export default Magazine
