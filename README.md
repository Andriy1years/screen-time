Donate me pls o(*^＠^*)o

crypto:

BTC: 1CSb6b9HLgYujoYcC3yzBRBAYcNvkiBzGY

usdt TRC20: TLDoJY11r8imrNHYmFy3d36momxdtd57mw


[EN]
this program in beta test 

how to put this program on auto start

Using Task Scheduler

Open Task Scheduler:

Press Win + R, type taskschd.msc, and press Enter.

In the left panel, select Task Scheduler Library.

In the right panel, click Create Task.

In the new window:

Under the General tab, give the task a name (e.g., Start Node.js Server).

Under the Triggers tab, click New:

Choose At log on or At startup.

Under the Actions tab, click New:

In Program/script, enter:

bash

Копировать

Редактировать

C:\Windows\System32\cmd.exe

In Add arguments, enter:

bash

/c ""disk": && cd "path to the project" && node index.js"

/c "C: && cd sayt\my_app && node index.js"

Adjust Conditions and Settings if needed.

Click OK to save the task.

[RU]

Эта програма в бета тесте 

как поставить програму на авто старт


Добавить задачу в Планировщик заданий Windows

Открой Планировщик заданий:

Нажми Win + R, введи taskschd.msc, и нажми Enter.

В левой панели выбери Библиотека планировщика заданий.

В правой панели выбери Создать задачу.

В открывшемся окне:

На вкладке Общие установи имя задачи, например: Запуск сервера Node.js.

На вкладке Триггеры нажми Создать:

Выбери При входе в систему или При запуске компьютера.

На вкладке Действия выбери Создать:

В поле Программа/скрипт укажи путь к cmd.exe (например, C:\Windows\System32\cmd.exe).

В поле Аргументы напиши команду для перехода в папку и запуска:

bash

Копировать
Редактировать

/c ""диск": && cd "путь к проекту" && node index.js"

/c "Q: && cd sayt\my_app && node index.js"

На вкладке Условия и Параметры настроишь, если нужно.

Нажми ОК для создания задачи.
