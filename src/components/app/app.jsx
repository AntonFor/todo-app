/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

const classNames = require('classnames');

export const MyContext = React.createContext();

const App = () => {
	const [currentTasks, setTaskData] = useState([]);
	const [currenButton, setButtonData] = useState([
		{ class: 'selected', id: 'button-all' },
    { class: '', id: 'button-active' },
    { class: '', id: 'button-completed' }
	]);
	const [taskEdit, setTaskEdit] = useState({});
	const [currentInterval, setIntervalTemp] = useState();
	const [delta, setDelta] = useState(0);

  const status = {
    COMPLETED: 'completed',
    EDITING: 'editing',
    VIEW: 'view',
  };

  const completedItem = (id) => {
		setTaskData((taskData) => {
			const idx = taskData.findIndex((el) => el.id === id);
      const checkClass = classNames({
        completed: !(taskData[idx].class === status.COMPLETED),
      });
      const oldItem = taskData[idx];
      const newItem = { ...oldItem, class: checkClass };
      const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
			localStorage.setItem('tasks', JSON.stringify(newTaskData));
			return newTaskData;
		});
  };

  const deleteItem = (id) => {
		setTaskData((taskData) => {
			const newTaskData = taskData.filter((el) => el.id !== id);
      localStorage.setItem('tasks', JSON.stringify(newTaskData));
			return newTaskData;
		});
  };

  const editItem = (id) => {
		setTaskData((taskData) => {
			const idx = taskData.findIndex((el) => el.id === id);
      const checkClass = classNames({
        editing: !(taskData[idx].class === status.EDITING),
			});
      const oldItem = taskData[idx];
      const newItem = { ...oldItem, class: checkClass };
      const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
			return newTaskData;
		});
	};

	const createItem = (description, milsec) => ({
    class: '',
    description,
    view: 'view',
    created: formatDistanceToNow(new Date(), { includeSeconds: true }),
    id: uuidv4(),
		timeWorkTask: 0,
		sumTimeWorkTask: milsec
  })

  const addItem = (text, milsec) => {
    if (text.length === 0) return;
    const newItem = createItem(text, milsec);
    setTaskData((taskData) => {
			const newTaskData = [...taskData, newItem];
			localStorage.setItem('tasks', JSON.stringify(newTaskData));
			return newTaskData;
		});
  };

	const selectedButton = (idx) => {
		setButtonData((buttonData) => {
			const oldButtonData = [...(buttonData)];
      const newButtonData = oldButtonData.map((el) => {
        const checkClass = classNames(
          { selected: (el.id === idx) },
          { '': !(el.id === idx) },
        );
        const newItem = { ...el, class: checkClass };
        return newItem;
      });
			return newButtonData;
		})
  }

	const filtrationActiveItem = (id) => {
		setTaskData((taskData) => {
			const oldTaskData = [...(taskData)];
      const newTaskData = oldTaskData.map((el) => {
        const checkClass = classNames(
          { view: !(el.class === status.COMPLETED) },
          { hidden: (el.class === status.COMPLETED) },
        );
        const newItem = { ...el, view: checkClass };
        return newItem;
      });
			return newTaskData;
		});
    selectedButton(id);
  };

  const filtrationCompletedItem = (id) => {
    setTaskData((taskData) => {
			const oldTaskData = [...(taskData)];
      const newTaskData = oldTaskData.map((el) => {
        const checkClass = classNames(
          { view: (el.class === status.COMPLETED) },
          { hidden: !(el.class === status.COMPLETED) },
          );
				const newItem = { ...el, view: checkClass };
        return newItem;
      });
			return newTaskData;
		});
    selectedButton(id);
  };

  const filtrationAllItem = (id) => {
		setTaskData((taskData) => {
			const oldTaskData = [...(taskData)];
      const newTaskData = oldTaskData.map((el) => {
      const newItem = { ...el, view: status.VIEW };
        return newItem;
      });
			return newTaskData;
		});
		selectedButton(id);
  };

  const deleteCompletedItems = () => {
		setTaskData((taskData) => {
			const oldTaskData = [...(taskData)];
      const newTaskData = oldTaskData.filter((el) => el.class !== status.COMPLETED);
      localStorage.setItem('tasks', JSON.stringify(newTaskData));
			return newTaskData;
		});
  };

  const editTask = (text, id) => {
		setTaskEdit({ text, id });
  };

  const eventEdit = ({ key }, id) => {
    if (key === 'Enter') {
    const { text } = taskEdit;
		setTaskData((taskData) => {
			const idx = taskData.findIndex((el) => el.id === id);
      const oldItem = taskData[idx];
      const newItem = { ...oldItem, class: '', description: text };
      const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
      localStorage.setItem('tasks', JSON.stringify(newTaskData));
			return newTaskData;
		});
    }
  };

	const workItemPlay = (id) => {
		const startTime = Date.now();
		setIntervalTemp(() => {
			const interval = setInterval(() => {
				const newDelta = Date.now() - startTime;
				setDelta(() => newDelta);
				setTaskData((taskData) => {
					const idx = taskData.findIndex((el) => el.id === id);
					const oldItem = taskData[idx];
					const newItem = { ...oldItem, timeWorkTask: newDelta };
					const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
					localStorage.setItem('tasks', JSON.stringify(newTaskData));
					return newTaskData;
				});
			}, 1000);
			return interval;
		});
	}

	const workItemPause = (id) => {
		setTaskData((taskData) => {
			const idx = taskData.findIndex((el) => el.id === id);
			const oldItem = taskData[idx];
			const sumTime = oldItem.sumTimeWorkTask + delta;
			const newItem = { ...oldItem, sumTimeWorkTask: sumTime, timeWorkTask: 0 };
			const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
			localStorage.setItem('tasks', JSON.stringify(newTaskData));
			return newTaskData;
		});
		clearInterval(currentInterval);
	}

	useEffect(() => {
		setTaskData(() => {
			const getTasks = localStorage.getItem('tasks');
			const getTasksPars = JSON.parse(getTasks);
			return getTasksPars;
		});
		return () => {localStorage.setItem('tasks', JSON.stringify(currentTasks));}
	}, []);

	const properties = {
		tasks: currentTasks,
		filtrationActiveTask: filtrationActiveItem,
		filtrationCompletedTask: filtrationCompletedItem,
		filtrationAllTask: filtrationAllItem,
		buttons: currenButton,
		deleteCompletedTasks: deleteCompletedItems,
		completedTask: completedItem,
		deleteTask: deleteItem,
		editTask: editItem,
		changeEditTask: editTask,
		handlingEventEdit: eventEdit,
		value: taskEdit,
		workTaskPlay: workItemPlay,
		workTaskPause: workItemPause,
		addTask: addItem
	}
	
  return (
		<MyContext.Provider value={properties}>
			<section className="todoapp">
				<NewTaskForm />
				<section className="main">
					<TaskList	/>
					<Footer	/>
				</section>
			</section>
		</MyContext.Provider>
    
  );
}

export default App;