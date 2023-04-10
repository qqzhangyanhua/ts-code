import { useState } from "react";


function MyButton({count, onClick}:any) {
  
    return (
    <>
      <button onClick={onClick}>
        Clicked {count} times
      </button>
      <br/>
    </>
    );
  }
export default function MyApp() {
    const [count, setCount] = useState(0);
  
    function handleClick() {
      setCount(count + 1);
    }
  
    return (
      <div>
        <label>
        <h1>Counters that update together</h1>
        <MyButton count={count} onClick={handleClick} />
        <MyButton count={count} onClick={handleClick} />
        <MyButton count={count} onClick={handleClick} />
        <input type="checkbox" />

        </label>
       
      </div>
    );
  }