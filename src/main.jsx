import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import SelectionProvider from './Components/Context/SelectionProvider.jsx'
import CourseProvider from './Components/Context/CourseProvider.jsx'

createRoot(document.getElementById("root")).render(
  <>
    <SelectionProvider>
      <CourseProvider>
        <App />
      </CourseProvider>
    </SelectionProvider>
  </>,
);
