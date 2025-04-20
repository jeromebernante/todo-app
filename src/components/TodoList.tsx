import { Todo } from '../types/Todo';
import { useState } from 'react';

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: string) => void;
    editTodo: (id: string, newText: string) => void;
    deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
    todos,
    toggleTodo,
    editTodo,
    deleteTodo,
}) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

    const handleEdit = (todo: Todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };

    const handleSave = (id: string) => {
        if (editText.trim()) {
            editTodo(id, editText);
            setEditingId(null);
            setEditText('');
        }
    };

    return (
        <ul className='space-y-2'>
            {[...todos].reverse().map((todo) => (
                <li
                    key={todo.id}
                    className='flex items-center justify-between p-2 bg-gray-50 rounded-md'
                >
                    {editingId === todo.id ? (
                        <div className='flex-1 flex items-center space-x-2'>
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className='flex-1 p-1 border rounded-md'
                            />
                            <button
                                onClick={() => handleSave(todo.id)}
                                className='bg-gree-500 text-white px-2 py-1 rounded-md bg-green-500 hover:bg-green-600'
                            >Save</button>
                        </div>
                        ) : (
                            <div className='flex-1 flex items-center space-x-2'>
                                <input 
                                    type='checkbox'
                                    checked={todo.completed}
                                    onChange={() => toggleTodo(todo.id)}
                                    className='h-4 w-4'
                                />
                                <span
                                    className={`flex-1 ${
                                        todo.completed ? 'line-through text-gray-500' : ''
                                    }`}
                                >{todo.text}</span>
                                <button
                                    onClick={() => handleEdit(todo)}
                                    className='text-blue-500 hover:text-blue-700'
                                >Edit</button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className='text-red-500 hover:text-red-700'
                                >Delete</button>
                            </div>    
                    )}
                </li>
            ))}
        </ul>
    );
};

export default TodoList;