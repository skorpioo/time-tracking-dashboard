const CurrentHours = document.querySelectorAll('h3');
const PreviousHours = document.querySelectorAll('.card-bottom p');
const dailyBtn = document.querySelector('#daily');
const weeklyBtn = document.querySelector('#weekly');
const monthlyBtn = document.querySelector('#monthly');

dailyBtn.addEventListener('click', () => updateDashboard('daily'));
weeklyBtn.addEventListener('click', () => updateDashboard('weekly'));
monthlyBtn.addEventListener('click', () => updateDashboard('monthly'));

async function updateDashboard(date) {
  try {
    const data = await fetch('./data.json');
    const records = await data.json();

    toggleActive(date);
    updateStats(records, date);
  } catch (error) {
    console.error(error);
  }
}

function toggleActive(date) {
  if (date === 'daily') {
    dailyBtn.classList.add('active');
    weeklyBtn.classList.remove('active');
    monthlyBtn.classList.remove('active');
  } else if (date === 'weekly') {
    dailyBtn.classList.remove('active');
    weeklyBtn.classList.add('active');
    monthlyBtn.classList.remove('active');
  } else {
    dailyBtn.classList.remove('active');
    weeklyBtn.classList.remove('active');
    monthlyBtn.classList.add('active');
  }
}

function updateStats(records, date) {
  records.forEach(({ timeframes }, idx) => {
    const { current, previous } = timeframes[date];

    setTimeout(function(){ 
    CurrentHours[idx].innerHTML = `${current}hr${AddRemoveS(current)}`;
    }, 100);

  setTimeout(function(){
    if (date === 'daily') {
      PreviousHours[idx].innerHTML = `Yesterday - ${previous}hr${AddRemoveS(previous)}`;
    }
    if (date === 'weekly') {
      PreviousHours[idx].innerHTML = `Last Week - ${previous}hr${AddRemoveS(previous)}`;
    }
    if (date === 'monthly') {
      PreviousHours[idx].innerHTML = `Last Month - ${previous}hr${AddRemoveS(previous)}`;
    }
    }, 100);
  });
}

function AddRemoveS(number) {
  if (number === 1) return '';
  return 's';
}