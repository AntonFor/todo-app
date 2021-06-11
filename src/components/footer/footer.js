import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';
import './footer.css';

const Footer = (props) => {
  const COMPLETED = 'completed';
	const {
    tasks, buttons,
  } = props;
  const {
    filtrationActiveTask, filtrationCompletedTask, filtrationAllTask, deleteCompletedTasks,
  } = props;
  const completedTask = (tasks.filter((el) => el.class === COMPLETED)).length;
  const activeTask = tasks.length - completedTask;

  return (
    <footer className="footer">
      <span className="todo-count">
        {activeTask}
        {' '}
        items left
      </span>
      <TasksFilter
        onClickActive={filtrationActiveTask}
        onClickCompleted={filtrationCompletedTask}
        onClickAll={filtrationAllTask}
        buttonSelected={buttons}
      />
      <button
        type="button"
        className="clear-completed"
        onClick={deleteCompletedTasks}
      >
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  tasks: [],
  filtrationActiveTask: () => {},
  filtrationCompletedTask: () => {},
  filtrationAllTask: () => {},
  buttons: [],
  deleteCompletedTasks: () => {},
};

Footer.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  filtrationActiveTask: PropTypes.func,
  filtrationCompletedTask: PropTypes.func,
  filtrationAllTask: PropTypes.func,
  buttons: PropTypes.arrayOf(PropTypes.object),
  deleteCompletedTasks: PropTypes.func,
};

export default Footer;
