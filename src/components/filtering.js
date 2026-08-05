import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
// Настраиваем компаратор на основе готовых стандартных правил из defaultRules
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        if (elements[elementName]) {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
            );
        }
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        // Проверяем, что кликнули именно по кнопке очистки (name === 'clear')
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            
            if (field) {
                // Ищем ИМЕННО то поле (input/select), имя которого совпадает с data-field кнопки
                const container = action.parentElement;
                const input = container.querySelector(`[name="${field}"]`) || container.querySelector('input, select');
                
                if (input) {
                    input.value = ''; // Очищаем поле на странице
                }
                
                state[field] = ''; // Очищаем значение в памяти (state)
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    };
}