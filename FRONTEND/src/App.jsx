import React, { useEffect } from 'react'
import { axiosClient } from './utils/axiosClient'
import AddTask from './components/AddTask'
import AllTask from './components/AllTask'

const App = () => {

   


  return (
   <>
        <AddTask/>
        <AllTask/>
   </>


  )
}

export default App