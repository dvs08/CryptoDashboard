
import axios from 'axios';
import {myObject} from '../components/bridge'

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response, //you can also edit response from here. eg) return response.data
  (error) => {
    
    if (error) {
      
      console.log("Error:", error);
      console.log("Navigating to error page");

      myObject.navigationFun('/error');

      console.log("Object", myObject);
    }
    return Promise.reject(error);   //when error is encountered in the interceptor, it is then handled by next handler, eg) catch(). eg) Network error. For other errors pass it to the next handler.
  }
);


export default axiosInstance;


