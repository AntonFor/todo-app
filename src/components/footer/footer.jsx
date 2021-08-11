/* eslint-disable import/no-cycle */
import React, {useContext} from 'react';
// import PropTypes from 'prop-types';
import { MyContext } from '../app/app';

import TasksFilter from '../tasks-filter';
import './footer.css';

const Footer = () => {
	const properties = useContext(MyContext);
  const COMPLETED = 'completed';
	const { tasks, deleteCompletedTasks } = properties;
  const completedTask = (tasks.filter((el) => el.class === COMPLETED)).length;
  const activeTask = tasks.length - completedTask;

  return (
    <footer className="footer">
      <span className="todo-count">
        {activeTask}
        {' '}
        items left
      </span>
      <TasksFilter />
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

// Footer.propTypes = {
//  tasks: PropTypes.arrayOf(PropTypes.object),
//  filtrationActiveTask: PropTypes.func,
//  filtrationCompletedTask: PropTypes.func,
//  filtrationAllTask: PropTypes.func,
//  buttons: PropTypes.arrayOf(PropTypes.object),
//  deleteCompletedTasks: PropTypes.func,
// };

export default Footer;
