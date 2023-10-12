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
        <div className='w-2/3' style={{margin:"auto"}}>
            <p style={{color:'black', fontSize:'15px'}}>Magazine Name: {magazine.name}</p>
            <p style={{color:'black', fontSize:'15px'}}>Magazine Author: {magazine.author}</p>
            <p style={{color:'black', fontSize:'15px'}}>Magazine Description: {magazine.description}</p>
            <p style={{color:'black', fontSize:'15px'}}>Magazine Stock: {magazine.stock}</p>
            <p style={{color:'black', fontSize:'15px'}}>Magazine Price: {magazine.price}</p>
            <p style={{color:'black', fontSize:'15px'}}>Magazine Page: {magazine.page}</p>
            <Document loading={<div className='flex justify-center items-center' style={{width:'100%', height:'250px'}}> <CircleLoader/> </div>} file={magazine.file}> 
                <Page pageNumber={currentPage} />
            </Document>
            <div className='flex justify-center items-center'>
                <div>
                    <button className='savebtn' onClick={() => {setCurrentPage(currentPage + 1)}}> + </button>
                </div>
                <div>
                    <button className='savebtn' onClick={() => {setCurrentPage(currentPage - 1)}}> - </button>
                </div>
            </div>
        </div>
    )
}

export default Magazine
