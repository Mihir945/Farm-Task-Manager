import React from 'react'
import { useTaskContext } from '../context/TaskContext'
import Task from './Task'

const AllTask = () => {

    const {tasks} = useTaskContext()

  return (
    <>
      <h1 className='text-4xl font-black'>Total({tasks.length})</h1>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
         {
            tasks.length>0 && tasks.map((cur,i)=>{
                return <Task key={i} data={cur} />
            })
        }
       </div>

    </>
  )
}

export default AllTask