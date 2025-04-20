import { useState, useEffect } from 'react'
import { Todo } from './types/Todo';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>( () => {
		const savedTodos = localStorage.getItem('todos');
		return savedTodos ? JSON.parse(savedTodos) : [];
	});

	useEffect( () => {
		localStorage.setItem('todos', JSON.stringify(todos));
	});

	const addTodo = (text: string) => {
		const newTodo: Todo = {
			id: crypto.randomUUID(),
			text,
			completed: false,
		};
		setTodos([...todos, newTodo]);
	};

	const toggleTodo = (id: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const editTodo = (id: string, newText: string) => {
		setTodos(
			todos.map((todo) => 
				todo.id === id ? { ...todo, text: newText } : todo
			)
		);
	};

	const deleteTodo = (id: string) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col items-center p-4'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
				<h1 className='text-2xl font-bold text-center mb-4'>Todo App test</h1>
				<TodoForm addTodo={addTodo}/>
				<TodoList
					todos={todos}
					toggleTodo={toggleTodo}
					editTodo={editTodo}
					deleteTodo={deleteTodo}
				/>
			</div>
		</div>
	);
}

export default App
