import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Content from './Components/Content';

// Iniciando
class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userName: '',
  //   };
  // }

  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <BrowserRouter>
          <div>
            <Content { ...this.state } />
          </div>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
