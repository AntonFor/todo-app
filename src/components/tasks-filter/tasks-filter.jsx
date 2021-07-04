import React from 'react';
import PropTypes from 'prop-types';

import './tasks-filter.css';

const TasksFilter = (props) => {
  const {
    onClickActive, onClickCompleted, onClickAll, buttonSelected,
  } = props;

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={buttonSelected[0].class}
          id={buttonSelected[0].id}
          onClick={() => onClickAll(buttonSelected[0].id)}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={buttonSelected[1].class}
          id={buttonSelected[1].id}
          onClick={() => onClickActive(buttonSelected[1].id)}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={buttonSelected[2].class}
          id={buttonSelected[2].id}
          onClick={() => onClickCompleted(buttonSelected[2].id)}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.defaultProps = {
  onClickActive: () => {},
  onClickCompleted: () => {},
  onClickAll: () => {},
  buttonSelected: [
    { class: 'selected', id: 'button-all' },
    { class: '', id: 'button-active' },
    { class: '', id: 'button-completed' },
  ],
};

TasksFilter.propTypes = {
  onClickActive: PropTypes.func,
  onClickCompleted: PropTypes.func,
  onClickAll: PropTypes.func,
  buttonSelected: PropTypes.arrayOf(PropTypes.object),
};

export default TasksFilter;
