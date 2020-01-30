import React from 'react';
import ModalWindow from './components/ModalWIndow';

function App() {
  return (
    <ModalWindow selectedFields={{Phone: 1, Email: 2, Contact: 0}} onPreview={(obj) => alert(JSON.stringify(obj))} data={['dfd', 'ere','sd']} />
  );
}

export default App;