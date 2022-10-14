import logo from './logo.svg';
import './App.css';

function App() {
  const handelClick=()=>{
    console.log('233344')
    console.log('111')

  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
       <button onClick={handelClick}>按钮</button>
      </header>
    </div>
  );
}

export default App;
