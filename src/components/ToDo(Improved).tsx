import { useState, useCallback, useMemo } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface ItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

const ToDo = () => {
  const [todos, setTodos] = useState<Todo[]>([{
    id: Date.now(),
    text: 'Learn React',
    completed: false
  }]);
  const [text, setText] = useState('');

  const addTodo = useCallback((text: string) => {
    if (text.trim()) {
      setTodos(prev => [...prev, { 
        id: Date.now(), 
        text, 
        completed: false 
      }]);
      setText('');
    }
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const editTodo = useCallback((id: number, newText: string) => {
    if (newText.trim()) {
      setTodos(prev => prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      ));
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo(text);
      setText('');
    }
  }, [addTodo, text]);

  const todoStats = useMemo(() => {
    return {
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length,
      active: todos.filter(todo => !todo.completed).length
    };
  }, [todos]);

  return (
    <>
      <div className="max-w-2xl mx-auto">
        {/* title */}
        <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1> 
        {/* container */}
        <div className="bg-white p-6 rounded-lg shadow-lg"> 
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Add your tasks below:</p>
            <div className="text-sm text-gray-500">
              <span>Total: {todoStats.total}</span>
              <span className="mx-2">|</span>
              <span className="text-green-600">Active: {todoStats.active}</span>
              <span className="mx-2">|</span>
              <span className="text-blue-600">Completed: {todoStats.completed}</span>
            </div>
          </div>
          {/* Input and Add Button */}
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Add a new todo..."
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              onClick={() => addTodo(text)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Add
            </button>
          </div>
          <div className="space-y-2">
            {/* Todo Items */}
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: ItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    
    if (e.key === 'Enter' && target.value.trim()) {
      onEdit(todo.id, target.value);
      setIsEditing(false);
    }
    
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  }, [onEdit, todo.id]);

  const spanClassName = useMemo(() => {
    return `${todo.completed ? 'line-through text-gray-500' : ''} flex-1`;
  }, [todo.completed]);

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2">
      {      /* Checkbox and Todo Text */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4"
        />
        {isEditing ? (
          <input
            type="text"
            defaultValue={todo.text}
            onKeyDown={handleKeyDown}
            onBlur={(e) => {
              if (e.target.value.trim()) {
                onEdit(todo.id, e.target.value);
              }
              setIsEditing(false);
            }}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoFocus
          />
        ) : (
          <span 
            className={spanClassName}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>
      {/* Edit and Delete Buttons */}
      <div className="flex gap-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ToDo;
