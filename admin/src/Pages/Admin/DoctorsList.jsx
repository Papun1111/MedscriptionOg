import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'

const DoctorsList = () => {
  const {doctors,atoken,getAllDoctors}=useContext(AdminContext);
  useEffect(()=>{
    if(atoken){
getAllDoctors();
}

  },[atoken])
  return (
    <div>
      <h1>All Doctors</h1>
      <div>
        {
          doctors.map((item,index)=>{
<div key={index}>
<img src={item.image} alt="laura" />
<div>
  <p>{item.name}</p>
  <p>{item.speciality}</p>
  
</div>
</div>
          })
        }
      </div>
    </div>
  )
}

export default DoctorsList