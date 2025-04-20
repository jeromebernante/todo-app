import { Todo } from '../types/Todo';
import { useState } from 'react';
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/solid';

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
                    className='flex items-center justify-between bg-gray-50 rounded-md'
                >
                    {editingId === todo.id ? (
                        <div className='relative flex-1 flex items-center'>
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className='flex-1 p-2 pe-[55px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <button
                                onClick={() => handleSave(todo.id)}
                                className='absolute flex items-center justify-center cursor-pointer w-11 top-[2px] right-[2px] bottom-[2px] bg-gree-500 text-white px-2 py-1 rounded-md bg-green-500 hover:bg-green-600'
                            > <CheckIcon className='h-4 w-4' /></button>
                        </div>
                        ) : (
                            <div className='flex-1 flex items-center space-x-2 p-2 border border-white'>
                                <input 
                                    type='checkbox'
                                    checked={todo.completed}
                                    onChange={() => {
                                        const confirmToggle = window.confirm(`Are sure you want to mark this task as ${todo.completed ? 'incomplete' : 'completed'}?`);
                                        if (confirmToggle) {
                                            toggleTodo(todo.id);
                                        }
                                    }}
                                    className='h-4 w-4'
                                />
                                <span
                                    className={`flex-1 ${
                                        todo.completed ? 'line-through text-gray-500' : ''
                                    }`}
                                >{todo.text}</span>
                                <button
                                    onClick={() => handleEdit(todo)}
                                    className='me-3 text-blue-500 hover:text-blue-700 cursor-pointer'
                                ><PencilIcon className='h-6 w-6' /></button>
                                <button
                                    onClick={() => {
                                        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
                                        if (confirmDelete) {
                                            deleteTodo(todo.id);
                                        }
                                    }}
                                    className='text-red-500 hover:text-red-700 cursor-pointer'
                                ><TrashIcon className='h-6 w-6' /></button>
                            </div>    
                    )}
                </li>
            ))}
        </ul>
    );
};

export default TodoList;