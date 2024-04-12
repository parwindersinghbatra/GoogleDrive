import './App.css';
import Login from './component/Login';
import Header from './Pages/Header';
import Sidebar from './Pages/Sidebar';
import Data from './Pages/Data';
import { useState } from 'react';

function App() {

  const [userProfile, setUserProfile] = useState(null);
  return (  
    <>
    {
      userProfile ? (
        <>
        <Header/>
           <div className="App">
        {/* <Login/> */}
      <Sidebar/>
      <Data/>
      </div>
      </>
      ) : (
        <Login setUserProfile={setUserProfile}/>
      )
    }
    </>
    
  );
}

export default App;
