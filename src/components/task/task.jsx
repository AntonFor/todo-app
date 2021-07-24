import React from 'react';
import PropTypes from 'prop-types';

import './task.css';

const Task = (props) => {
  const {
    description,
    created,
    onClickTask,
    onClickDestroy,
    onClickEdit,
    view,
    id,
    completed,
    timeWork,
    sumTimeWork,
    onClickPlay,
    onClickPause,
  } = props;

  let checked = false;
  checked = completed === 'completed';

  const sumTime = timeWork + sumTimeWork;

  function timeConverter(delta) {
    let workTimeSeconds = parseInt((delta / 1000) % 60, 10);
    let workTimeMinutes = parseInt((delta / (1000 * 60)) % 60, 10);
    workTimeSeconds = workTimeSeconds < 10 ? `0${workTimeSeconds}` : workTimeSeconds;
    workTimeMinutes = workTimeMinutes < 10 ? `0${workTimeMinutes}` : workTimeMinutes;
    return `${workTimeMinutes}:${workTimeSeconds}`;
  }

  const time = timeConverter(sumTime);

  return (
    <div className={view}>
      <input id={id} className="toggle" type="checkbox" checked={checked} onChange={onClickTask} />
      <label htmlFor={id}>
        <span className="title">{description}</span>
        <span className="description">
          <button type="button" aria-label="Mute volume" className="icon icon-play" onClick={onClickPlay} />
          <button type="button" aria-label="Mute volume" className="icon icon-pause" onClick={onClickPause} />
          <span className="time">{time}</span>
        </span>
        <span className="description">{created}</span>
      </label>
      <button type="button" aria-label="Mute volume" className="icon icon-edit" onClick={onClickEdit} />
      <button type="button" aria-label="Mute volume" className="icon icon-destroy" onClick={onClickDestroy} />
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
  completed: '',
  timeWork: 0,
  sumTimeWork: 0,
  onClickPlay: () => {},
  onClickPause: () => {},
};

Task.propTypes = {
  description: PropTypes.string,
  created: PropTypes.string,
  onClickTask: PropTypes.func,
  onClickDestroy: PropTypes.func,
  onClickEdit: PropTypes.func,
  view: PropTypes.string,
  id: PropTypes.number,
  completed: PropTypes.string,
  timeWork: PropTypes.number,
  sumTimeWork: PropTypes.number,
  onClickPlay: PropTypes.func,
  onClickPause: PropTypes.func,
};

export default Task;
