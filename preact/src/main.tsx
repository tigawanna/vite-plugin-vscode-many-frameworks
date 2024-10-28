// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.tsx';

// ReactDOM.createRoot(document.getElementById('app')!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );


import { render } from "preact";
import "./index.css";
import { App }from './App.tsx';

render(<App />, document.getElementById("app")!);
