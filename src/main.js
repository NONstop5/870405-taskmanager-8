import {getRandomValueRange} from '../src/utils.js';
import {FILTER_NAME_LIST, CARD_TYPE_LIST, CARD_BAR_TYPE_LIST, CARD_COLOR_LIST} from '../src/data.js';
import createFilterItem from '../src/create-filter.js';
import createCardItem from '../src/create-card.js';

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
 * @param {int} cardsNumber
 */
const generateCards = (cardsNumber) => {
  let cardsHtml = ``;
  for (let i = 1; i <= cardsNumber; i++) {
    cardsHtml += createCardItem({
      cardType: CARD_TYPE_LIST[getRandomValueRange(0, CARD_TYPE_LIST.length - 1)],
      barType: CARD_BAR_TYPE_LIST[getRandomValueRange(0, CARD_BAR_TYPE_LIST.length - 1)],
      color: CARD_COLOR_LIST[getRandomValueRange(0, CARD_COLOR_LIST.length - 1)]
    });
  }
  boardTasksElem.innerHTML = cardsHtml;
};

/**
 * Добавляем обработчик события для фильтров
 */
const addFiltersEvents = () => {
  mainFilterElem.addEventListener(`click`, () => {
    boardTasksElem.innerHTML = ``;
    generateCards(getRandomValueRange(0, 7));
  });
};

// Отрисовываем фильтры
generateFilters(FILTER_NAME_LIST);

// Отрисовываем карточки
generateCards(7);

// Добавляем обработчики событий фильтрам
addFiltersEvents();
