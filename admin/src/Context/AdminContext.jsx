import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext=createContext();

const AdminContextProvider=(props)=>{
    const [atoken,setAToken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):"");
const backendUrl=import.meta.env.VITE_BACKEND_URL
const [doctors,setDoctors]=useState([]);
const[appointments,setAppointments]=useState([]);
const getAllDoctors=async () => {
    try {
        const {data}=await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{atoken}});
        if (data.success) {
            setDoctors(data.doctors)
           
        }else{
            toast.error(data.message)
        }

    } catch (error) {
        toast.error(error.message)
    }
}
const changeAvailability=async (docId) => {
    try {
        const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{atoken}});
        if(data.success){
            toast.success(data.message);
            getAllDoctors();
        }
        else{
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message)
    }
}
const getAllAppointments=async () => {
    try {
        const {data}=await axios.get(backendUrl+`/api/admin/appointments`,{headers:{atoken}});
if(data.success){
    setAppointments(data.appointments)
}else{
    toast.error(data.message);
}
    } catch (error) {
        toast.error(error.message)
    }
}
const value={
atoken,
setAToken,
backendUrl,
doctors,getAllDoctors,changeAvailability,appointments,setAppointments,getAllAppointments
}

return (
    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
)
}
export default AdminContextProvider;