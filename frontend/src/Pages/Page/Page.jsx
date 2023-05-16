import React,{useEffect} from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const Page = () => {

    const [cookies,setCookie,removeCookie] = useCookies([])
    const navigate = useNavigate();
    
    const verifyUser = async ()=>{
        if(!cookies.jwt){
          navigate("/login")
        }else{
          const {data} = await axios.post(
            `${import.meta.env.VITE_AXIOS_KEY}`,{},
            {withCredentials: true}
            );
            console.log(data);
            if(!data.status){
              removeCookie("jwt");
              navigate("/login");
            }else if(data.user.status == "Unblock"){
              removeCookie("jwt");
              navigate("/login");
            }else{}
        }
    }
    useEffect(() => {
        verifyUser();
    }, [cookies,navigate,removeCookie])


    return (
    <div>Page</div>
  )
}

export default Page