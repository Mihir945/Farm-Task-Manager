import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '../utils/axiosClient'
import { useTaskContext } from '../context/TaskContext'

const Task = ({data}) => {
    const {fetchAllTask} = useTaskContext()
    const [isUpdatedLoading,setIsUpdateLoading] =useState(false)
    const [isDeletedLoading,setIsDeleteLoading] =useState(false)

    const updateTask=async()=>{
        try {
                setIsUpdateLoading(true)
                const response = await axiosClient.patch('/update/'+data._id)

                const datas = await response.data 
                toast.success(datas.msg)
                fetchAllTask()


        } catch (error) {
                toast.error( error?.response?.data?.detail||error?.response?.data ||error?.message)
        }finally{
                setIsUpdateLoading(false)
        }
    }

      const deleteTask=async()=>{
        try {
                setIsDeleteLoading(true)
                const response = await axiosClient.delete('/delete/'+data._id)

                const datas = await response.data 
                toast.success(datas.msg)
                fetchAllTask()


        } catch (error) {
                toast.error(error.message)
        }finally{
                setIsDeleteLoading(false)
        }
    }


    // Todo: Get Todo BY Id and show Model and update data by Making PUT request 



  return (
    <div className='w-full p-4'>
                    <div className="py-5 px-4 border rounded">
                        <p className={`text-3xl font-bold ${data.is_complete?'line-through':''}`}>{data.title}</p>
                        <p className="text-xl ">{data.desc}</p>
            <div className="py-4 flex items-center justify-start">
                
            {
                !data.is_complete && <button disabled={isUpdatedLoading} onClick={updateTask} className='px-4 py-2 bg-blue-600 disabled:bg-blue-900 disabled:cursor-no-drop cursor-pointer text-white rounded border-none outline-none'>Update</button>
            }
            <button disabled={isDeletedLoading} onClick={deleteTask} className='bg-red-500 disabled:bg-red-900 disabled:cursor-no-drop px-6 py-2 mx-2 text-white rounded  cursor-pointer'>delete</button>
            </div>

                    </div>

    </div>
  )
}

export default Task