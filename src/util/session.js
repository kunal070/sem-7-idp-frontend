import axios from "axios"

export const login = async (user) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {...user}, {headers: {"Content-Type":"application/json"}})
    console.log(response.data)
    return response;
  } catch (error){
    return { data: {success:false, message: error.message} }
  }
};

export const logout = async () => {
  try {
    const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`)
    // const resp2 = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/logout`)
    return resp;
  } catch (error){
    return { success:false, message:error.message }
  }
};

export const checkLoggedIn = async preloadedState => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/member/show-member-info`);
      const response_two = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee/show-employee-info`);
      
      let user;
      if(response.data.success){
        user = response.data.data
      } else if(response_two.data.success){
        user = response_two.data.data
      }

      preloadedState = {};
      if (user) {
        preloadedState = {
          session: user
        };
      }
      return preloadedState;
    } catch (error){
      return preloadedState;
    }
  };