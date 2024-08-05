import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import {Accounts, Home,Login, Product} from "./Routes"

const App = () => {
  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/account' element={<Accounts/>}/>
        <Route path='/product' element={<Product/>}/>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App