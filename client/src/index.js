import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {Provider} from "react-redux";
import Store from './Store';

// ReactDOM.render( <Provider store={Store}>
//       <App />
// </Provider>

// ,document.getElementById('root'))
// // const root = ReactDOM.createRoot("div");
// // root.render( <App />);



ReactDOM.createRoot(document.getElementById('root')).render(
      <Provider store={Store}>
            <App/>
      </Provider>
)