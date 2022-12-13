import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Content from './Components/Content';

// Iniciando
class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <div>
            <Content />
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
