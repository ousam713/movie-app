import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import { client } from './lib/appwrite.js'

// client.ping().then(
//   () => console.log('Appwrite connected'),
//   (error) => console.error('Appwrite ping failed:', error)
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
