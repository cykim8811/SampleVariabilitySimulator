
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SimulationPage } from './sim/Simulation'
import { Custom } from './custom/Custom'
import { Link } from 'react-router-dom'

function App() {
  const goto = (<div>
    <Link to="/sim">Sim</Link><br/>
    <Link to="/custom">Custom</Link>
  </div>)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={goto} />
          <Route path="/sim" element={<SimulationPage />} />
          <Route path="/custom" element={<Custom />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
