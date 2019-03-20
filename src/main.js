import createFilterItem from '../src/create-filter.js';
import {
  FILTER_NAME_LIST,
  TASK_TITLE_LIST,
  TASK_COLOR_LIST,
  getDueDate,
  getTags,
  getRepeatingDays
} from '../src/data.js';
import {Task} from '../src/task.js';
import {getRandomValueRange} from '../src/utils.js';

const mainFilterElem = document.querySelector(`.main__filter`);
const boardTasksElem = document.querySelector(`.board__tasks`);

/**
 * Создание заданного перечня фильтров
 * @param {array} filterList
 */
const generateFilters = (filterList) => {
  mainFilterElem.innerHTML = filterList.reduce((resultHtml, filterNameItem) => {
    return resultHtml + createFilterItem(filterNameItem, getRandomValueRange(0, 115));
  }, ``);
};

/**
 * Добавляем обработчик события для фильтров
 */
const addFiltersEvents = () => {
  mainFilterElem.addEventListener(`click`, () => {
    boardTasksElem.innerHTML = ``;
    generateTasks(boardTasksElem, 7);
  });
};

/**
 * Создание заданного числа карточеек
 * @param {link} containerTasksElem
 * @param {int} taskCount
 */
const generateTasks = (containerTasksElem, taskCount) => {
  for (let i = 1; i <= taskCount; i++) {
    const taskObj = {
      title: TASK_TITLE_LIST[getRandomValueRange(0, TASK_TITLE_LIST.length - 1)],
      dueDate: getDueDate(),
      tags: getTags(),
      image: `http://picsum.photos/100/100?r=${Math.random()}`,
      color: {
        value: TASK_COLOR_LIST[getRandomValueRange(0, TASK_COLOR_LIST.length - 1)],
        list: TASK_COLOR_LIST
      },
      repeatingDays: getRepeatingDays(),
      isFavorite: !!getRandomValueRange(0, 1),
      isDone: !!getRandomValueRange(0, 1),
      isEdit: !!getRandomValueRange(0, 1)
    };

    const task = new Task(taskObj);
    task.render(containerTasksElem);
  }
};

// Отрисовываем фильтры
generateFilters(FILTER_NAME_LIST);

// Отрисовываем карточек задач
boardTasksElem.innerHTML = ``;
generateTasks(boardTasksElem, 7);

// Добавляем обработчики событий фильтрам
addFiltersEvents();
