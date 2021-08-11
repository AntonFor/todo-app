/* eslint-disable import/no-cycle */
import React, { useState, useContext } from 'react';
// import PropTypes from 'prop-types';
import { MyContext } from '../app/app';

import './new-task-form.css';

const NewTaskForm = () => {
	const properties = useContext(MyContext);

	const [currentTextNewTask, setTextNewTask] = useState('');
	const [currentMinNewTask, setMinNewTask] = useState('');
	const [currentSecNewTask, setSecNewTask] = useState('');

  const changeNewTask = (target) => {
		if (target.id === '1') setTextNewTask(target.value)
		else if (target.id === '2') setMinNewTask(target.value)
		else if (target.id === '3') setSecNewTask(target.value)
  };

  const { addTask } = properties;

  const handlingEvent = ({ key }) => {
		if (key === 'Enter') {
			const milsecNewTask = (Number(currentMinNewTask) * 60 * 1000) + (Number(currentSecNewTask) * 1000);
			if (Number(currentMinNewTask) > 59 || Number(currentSecNewTask) > 59) return;
			addTask(currentTextNewTask, milsecNewTask);
      setTextNewTask('');
			setMinNewTask('');
			setSecNewTask('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
				<input
					id={1}
					className="new-todo"
					placeholder="Task"
					onChange={(event) => changeNewTask(event.target)}
					onKeyDown={(event) => handlingEvent(event)}
					value={currentTextNewTask}
				/>
				<input
					id={2}
					className="new-todo-form__timer"
					placeholder="Min"
					onChange={(event) => changeNewTask(event.target)}
					onKeyDown={(event) => handlingEvent(event)}
					value={currentMinNewTask}
				/>
        <input
					id={3}
					className="new-todo-form__timer"
					placeholder="Sec"
					onChange={(event) => changeNewTask(event.target)}
					onKeyDown={(event) => handlingEvent(event)}
					value={currentSecNewTask}
				/>
			</form>
    </header>
  );
}

NewTaskForm.defaultProps = {
  addTask: () => {},
};

// NewTaskForm.propTypes = {
//  addTask: PropTypes.func,
// };

export default NewTaskForm;