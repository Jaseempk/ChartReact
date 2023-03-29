import { useState } from 'react'
import './App.css'
import ChartComponent from './Chart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 style={{fontSize: 25}} >AAPL stock last 30 days closing price</h1>
    <div style={{width: "100%",height:"100%", display: 'flex', alignItems: "center", justifyContent: "center",backgroundColor:"#AAC4FF", flexDirection: "column"}} >
      <ChartComponent />
    </div>
    </>
  )
}

export default App
