import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/vazirmatn/300.css'
import '@fontsource/vazirmatn/400.css'
import '@fontsource/vazirmatn/600.css'
import '@fontsource/vazirmatn/800.css'
import '@fontsource/jetbrains-mono/400.css'
import '@fontsource/jetbrains-mono/500.css'
import './styles.css'
if('serviceWorker' in navigator&&import.meta.env.PROD)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))
createRoot(document.getElementById('root')).render(<App/>)
