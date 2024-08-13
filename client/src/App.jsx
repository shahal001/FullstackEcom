import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {Accounts, Home,Login, Products} from "./Routes"

const App = () => {
  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/account' element={<Accounts/>}/>
        <Route path='/product' element={<Products/>}/>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App