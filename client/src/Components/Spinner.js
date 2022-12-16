import React, { useEffect, useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";


const Spinner = () => {
    const [loading, setloading] = useState(false)
    useEffect(()=>{
      setloading(true)
      setTimeout(()=>{
        setloading(false)
      },1000)
    },[])
  return (
    <ClipLoader color={'#F5A623'} loading={loading} size={30} width={200} height={200}/>
  )
}

export default Spinner