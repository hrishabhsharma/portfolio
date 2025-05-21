import { useEffect, useState } from "react"

export default function TimerApp(){
  const [time, setTime] = useState(0)
  useEffect(()=>{
    const interval = setInterval(() => {
      setTime((old)=> old+1)
    }, 1000);

    return () => clearInterval(interval);
  },[])

  return (
    <>
    <h1>this is my timer App: {time} </h1>
    </>
  )
}
