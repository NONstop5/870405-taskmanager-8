class TaskComponent {
  constructor(data) {
    if (new.target === TaskComponent) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._image = data.image;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._element = null;

    this._state = {
      isFavorite: data.isFavorite,
      isDone: data.isDone,
    };
  }

  /**
   * Генерация html-кода хэштэгов
   * @param {array} tags
      */
  _generateTaskHashtags() {}

  /**
   * Возвращает класс для смены класса кнопок задачи
   * @param {boolean} isDisabled
   * @return {string}
   */
  _getTaskDisabledClass(isDisabled) {
    const TaskDisabledClassList = {
      true: ``,
      false: ` card__btn--disabled`
    };

    return TaskDisabledClassList[isDisabled];
  }

  /**
   * Возвращает является ли задача просроченной
   * @param {string} dueDateStr
   * @return {boolean}
   */
  _getIsDeadline(dueDateStr) {
    const curDate = new Date();
    const dueDateArr = dueDateStr.split(` `);
    const dueDate = new Date(Date.parse(`${dueDateArr[1]} ${dueDateArr[0]}, 2019`));
    return curDate > dueDate;
  }

  /**
   * Возвращает цвет бара задачи в зависимости её просроченности
   * @param {string} color
   * @param {boolean} isDeadline
   * @return {string}
   */
  _getTaskColor(color, isDeadline) {
    return isDeadline ? `deadline` : color;
  }

  /**
   * Возвращает повторяется задача или нет
   * @param {object} repeatingDays
   * @return {boolean}
   */
  _getIsRepeatTask(repeatingDays) {
    for (let dayValue in repeatingDays) {
      if (repeatingDays[dayValue]) {
        return dayValue;
      }
    }

    return false;
  }

  /**
   * Возвращает класс повторяющейся задачи
   * @param {boolean} isRepeat
   * @return {string}
   */
  _getTaskBarType(isRepeat) {
    return isRepeat ? `card--repeat` : ``;
  }

  /**
   * Отрисовка карточки задачи
   */
  get taskTemplate() {
    throw new Error(`You have to define taskTemplate() method.`);
  }

  get element() {
    return this._element;
  }

  /**
   * Создаем обработчики событий
   */
  addEvents() {
    throw new Error(`You have to define addEvents() method.`);
  }

  /**
   * Удаляем обработчики событий
   */
  removeEvents() {
    throw new Error(`You have to define removeEvents() method.`);
  }

  /**
   * Отрисовка задачи в заданном элементе
   * @return {link}
   */
  render() {
    this._element = null || document.createElement(`div`);

    this._element.innerHTML = this.taskTemplate;
    this._element = this._element.firstElementChild;
    this.addEvents();

    return this._element;
  }

  unrender() {
    this.removeEvents();
    this._element = null;
  }
}

export {
  TaskComponent
};
