import {  useState } from 'react';

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
        <div className='mb-4'>
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Add a new todo'
                className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
                onClick={handleSubmit}
                className='mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'
            >Add To Do</button>
        </div>
    );
};

export default TodoForm;