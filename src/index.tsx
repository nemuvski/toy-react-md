import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'

import './styles/index.scss'
const container = document.getElementById('root')

if (!container) throw new Error('Oops, root element is missing.')

const root = createRoot(container)
root.render(<App />)
