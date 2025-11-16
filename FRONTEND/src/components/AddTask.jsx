import React from 'react'
import { toast } from 'react-toastify'
import { axiosClient } from '../utils/axiosClient'
import { useTaskContext } from '../context/TaskContext'

const AddTask = () => {

    const {fetchAllTask} = useTaskContext()


    const onSubmitHandler =async(e)=>{
      try {
          e.preventDefault()
        const formData = new FormData(e.target)
        const title = formData.get("title") ||""
        const desc = formData.get("desc") ||""
        if(!title || !desc){
            toast.error("Provide valid fields")
        }
      
        const response = await axiosClient.post('/create',{
            title,
            desc
        })
        
        const data = await response.data 
        await fetchAllTask()
       toast.success(data.msg)
      } catch (error) {
        toast.error(error.message)
      }
        


    }

  return (
    <>
                <form onSubmit={onSubmitHandler} className='w-[96%] lg:w-1/2 mx-auto py-10  '>
                    <div className="mb-3">
                        <label htmlFor="title">Title</label>
                        <input type="text" required name='title' id='title' placeholder='Enter Your Title' className="w-full py-3 px-4 rounded outline-none border border-gray-300" />
                    </div>
                     <div className="mb-3">
                        <label htmlFor="desc">Description</label>
                        <textarea rows={4} required name='desc' id='desc' placeholder='Enter Your Description' className="w-full py-3 px-4 rounded outline-none border border-gray-300" />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className='w-full py-3 text-center rounded bg-blue-600 text-white'>Submit</button>
                    </div>
                </form>
    </>
  )
}

export default AddTask