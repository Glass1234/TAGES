# ТЗ TAGES
На основании данных по товарам из приложенного items.json и названий материалов из materials.json отрисовать страницу со списком товаров согласно приложенному дизайну: https://www.figma.com/file/9Gcg8EvnmTDppPDxvRrmpi/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5-17-%D0%B8%D1%8E%D0%BB%D1%8F?node-id=1%3A23

## Требования:
1. Верстка - семантичная, по БЭМ, адаптивная.
2. Соответствующие селекторы сортируют записи по ценам (по возрастанию, по убыванию), и фильтруют по материалу (металл, дерево).
3. Исходные json файлы подвергаются изменениям только по полю image (по необходимости), в остальном остаются неизменными.

## Приветствуется:
1. Выполнение задачи в рамках фреймворка VueJS или NuxtJS, на главной странице приложения.
2. Использование VueX.
3. Использование TypeScript.

## Дополнительно*:
1. Товары добавляются в Избранные при помощи соответствующей кнопки (хранение в Local Storage).
2. Товары добавляются в Корзину при помощи соответствующей кнопки (хранение в Local Storage).

## Результат
Проект разработан на Vue3 и Nuxt3 в соответствии с требованиями задачи. Все "Требования", "Приветствуется", "Дополнительно" полностью реализованы. Интерфейс страницы находится в файле \`App.vue\`, а также созданы два компонента. Использован Vuex и TypeScript.

## Использованные компоненты
- **\`card-item.vue\`**: Компонент карточки товара. Принимает в props объект товара и реагирует на события нажатия на кнопки "Избранное" и "Корзина".
- **\`custom-selector.vue\`**: Компонент селектора. Принимает в props заголовок и список элементов для выбора.

## Хранение данных
Логика работы с исходными данными и локальным хранилищем реализована в Vuex.

## Развертывание
Проект доступен по ссылке: https://glass1234.github.io/TAGES/
