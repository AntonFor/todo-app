import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      textNewTask: '',
			minNewTask: '',
			secNewTask: ''
    };
  }

  changeNewTask = (target) => {
		if (target.id === '1') this.setState({ textNewTask: target.value })
		else if (target.id === '2') this.setState({ minNewTask: target.value })
		else if (target.id === '3') this.setState({ secNewTask: target.value })
  };

  render() {
    const { addTask } = this.props;
    const { textNewTask, minNewTask, secNewTask } = this.state;

    const handlingEvent = ({ key }) => {
			if (key === 'Enter') {
				const milsecNewTask = (Number(minNewTask) * 60 * 1000) + (Number(secNewTask) * 1000)
				if (Number(minNewTask) > 59 || Number(secNewTask) > 59) return;
				addTask(textNewTask, milsecNewTask);
        this.setState({
					textNewTask: '',
					minNewTask: '',
					secNewTask: ''
				});
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
          onChange={(event) => this.changeNewTask(event.target)}
          onKeyDown={(event) => handlingEvent(event)}
          value={textNewTask}
					/>
					<input
					id={2}
					className="new-todo-form__timer"
					placeholder="Min"
					onChange={(event) => this.changeNewTask(event.target)}
					onKeyDown={(event) => handlingEvent(event)}
					value={minNewTask}
					/>
          <input
					id={3}
					className="new-todo-form__timer"
					placeholder="Sec"
					onChange={(event) => this.changeNewTask(event.target)}
					onKeyDown={(event) => handlingEvent(event)}
					value={secNewTask}
					/>
				</form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  addTask: () => {},
};

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
};
