import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './Footer'
import Envelope from './Envelope'
import Invite from './Invite'

function App() {
  return (
    <BrowserRouter>
      <Envelope>
        <div className="App-App">
          <div className="App-content">
            <Invite />
          </div>
          <Footer />
        </div>
      </Envelope>
    </BrowserRouter>
  )
}

export default App