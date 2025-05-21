import { useState } from "react";

function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <>
    <h1>{count}</h1>
    <button onClick={() => setCount((old)=> old + 1)}>Add</button>
    <button onClick={() => setCount((old)=> old - 1)}>Minus</button>
    </>
  ); 
}

export default CounterApp

