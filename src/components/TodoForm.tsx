import {  useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface TodoFormProps {
    addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            addTodo(input);
            setInput('');
        }
    }

    return (
        <form className='mb-4 flex relative'>
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Add a new todo'
                className='w-full p-2 pe-[55px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
                onClick={handleSubmit}
                className='absolute top-[2px] right-[2px] bottom-[2px] bg-blue-500 w-11 text-white rounded-md hover:bg-blue-600 cursor-pointer flex items-center justify-center'
            ><PlusIcon className='h-6 w-6'/></button>
        </form>
    );
};

export default TodoForm;