import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';
import './task-list.css';

const TaskList = (props) => {
	const {
    tasks, completedTask, deleteTask, editTask, changeEditTask, handlingEventEdit, value,
		workTaskPlay, workTaskPause
  } = props;
  const { text, id } = value;

  const elements = tasks.map((item) => {
    let textValue;
    if (id === item.id) textValue = text;
    else textValue = item.description;
    return (
      <li key={item.id} className={item.class}>
        <Task
          description={item.description}
          created={item.created}
          onClickTask={() => completedTask(item.id)}
          onClickDestroy={() => deleteTask(item.id)}
          onClickEdit={() => editTask(item.id)}
          view={item.view}
          id={item.id}
					completed={item.class}
					timeWork={item.timeWorkTask}
					sumTimeWork={item.sumTimeWorkTask}
					onClickPlay={() => workTaskPlay(item.id)}
					onClickPause={() => workTaskPause(item.id)}
        />
        <input
          key={item.id}
          type="text"
          className="edit"
          value={textValue}
          onChange={(event) => changeEditTask(event.target.value, item.id)}
          onKeyDown={(event) => handlingEventEdit(event, item.id)}
          onFocus={(event) => changeEditTask(event.target.value, item.id)}
        />
      </li>
    );
  });

	const message = <div className="massage">There&apos;s no task yet</div>

  return <ul className="todo-list">{tasks.length === 0 ? message : elements}</ul>;
};

TaskList.defaultProps = {
  tasks: [],
  completedTask: () => {},
  deleteTask: () => {},
  editTask: () => {},
  changeEditTask: () => {},
  handlingEventEdit: () => {},
  value: { text: '', id: null },
	workTaskPlay: () => {},
	workTaskPause: () => {},
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  completedTask: PropTypes.func,
  deleteTask: PropTypes.func,
  editTask: PropTypes.func,
  changeEditTask: PropTypes.func,
  handlingEventEdit: PropTypes.func,
  value: PropTypes.objectOf(PropTypes.object),
	workTaskPlay: PropTypes.func,
	workTaskPause: PropTypes.func,
};

export default TaskList;
