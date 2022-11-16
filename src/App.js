import './assets/styles/index.css';
import './App.css';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [value, setValue] = useState('');
	const [todos, setTodos] = useState(
		JSON.parse(localStorage.getItem('todos')) || [],
	);
	const [edit, setEdit] = useState(null);
	const [editValu, setEditValue] = useState('');

	let getInpValue = (evt) => {
		setValue(evt.target.value);
	};

	const setSubmit = (evt) => {
		evt.preventDefault();
		if (!value == '') {
			setTodos([
				...todos,
				{
					id: todos.length ? todos[todos.length - 1].id + 1 : 1,
					text: value,
					isComplate: false,
				},
			]);
			toast.success('Added Todo !!!');
		}
		setValue('');
	};

	localStorage.setItem('todos', JSON.stringify(todos));

	const delTodo = (id) => {
		let newTodo = [...todos].filter((item) => item.id != id);
		setTodos(newTodo);
		toast.error('Todo Deleted !!!');
	};

	const checkTodo = (id) => {
		let newTodo = [...todos].filter((item) => {
			if (item.id == id) {
				item.isComplate = !item.isComplate;
				item.isComplate
					? toast.success('Todo Done !!!')
					: toast.warning('Todo Failed !!!');
			}
			return item;
		});
		setTodos(newTodo);
	};

	const editTodo = (id, text) => {
		setEdit(id);
		setEditValue(text);
	};

	const saveTodo = (id) => {
		let newTodo = [...todos].map((item) => {
			if (item.id == id) {
				item.text = editValu;
			}
			return item;
		});
		setTodos(newTodo);
		setEdit(null);
		toast.warning('Todo has been changed !!!');
	};

	return (
		<>
			<main>
				<section className='hero'>
					<div className='container'>
						<div className='hero__inner'>
							<h1 className='hero__title'>To Do</h1>
							<form
								className='hero__form'
								onSubmit={setSubmit}
								autoComplete='off'>
								<input
									onChange={getInpValue}
									className='hero__form-input'
									value={value}
									type='text'
									aria-label='enter your text'
									name='user_text'
									placeholder='Enter your text'></input>

								<button className='hero__form-btn' type='submit'>
									Send
								</button>
							</form>
							{todos.length ? (
								<ul className='hero__list'>
									{todos.map((item) => (
										<li className='hero__item' key={item.id}>
											<div className='hero__item-content'>
												<span className='item-number'>{item.id}</span>
												<input
													className='hero__item-check'
													type='checkbox'
													data-id={item.id}
													onClick={() => checkTodo(item.id)}></input>
												{edit == item.id ? (
													<div className='edit-input-wrapper'>
														<input
															className='edit-input'
															value={editValu}
															onChange={(evt) => setEditValue(evt.target.value)}
														/>
													</div>
												) : (
													<p
														className={`hero__item-text' ${
															item.isComplate ? 'check' : ''
														}`}>
														{item.text}
													</p>
												)}
												{edit == item.id ? (
													<div className='save-btn-wrapper'>
														<button
															className='save-btn'
															onClick={() => saveTodo(item.id)}></button>
													</div>
												) : (
													<div className='hero__item-btns'>
														<button
															className='hero__item-edit'
															data-id={item.id}
															onClick={() =>
																editTodo(item.id, item.text)
															}></button>
														<button
															className='hero__item-del'
															data-id={item.id}
															onClick={() => delTodo(item.id)}></button>
													</div>
												)}
											</div>
										</li>
									))}
								</ul>
							) : (
								<h2 className='no-title'>No todos added</h2>
							)}
						</div>
						<ToastContainer
							position='bottom-right'
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme='dark'
						/>
					</div>
				</section>
			</main>
		</>
	);
}

export default App;
