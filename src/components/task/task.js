import React from 'react';
import PropTypes from 'prop-types';

import './task.css';

const Task = (props) => {
  const {
    description, created, onClickTask, onClickDestroy, onClickEdit, view, id, completed, 
		timeWork, sumTimeWork, onClickPlay, onClickPause
  } = props;

	let checked = false;
	checked = (completed === 'completed') ? true : false;

	let sumTime = timeWork + sumTimeWork;

	function timeConverter(delta) {
		let workTimeSeconds = parseInt((delta/1000)%60);
			let workTimeMinutes = parseInt((delta/(1000*60))%60);
			workTimeSeconds = (workTimeSeconds < 10) ? "0" + workTimeSeconds : workTimeSeconds;
			workTimeMinutes = (workTimeMinutes < 10) ? "0" + workTimeMinutes : workTimeMinutes;
			return `${workTimeMinutes}:${workTimeSeconds}`;
	}

	const time = timeConverter(sumTime);

  return (
    <div className={view}>
      <input id={id} className="toggle" type="checkbox" checked={checked} onChange={onClickTask} />
      <label htmlFor={id}>
        <span className="title">{description}</span>
        <span className="description">
					<button className="icon icon-play" onClick={onClickPlay}></button>
          <button className="icon icon-pause" onClick={onClickPause}></button>
          <span className="time">{time}</span>
				</span>
				<span className="description">{created}</span>
      </label>
      <button type="button" className="icon icon-edit" onClick={onClickEdit} />
      <button type="button" className="icon icon-destroy" onClick={onClickDestroy} />
    </div>
  );
};

Task.defaultProps = {
  description: '',
  created: '',
  onClickTask: () => {},
  onClickDestroy: () => {},
  onClickEdit: () => {},
  view: 'view',
  id: 0,
};

Task.propTypes = {
  description: PropTypes.string,
  created: PropTypes.string,
  onClickTask: PropTypes.func,
  onClickDestroy: PropTypes.func,
  onClickEdit: PropTypes.func,
  view: PropTypes.string,
  id: PropTypes.number,
};

export default Task;
