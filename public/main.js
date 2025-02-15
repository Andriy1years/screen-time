
 function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  async function fetchActivityData() {
    const response = await fetch('/api/activity');
    const data = await response.json();
    const activityContainer = document.getElementById('activity-data');
    const monthlySummary = document.getElementById('monthly-summary');
    activityContainer.innerHTML = '';
    let totalMonthTime = 0; 

    
    for (const date in data) {
      const dateSection = document.createElement('div');
      dateSection.classList.add('date-section');

      const dateHeader = document.createElement('h2');
      dateHeader.innerText = date;
      dateSection.appendChild(dateHeader);

      let totalDayTime = 0; 
      const table = document.createElement('table');
      const tableHeader = document.createElement('thead');
      tableHeader.innerHTML = '<tr><th>Application</th><th>Time</th></tr>';
      table.appendChild(tableHeader);
    
    
      const tableBody = document.createElement('tbody');
      for (const app in data[date]) {
        const row = document.createElement('tr');
        const appTime = data[date][app];
        totalDayTime += appTime;
        if (appTime >= 120) {
        row.innerHTML = `<td>${app}</td><td>${formatTime(appTime)}</td>`;
        tableBody.appendChild(row);
        }
      }
      table.appendChild(tableBody);
      dateSection.appendChild(table);

      
      totalMonthTime += totalDayTime;

      
      const daySummary = document.createElement('div');
      daySummary.classList.add('date-summary');
      daySummary.innerText = `Total time for ${date}: ${formatTime(totalDayTime)}`;
      dateSection.appendChild(daySummary);

      activityContainer.appendChild(dateSection);
    }

    
    monthlySummary.innerText = `Total time for this month: ${formatTime(totalMonthTime)}`;
  }

  fetchActivityData();