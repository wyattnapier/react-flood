import {useState} from 'react';
import './App.css';
import ViewPosts from './ViewPosts.js';
import NewPost from './NewPost.js';

function Button ({action, text}) {
  return (
    <button onClick={action} >
      <h2>{text}</h2>
    </button>
  );
}

function App() {
  //false is viewPosts
  //true is makePost
  const [tab, setTab] = useState(false);
  function switchTab () { 
    setTab(!tab);
    console.log(tab);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-indiv-header">Disaster Recovery Assistance</h1>
        {
          tab ? 
          <div className='makePostTab'>
            <Button className="App-indiv-header" action={switchTab} text={"View Posts"} /> 
            <NewPost />
          </div>
          :
          <div className='viewPostTab'>
            <Button className="App-indiv-header" action={switchTab} text={"Make a Post"} />
            <ViewPosts />
          </div>
        }
      </header>
    </div>
  );
}

export default App;