import { useState, useEffect } from "react";

const Item = ({ name}: {name: string}) => {
  useEffect(() => {
    console.log("Mounted:", name);
    return () => console.log("Unmounted:", name);
  }, [name]);

  return <div>{name}</div>;
};

const List = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Mango" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Apple" },
  ]);

  const handleSort = () => {
    setItems([...items].sort((a, b) => a.name.localeCompare(b.name)));
  };

  return (
    <div>
      <button onClick={handleSort}>Sort</button>
      {items.map((item) => (
        <Item key={item.id} name={item.name} />
      ))}
    </div>
  );
};

export default List;
