import createFilterItem from '../src/create-filter.js';
import createTaskItem from './create-task.js';
import {
  FILTER_NAME_LIST,
  TASK_TITLE_LIST,
  TASK_COLOR_LIST,
  TASK_TYPE_LIST,
  getDueDate,
  getTags,
  getRepeatingDays
} from '../src/data.js';
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
 * Создание заданного числа карточеек
 * @param {int} taskCount
 */
const generateTasks = (taskCount) => {
  let tastsHtml = ``;
  for (let i = 1; i <= taskCount; i++) {
    tastsHtml += createTaskItem({
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
      taskType: TASK_TYPE_LIST[1]
    });
  }
  boardTasksElem.innerHTML = tastsHtml;
};

/**
 * Добавляем обработчик события для фильтров
 */
const addFiltersEvents = () => {
  mainFilterElem.addEventListener(`click`, () => {
    boardTasksElem.innerHTML = ``;
    generateTasks(getRandomValueRange(0, 7));
  });
};

// Отрисовываем фильтры
generateFilters(FILTER_NAME_LIST);

// Отрисовываем карточки
generateTasks(7);

// Добавляем обработчики событий фильтрам
addFiltersEvents();
