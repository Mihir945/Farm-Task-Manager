import React, { createContext, useContext, useEffect, useState } from 'react'
import { axiosClient } from '../utils/axiosClient'


export const TaskContext = createContext()


export const useTaskContext = ()=> useContext(TaskContext)

export const TaskContextProvider = ({children}) => {

    const [loading,setLoading] = useState(true)
    const [tasks,setTasks] = useState([])

 const fetchAllTask=async()=>{
   
       try {
          const response = await  axiosClient.get("/get")
        // http://localhost:8000/api/v1/get
        const data = await response.data 
        setTasks(data);
       
       } catch (error) {
        console.error(error)
       }finally{
         setLoading(false)
       }
        
    }

    useEffect(()=>{
        fetchAllTask()
    },[])

    if(loading){
        return <div className='w-full min-h-screen flex justify-center items-center'>
            <span>Loading.....</span>
        </div>
    }

  return (
    <TaskContext.Provider value={{tasks,fetchAllTask}}>{children}</TaskContext.Provider>
  )
}

export default TaskContextProvider