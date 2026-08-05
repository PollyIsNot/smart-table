import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(
        ['skipEmptyTargetValues'], // 1. Название правила передаем СТРОКОЙ в кавычках!
        [rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)] // 2. Кастомное правило передаем В МАССИВЕ []
    );

    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        return data.filter(row => compare(row, state));
    }
}