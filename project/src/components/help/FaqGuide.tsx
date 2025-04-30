import React from 'react';

const FaqGuide: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Руководство пользователя</h2>

      {/* Пошаговая инструкция */}
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Пошаговая инструкция FAQ</h3>
        <ul className="space-y-4">
          <li>
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600">
                Управление столами
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Имея права администратора, в разделе "Настройки" выберите вкладку "Столы". Здесь вы можете добавлять новые столы, редактировать их параметры (номер, количество мест, статус) или просматривать текущую информацию о столах.
              </p>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600">
                Управление меню
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Имея права администратора, в разделе "Настройки" выберите вкладку "Меню". Вы можете добавлять новые блюда, редактировать существующие (название, описание, цену, категорию, время приготовления) или удалять их.
              </p>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600">
                Работа с заказами
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                В разделе "Столы" отображаются текущие столы. Нажав на любой стол, он автоматически станет занят и создастся заказ для него. Вы можете просматривать детали заказа, изменять его статус (например, "в процессе" или "готов"), а также добавлять новые заказы для выбранного стола.
              </p>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600">
                Добавление блюд в заказ
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                После выбора стола, вы можете просмотреть меню и добавлять блюда в заказ. Для этого выберите нужные позиции и нажмите кнопку "Добавить в заказ". Блюда будут отображаться в списке заказа, где вы сможете изменить их количество
              </p>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600">
                Оплата заказа
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                После добавления всех необходимых блюд в заказ, вы можете перейти к оплате. В разделе столы, выберите стол с вашим заказом, далее выберите способ оплаты (наличные или карта). Оплата появится в соответствующем разделе, и её можно подтвердить. Система автоматически создаст счет, который можно распечатать или отправить клиенту по электронной почте.
              </p>
            </details>
          </li>
          <li>
            <details className="group">
              <summary className="cursor-pointer text-lg font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600">
                Подтверждение заказа
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                После оплаты заказа, вы можете подтвердить его выполнение. Для этого перейдите в раздел "Заказы", выберите нужный заказ и нажмите кнопку "Подтвердить". Это действие изменит статус заказа на "Завершен" и освободит стол для новых клиентов. Так же есть возможность подтвердить заказ до подтверждения оплаты, на случай если клиент не хочет получать чек.
              </p>
            </details>
          </li>
        </ul>
      </div>


      <div>
        <h3 className="text-xl font-medium mb-4 text-gray-900 dark:text-white">Используемые термины</h3>
        <ul className="space-y-4">
          <li>
            <strong className="text-gray-900 dark:text-white">Стол:</strong>
            <span className="ml-2 text-gray-600 dark:text-gray-400">Место в ресторане, за которым сидят клиенты.</span>
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">Меню:</strong>
            <span className="ml-2 text-gray-600 dark:text-gray-400">Список блюд и напитков, доступных для заказа.</span>
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">Заказ:</strong>
            <span className="ml-2 text-gray-600 dark:text-gray-400">Список блюд, выбранных клиентом для приготовления.</span>
          </li>
          <li>
            <strong className="text-gray-900 dark:text-white">Счет:</strong>
            <span className="ml-2 text-gray-600 dark:text-gray-400">Документ с итоговой суммой заказа, предоставляемый клиенту для оплаты.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FaqGuide;