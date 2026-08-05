import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(
            ...Object.values(indexes[elementName]).map(name => {
                // Создаем тег <option>
                const option = document.createElement('option');
                // Назначаем атрибут value
                option.value = name;
                // Назначаем текст, который увидит пользователь
                option.textContent = name;
                // Возвращаем готовую опцию, чтобы map собрал их в массив
                return option;
            })
        );
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            // Находим родительский элемент (контейнер) кнопки, а внутри него — поле input
            const input = action.parentElement.querySelector('input');
            
            // Если поле input нашлось, стираем то, что там написано
            if (input) {
                input.value = '';
            }
            
            // Получаем имя поля, к которому привязана кнопка (из data-field="...")
            const field = action.dataset.field;
            
            // Стираем это значение в объекте состояния, чтобы приложение поняло, что фильтр сброшен
            if (field) {
                state[field] = '';
            }
        }
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}