//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AppContextProvider from './Context/AppContext.tsx';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

//  strict mode has been switched off in order to avoid double useffect calls
ReactDOM.createRoot(document.getElementById('root')!).render(
    <AppContextProvider>
     <App/>
    </AppContextProvider>
)
