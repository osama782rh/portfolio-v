import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import 'react-toastify/dist/ReactToastify.css'  
import './style/navbar.css'
import './style/home.css'
import './style/skills.css'
import './style/projects.css'
import './style/contact.css'
import './style/footer.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
