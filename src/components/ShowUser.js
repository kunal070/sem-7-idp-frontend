import React, { useState, useEffect } from 'react';

import axios from 'axios'; // Import Axios

import { toast } from 'react-toastify';

import CircleLoader from './CircleLoader';
import Loader from './Loader';



const ShowUser = () => {
    // actual data of deligences are stored in data state (array)
    const [data, setData] = useState([])

  
    // total number of pages state
    const [totalPages, setTotalPages] = useState(0);
    
    // current page state
    const [currentPage, setCurrentPage] = useState(1);

    // limit number of documents 
    const limit = 5;

    // set page onclick
    const selectPageHandler = (index) => {
        setCurrentPage(index);
    };

    // previous page functionality
    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // next page functionality
    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    // fetch documents from backend
    useEffect(() => {
        fetchData();
    }, [currentPage]);


    const [loader, setLoader] = useState(false)

    const fetchData = async () => {
        try {
            setLoader(true)
            axios.defaults.withCredentials = true

            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/show-users?page=${currentPage}&limit=${limit}`)
            console.log("USERS: ", response.data)
            if(response.data.success){
                setData(response.data.data.employee)
                setTotalPages(response.data.data.totalPages)
            } else {
                toast(response.data.message)
            }
            setLoader(false)

        } catch (error){
            console.log(error)
            toast("Internal Server Error while fetching data")
        }
    }

    const deleteUser = async (employeePhone) => {
      // Display a confirmation dialog to the user
      const isConfirmed = window.confirm("Are you sure you want to delete this user?");
  
      if (!isConfirmed) {
          return; // If the user cancels the operation, do nothing
      }
      setLoader(true)
      axios.defaults.withCredentials = true;
  
      try {
          const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/delete-user/${employeePhone}`);
          console.log("DELETE USER: ", response.data);
          toast(response.data.message);
          setLoader(false)
          
          if (response.data.success) {
              fetchData();
          }
      } catch (error) {
          // Handle any errors that occur during the delete operation
          console.error("Error deleting user:", error);
          // You can show an error message to the user here if needed.
      }
  }  

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>
        <div className="pt-4 flex items-center flex-col">
        <h2 className='py-4 font-bold text-3xl my-4' style={{color:"#0f3c69"}}>All Users</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-black" style={{margin:'0 0'}}>
                <thead className="text-xs uppercase" style={{backgroundColor: '#0f3c69', color:"white"}}>
                    <tr>
                      <th className='px-6 py-3'>SR No</th>
                      <th className='px-6 py-3'>User Name</th>
                      <th className='px-6 py-3'>User Phone</th>
                      <th className='px-6 py-3'>User Email</th>
                      <th className='px-6 py-3'>Type Of User</th>
                      <th className='px-6 py-3'>Pending Applications</th>
                      <th className='px-6 py-3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* showcase loader while calling api else showcase response of api */}
                    {loader ?
                        <tr>
                          <td className='px-6 py-3' colSpan={7}>
                            <CircleLoader/>
                          </td>
                        </tr> :
                      data?.map((user, index) => (
                      <tr key={user._id} className='font-semibold bg-[#e5e5e5] hover:bg-[#A9A9A9]'>
                        <td className='px-6 py-3'>{(currentPage-1)*5 + (index + 1)}</td>
                        <td className='px-6 py-3'>{user.name}</td>
                        <td className='px-6 py-3'>{user.phone}</td>
                        <td className='px-6 py-3'>{user.email}</td>
                        <td className='px-6 py-3'>{user.typeOfUser}</td>
                        <td className='px-6 py-3'>{user.totalMemberships - user.completedMemberships}</td>
                        <td className='px-6 py-3'>
                          <button className='mt-1 text-white bg-[#0F3C69] focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm text-center px-5 py-2.5 mr-2 mb-2' type="button" onClick={() => deleteUser(user.phone)}><b>Delete</b></button>
                        </td>
                      </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
      </div>
  
      {/* pagination */}
      <div className="pagination-div">
          <div className='rounded py-2 bg-[#eee] text-black'>
          {currentPage !== 1 && (
            <span className="page cursor-pointer" onClick={() => prevPage()}>
              {" "}
              ◀{" "}
            </span>
          )}
          {[...Array(totalPages)].map((_, index) => {
            return (
              <span
                className={
                  currentPage === index + 1 ? "page rounded cursor-pointer bg-[#0F3C69] text-white font-medium" : "page cursor-pointer"
                }
                onClick={() => selectPageHandler(index + 1)}
                key={index}
              >
                {index + 1}
              </span>
            );
          })}
          {currentPage !== totalPages && (
            <span className="page cursor-pointer" onClick={() => nextPage()}>
              {" "}
              ▶{" "}
            </span>
          )}
          </div>
        </div>
      </>
    )
          
}

export default ShowUser

