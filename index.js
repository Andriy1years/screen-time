const activeWin = require('active-win');
const fs = require('fs');

const DATA_FILE = './activity.json';

// Загружаем текущие данные
let activityData = {};
if (fs.existsSync(DATA_FILE)) {
  activityData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// Функция для определения корректного имени приложения
const getAppName = (windowInfo) => {
  if (!windowInfo || !windowInfo.owner) return "Unknown";

  const appPath = windowInfo.owner.path || "";
  const appName = windowInfo.owner.name || "Unknown";

  // Проверяем список известных приложений
  const knownApps = {
    "code.exe": "Visual Studio Code",
    "discord.exe": "Discord",
    "obsidian.exe": "Obsidian",
    "brave.exe": "Brave",
    "cmd.exe": "Command Prompt",
    "powershell.exe": "PowerShell"
  };

  // Получаем название .exe из пути
  const exeName = appPath.split("\\").pop().toLowerCase();

  return knownApps[exeName] || appName;
};

// Запускаем сбор активности
setInterval(async () => {
  try {
    const windowInfo = await activeWin();
    const appName = getAppName(windowInfo);

    // Форматируем дату (YYYY.MM.DD)
    const date = new Date().toLocaleDateString('en-GB').split('/').reverse().join('.');

    if (!activityData[date]) activityData[date] = {};
    if (!activityData[date][appName]) activityData[date][appName] = 0;

    activityData[date][appName] += 5; // +5 сек

    fs.writeFileSync(DATA_FILE, JSON.stringify(activityData, null, 2));
    console.log(`[INFO] Обновлено время для ${appName}`);
  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
  }
}, 5000);

