import { useState, useEffect } from "react";

function CounterApp() {
  const [count, setCount] = useState(0);
  const [isEven, setIsEven] = useState(true);

  useEffect(() => {
    setIsEven(count % 2 === 0);
    console.log(`Count changed to: ${count}`);

    return () => {
      console.log(`Cleaning up effect for count: ${count}`);
    };
  }, [count]);

  return (
    <>
      <h1>{count}</h1>
      <p>The number is: {isEven ? 'Even' : 'Odd'}</p>
      <button onClick={() => setCount((old) => old + 1)}>Add</button>
      <button onClick={() => setCount((old) => old - 1)}>Minus</button>
    </>
  );
}

export default CounterApp;

