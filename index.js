const express = require('express');
const activeWin = require('active-win');
const fs = require('fs');
const path = require('path');
const AutoLaunch = require('auto-launch');

//local file
const DATA_FILE = './activity.json';

//XD
const myApp = new AutoLaunch({
  name: 'TimeTracker',
  isHidden: true,
  path: process.execPath,  
});

myApp.isEnabled()
  .then((isEnabled) => {
    if (!isEnabled) {
      myApp.enable();
    }
  })
  .catch((err) => console.error('[ERROR] Auto-launch error', err));


let activityData = {};
if (fs.existsSync(DATA_FILE)) {
  activityData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

// create server
const app = express();
const PORT = 10;

//static file  
app.use(express.static(path.join(__dirname, 'public')));


app.get('/api/activity', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
    const activityData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(activityData);
  } else {
    res.json({});
  }
});


setInterval(async () => {
  try {
    const windowInfo = await activeWin();
    const appName = windowInfo?.owner?.name || 'Unknown';

    // DD.MM
    const date = new Date().toLocaleDateString('en-GB').split('/').reverse().join('.');

    
    if (!activityData[date]) activityData[date] = {};
    if (!activityData[date][appName]) activityData[date][appName] = 0;

    // update in 5 second
    activityData[date][appName] += 5;

    // save in local file
    fs.writeFileSync(DATA_FILE, JSON.stringify(activityData, null, 2));
    console.log(`[INFO] Обновлено время для ${appName}`);
  } catch (error) {
    console.error(`[ERROR] ${error.message}`);
  }
}, 5000); // interval 5 second

// start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
