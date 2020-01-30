import React from 'react';

import ModalWindow from './components/ModalWIndow';

function App() {
  let data = ['phone', 'email','concats', 'name'];
  return (
    <>
    <ModalWindow selectedFields={{Phone: 1, Email: 2, Contacts : 0, Name: 3}} onPreview={(obj) => alert(JSON.stringify(obj))} data={data} />
    <ModalWindow selectedFields={{Phone: 1, Email: 2, Wrong_Concats : 0, Name: 3}} onPreview={(obj) => alert(JSON.stringify(obj))} data={data} />

    <ModalWindow onPreview={(obj) => alert(JSON.stringify(obj))} data={['name', 'email','phone', 'contacts']} />
    </>
  );
}

export default App;