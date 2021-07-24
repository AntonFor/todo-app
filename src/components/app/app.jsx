import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';

import './app.css';

const classNames = require('classnames');

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      taskData: [],
      buttonData: [
        { class: 'selected', id: 'button-all' },
        { class: '', id: 'button-active' },
        { class: '', id: 'button-completed' },
      ],
      taskEdit: {},
    };

    this.status = {
      COMPLETED: 'completed',
      EDITING: 'editing',
      VIEW: 'view',
    };

    this.completedItem = (id) => {
      this.setState(({ taskData }) => {
        const idx = taskData.findIndex((el) => el.id === id);
        const checkClass = classNames({
          completed: !(taskData[idx].class === this.status.COMPLETED),
        });
        const oldItem = taskData[idx];
        const newItem = { ...oldItem, class: checkClass };
        const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
        localStorage.setItem('tasks', JSON.stringify(newTaskData));
        return {
          taskData: newTaskData,
        };
      });
    };

    this.deleteItem = (id) => {
      this.setState(({ taskData }) => {
        const newTaskData = taskData.filter((el) => el.id !== id);
        localStorage.setItem('tasks', JSON.stringify(newTaskData));
        return {
          taskData: newTaskData,
        };
      });
    };

    this.editItem = (id) => {
      this.setState(({ taskData }) => {
        const idx = taskData.findIndex((el) => el.id === id);
        const checkClass = classNames({
          editing: !(taskData[idx].class === this.status.EDITING),
        });
        const oldItem = taskData[idx];
        const newItem = { ...oldItem, class: checkClass };
        const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
        return {
          taskData: newTaskData,
        };
      });
    };

    this.addItem = (text, milsec) => {
      if (text.length === 0) return;
      const newItem = this.createItem(text, milsec);
      this.setState(({ taskData }) => {
        const newTaskData = [...taskData, newItem];
        localStorage.setItem('tasks', JSON.stringify(newTaskData));
        return {
          taskData: newTaskData,
        };
      });
    };

    this.filtrationActiveItem = (id) => {
      this.setState(({ taskData }) => {
        const oldTaskData = [...taskData];
        const newTaskData = oldTaskData.map((el) => {
          const checkClass = classNames(
            { view: !(el.class === this.status.COMPLETED) },
            { hidden: el.class === this.status.COMPLETED }
          );
          const newItem = { ...el, view: checkClass };
          return newItem;
        });
        return {
          taskData: newTaskData,
        };
      });
      this.selectedButton(id);
    };

    this.filtrationCompletedItem = (id) => {
      this.setState(({ taskData }) => {
        const oldTaskData = [...taskData];
        const newTaskData = oldTaskData.map((el) => {
          const checkClass = classNames(
            { view: el.class === this.status.COMPLETED },
            { hidden: !(el.class === this.status.COMPLETED) }
          );
          const newItem = { ...el, view: checkClass };
          return newItem;
        });
        return {
          taskData: newTaskData,
        };
      });
      this.selectedButton(id);
    };

    this.filtrationAllItem = (id) => {
      this.setState(({ taskData }) => {
        const oldTaskData = [...taskData];
        const newTaskData = oldTaskData.map((el) => {
          const newItem = { ...el, view: this.status.VIEW };
          return newItem;
        });
        return {
          taskData: newTaskData,
        };
      });
      this.selectedButton(id);
    };

    this.deleteCompletedItems = () => {
      this.setState(({ taskData }) => {
        const oldTaskData = [...taskData];
        const newTaskData = oldTaskData.filter((el) => el.class !== this.status.COMPLETED);
        localStorage.setItem('tasks', JSON.stringify(newTaskData));
        return {
          taskData: newTaskData,
        };
      });
    };

    this.editTask = (text, id) => {
      this.setState({ taskEdit: { text, id } });
    };

    this.eventEdit = ({ key }, id) => {
      if (key === 'Enter') {
        const { taskEdit } = this.state;
        const { text } = taskEdit;
        this.setState(({ taskData }) => {
          const idx = taskData.findIndex((el) => el.id === id);
          const oldItem = taskData[idx];
          const newItem = { ...oldItem, class: '', description: text };
          const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
          localStorage.setItem('tasks', JSON.stringify(newTaskData));
          return {
            taskData: newTaskData,
          };
        });
      }
    };

    this.workItemPlay = (id) => {
      const startTime = Date.now();
      this.id = setInterval(() => {
        this.delta = Date.now() - startTime;
        this.setState(({ taskData }) => {
          const idx = taskData.findIndex((el) => el.id === id);
          const oldItem = taskData[idx];
          const newItem = { ...oldItem, timeWorkTask: this.delta };
          const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
          localStorage.setItem('tasks', JSON.stringify(newTaskData));
          return {
            taskData: newTaskData,
          };
        });
      }, 1000);
    };

    this.workItemPause = (id) => {
      this.setState(({ taskData }) => {
        const idx = taskData.findIndex((el) => el.id === id);
        const oldItem = taskData[idx];
        const sumTime = oldItem.sumTimeWorkTask + this.delta;
        const newItem = { ...oldItem, sumTimeWorkTask: sumTime, timeWorkTask: 0 };
        const newTaskData = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)];
        localStorage.setItem('tasks', JSON.stringify(newTaskData));
        return {
          taskData: newTaskData,
        };
      });
      clearInterval(this.id);
    };
  }

  componentDidMount() {
    const getTasks = localStorage.getItem('tasks');
    const getTasksPars = JSON.parse(getTasks);
    this.setState({
      taskData: getTasksPars,
    });
  }

  componentWillUnmount() {
    const { taskData } = this.state;
    localStorage.setItem('tasks', JSON.stringify(taskData));
  }

  createItem(description, milsec) {
    return {
      class: '',
      description,
      view: 'view',
      created: formatDistanceToNow(new Date(), { includeSeconds: true }),
      id: uuidv4(),
      timeWorkTask: 0,
      sumTimeWorkTask: milsec,
    };
  }

  selectedButton(idx) {
    this.setState(({ buttonData }) => {
      const oldButtonData = [...buttonData];
      const newButtonData = oldButtonData.map((el) => {
        const checkClass = classNames({ selected: el.id === idx }, { '': !(el.id === idx) });
        const newItem = { ...el, class: checkClass };
        return newItem;
      });
      return {
        buttonData: newButtonData,
      };
    });
  }

  render() {
    const { taskData } = this.state;
    const { taskEdit } = this.state;
    const { buttonData } = this.state;
    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addItem} />
        <section className="main">
          <TaskList
            tasks={taskData}
            completedTask={this.completedItem}
            deleteTask={this.deleteItem}
            editTask={this.editItem}
            changeEditTask={this.editTask}
            handlingEventEdit={this.eventEdit}
            value={taskEdit}
            workTaskPlay={this.workItemPlay}
            workTaskPause={this.workItemPause}
          />
          <Footer
            tasks={taskData}
            filtrationActiveTask={this.filtrationActiveItem}
            filtrationCompletedTask={this.filtrationCompletedItem}
            filtrationAllTask={this.filtrationAllItem}
            buttons={buttonData}
            deleteCompletedTasks={this.deleteCompletedItems}
          />
        </section>
      </section>
    );
  }
}
