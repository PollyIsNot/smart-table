export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
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
        })
    }

    const applyFiltering = (query, state, action) => {
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            
            if (field) {
                const container = action.parentElement;
                const input = container.querySelector(`[name="${field}"]`) || container.querySelector('input, select');
                
                if (input) {
                    input.value = '';
                }
                
                state[field] = '';
            }
        }

        // Собираем активные фильтры
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        })

        // Добавляем фильтры к query, если они есть
        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }

    return {
        updateIndexes,
        applyFiltering
    }
}
