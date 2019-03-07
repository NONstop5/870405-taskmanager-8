/**
 * Генерация html-кода хэштэгов
 * @param {array} tags
 * @return {string}
 */
const generateTaskHashtags = (tags) => {
  const tagsHtml = tags.reduce((resultHtml, tagValue) => {
    return resultHtml + `
      <span class="card__hashtag-inner">
        <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input" />
        <button type="button" class="card__hashtag-name">
          #${tagValue}
        </button>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>
    `;
  }, ``);

  return `
    <div class="card__hashtag">
      <div class="card__hashtag-list">
        ${tagsHtml}
      </div>

      <label>
        <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here" />
      </label>
    </div>
  `;
};

/**
 * Возвращает класс для смены класса кнопок задачи
 * @param {boolean} isDisabled
 * @return {string}
 */
const getTaskDisabledClass = (isDisabled) => {
  const TaskDisabledClassList = {
    true: ``,
    false: ` card__btn--disabled`
  };

  return TaskDisabledClassList[isDisabled];
};

/**
  * Возвращает является ли задача просроченной
  * @param {*} dueDateStr
  * @return {boolean}
  */
const getIsDeadline = (dueDateStr) => {
  const curDate = new Date();
  const dueDateArr = dueDateStr.split(` `);
  const dueDate = new Date(Date.parse(`${dueDateArr[1]} ${dueDateArr[0]}, 2019`));
  return curDate > dueDate;
};

/**
 * Возвращает цвет бара задачи в зависимости её просроченности
 * @param {string} color
 * @param {boolean} isDeadline
 * @return {string}
 */
const getTaskColor = (color, isDeadline) => {
  return isDeadline ? `deadline` : color;
};

/**
 * Возвращает повторяется задача или нет
 * @param {object} repeatingDays
 * @return {boolean}
 */
const getIsRepeatTask = (repeatingDays) => {
  for (let dayValue in repeatingDays) {
    if (repeatingDays[dayValue]) {
      return dayValue;
    }
  }

  return false;
};

/**
 * Возвращает класс повторяющейся задачи
 * @param {boolean} isRepeat
 * @return {string}
 */
const getTaskBarType = (isRepeat) => {
  return isRepeat ? `card--repeat` : ``;
};

/**
 * Возвращает повторяется задача или нет в виде текста
 * @param {boolean} isRepeat
 * @return {string}
 */
const getTaskRepeatText = (isRepeat) => {
  return isRepeat ? `yes` : `no`;
};

/**
 * Генерация html-кода дней недели
 * @param {object} repeatingDays
 * @return {string}
 */
const generateTaskDaysHtml = (repeatingDays) => {
  let daysHtml = ``;
  for (let day in repeatingDays) {
    if (repeatingDays[day] !== undefined) {
      daysHtml += `
        <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day}-4" name="repeat" value="${day}" ${repeatingDays[day] ? `checked` : ``} />
        <label class="card__repeat-day" for="repeat-${day}-4">${day}</label>
      `;
    }
  }

  return daysHtml;
};

const generateTaskColorsHtml = (colorObj) => {
  return colorObj.list.reduce((resultHtml, color) => {
    return resultHtml + `
      <input type="radio" id="color-${color}-4" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}" ${color === colorObj.value ? `checked` : ``} />
      <label for="color-${color}-4" class="card__color card__color--${color}">${color}</label>
    `;
  }, ``);
};

/**
 * Отрисовка карточки задачи
 * @param {object} taskSettings
 * @return {string}
 */
export default (taskSettings) => {
  const taskControlBlock = `
    <div class="card__control">
      <button type="button" class="card__btn card__btn--edit">
        edit
      </button>
      <button type="button" class="card__btn card__btn--archive${getTaskDisabledClass(taskSettings.isDone)}">
        archive
      </button>
      <button type="button" class="card__btn card__btn--favorites${getTaskDisabledClass(taskSettings.isFavorite)}">
        favorites
      </button>
    </div>
  `;

  const taskColorBarBlock = `
    <div class="card__color-bar">
      <svg class="card__color-bar-wave" width="100%" height="10">
        <use xlink:href="#wave"></use>
      </svg>
    </div>
  `;

  const taskTextareaBlock = `
  <div class="card__textarea-wrap">
    <label>
      <textarea class="card__text" placeholder="Start typing your text here..." name="text">${taskSettings.title}</textarea>
    </label>
  </div>
  `;

  const taskDateBlock = `
    <div class="card__dates">
      <button class="card__date-deadline-toggle" type="button">
        date: <span class="card__date-status">yes</span>
      </button>

      <fieldset class="card__date-deadline">
        <label class="card__input-deadline-wrap">
          <input class="card__date" type="text" placeholder="23 September" name="date" value="${taskSettings.dueDate}" />
        </label>
        <label class="card__input-deadline-wrap">
          <input class="card__time" type="text" placeholder="11:15 PM" name="time" value="00:00 AM" />
        </label>
      </fieldset>

      <button class="card__repeat-toggle" type="button">
        repeat:<span class="card__repeat-status">${getTaskRepeatText(getIsRepeatTask(taskSettings.repeatingDays))}</span>
      </button>

      <fieldset class="card__repeat-days">
        <div class="card__repeat-days-inner">
          ${generateTaskDaysHtml(taskSettings.repeatingDays)}
        </div>
      </fieldset>
    </div>
  `;

  const taskImageBlock = `
    <label class="card__img-wrap">
      <input type="file" class="card__img-input visually-hidden" name="img" />
      <img src="${taskSettings.image}" alt="task picture" class="card__img" />
    </label>
  `;

  const taskColorBlock = `
    <div class="card__colors-inner">
      <h3 class="card__colors-title">Color</h3>
      <div class="card__colors-wrap">
        ${generateTaskColorsHtml(taskSettings.color)}
      </div>
    </div>
  `;

  const taskSettingsBlock = `
    <div class="card__settings">
      <div class="card__details">
        ${taskDateBlock}
        ${generateTaskHashtags(taskSettings.tags)}
      </div>
      ${taskImageBlock}
      ${taskColorBlock}
    </div>

  `;

  const taskStatusButtonsBlock = `
    <div class="card__status-btns">
      <button class="card__save" type="submit">save</button>
      <button class="card__delete" type="button">delete</button>
    </div>
  `;

  return `
    <article class="card ${taskSettings.taskType} ${getTaskBarType(getIsRepeatTask(taskSettings.repeatingDays))} card--${getTaskColor(taskSettings.color.value, getIsDeadline(taskSettings.dueDate))}">
      <form class="card__form" method="get">
        <div class="card__inner">
        ${taskControlBlock}
        ${taskColorBarBlock}
        ${taskTextareaBlock}
        ${taskSettingsBlock}
        ${taskStatusButtonsBlock}
        </div>
      </form>
    </article>
  `;
};
