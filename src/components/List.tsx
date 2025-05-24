import { useState, useEffect } from "react";

const Item = ({ name}: {name: string}) => {
  useEffect(() => {
    console.log("Mounted:", name);
    return () => console.log("Unmounted:", name);
  }, [name]);

  return <div>{name}</div>;
};

const List = () => {
  const [items, setItems] = useState(["Mango", "Banana", "Apple"]);

  const handleSort = () => {
    setItems([...items].sort());
  };

  return (
    <div>
      <button onClick={handleSort}>Sort</button>
      {items.map((item, index) => (
        <Item key={index} name={item} />
      ))}
    </div>
  );
};

export default List;
