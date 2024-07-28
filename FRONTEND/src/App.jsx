import './App.css'
import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Layout from './layout/Layout'
import Form from './pages/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Form />} />
          {/* <Route path="dashboard" element={<></>} /> */}
        </Route>
      </Routes>

    </>
  )
}

export default App
