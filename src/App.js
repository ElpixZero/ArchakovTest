import React from 'react';

import Draft from './components/Draft';
import MainContent from './components/MainContent';


function App() {
  const [draftData, setDraftData] = React.useState([{
    value: 'Test draft',
    id: new Date().getTime(),
    isMarked: false
  }]);

  const [mainData, setMainData] = React.useState([{
    value: 'Test main note',
    id: new Date().getTime()-1,
    isMarked: false
  }]);

  const addObjToDraft = data => {
    const lastData = draftData.slice();

    lastData.push({
      value: data,
      id: new Date().getTime(),
      isMarked: false
    });

    return setDraftData(lastData);
  }

  const removeDraft = removeableItem => {
    const lastData = draftData.filter( item => item.id !== removeableItem.id );

    setDraftData(lastData);
  }

  const addObjToMain = data => {
    const lastData = mainData.slice();

    lastData.push(data);

    return setMainData(lastData);
  }

  const moveDraftToMain = data => {
    removeDraft(data);
    addObjToMain(data);
  }

  const changeMarkStatus = data => {
    const lastData = mainData.map( item => {
      if (item.id === data.id) return {...item, isMarked: !item.isMarked}
      return item;
    });

    setMainData(lastData);
  }

  const moveMainToDraft = removeableItem => {
    const lastMainData = mainData.filter( item => item.id !== removeableItem.id );
    setMainData(lastMainData);

    const lastDraftData = draftData.slice();
    lastDraftData.push(removeableItem);
    setDraftData(lastDraftData);
  }

  const getMarkedItems = data => {
    return data.reduce( (sum, current) => {
      if (current.isMarked) return sum + 1;
      return sum;
    }, 0)
  }

  return (
    <div style={{maxWidth: 1920, margin: '0 auto', backgroundColor: '#bbbaba1c'}}> 
        <div style={{padding: 5, display: 'flex', alignItems: 'center', borderBottom: '10px solid white'}}>
          <h1 style={{display: 'flex', flex: '1', justifyContent: 'center'}}>React test app</h1>
          <span style={{fontSize: 20, fontWeight: 700}}>{getMarkedItems(mainData)}</span>
        </div>

      <div style={{display: 'flex'}}>
        <Draft addObjToMain={addObjToMain} moveDraftToMain={moveDraftToMain} data={draftData} setDraftData={addObjToDraft} removeDraft={removeDraft} />
        <MainContent moveMainToDraft={moveMainToDraft} style={{backgroundColor: 'red'}}  changeMarkStatus={changeMarkStatus} data={mainData} setMainData={setMainData} />
      </div>
    </div>
  );
}

export default App;