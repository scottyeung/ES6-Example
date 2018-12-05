const history = [
  {
    event: "MOT",
    date: "2018-03-10T00:00:00.000Z",
    data: {
      mileage: 69383,
      passed: true
    }
  },
  {
    event: "MOT",
    date: "2017-03-10T00:00:00.000Z",
    data: {
      mileage: 58385,
      passed: true
    }
  },
  {
    event: "MOT",
    date: "2016-04-10T00:00:00.000Z",
    data: {
      mileage: 46275,
      passed: true
    }
  },
  {
    event: "MOT",
    date: "2016-04-10T00:00:00.000Z",
    data: {
      mileage: 46275,
      passed: false
    }
  },
  {
    event: "MOT",
    date: "2015-04-10T00:00:00.000Z",
    data: {
      mileage: 37375,
      passed: true
    }
  },
  {
    event: "MOT",
    date: "2014-04-10T00:00:00.000Z",
    data: {
      mileage: 28646,
      passed: true
    }
  }
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const events = history.filter(el => {
  return el.data.passed === true;
});

let today = new Date();
let lastCheckedDate = new Date(events[0].date);

// Calculate average annual mileage

function yearlyMileage() {
  let mileageDiff = events
    .map(function(currentMOT, i, el) {
      if (el[i + 1]) return currentMOT.data.mileage - el[i + 1].data.mileage;
    })
    .filter(mileage => typeof mileage === "number");

  return Math.floor(
    mileageDiff.reduce((accum, current) => accum + current, 0) /
      mileageDiff.length
  );
}

// Calculate current mileage

function currentMileage() {
  let elapsedDateRatio = (today - lastCheckedDate) / 24 / 3600 / 1000 / 365;
  return Math.floor(
    events[0].data.mileage + yearlyMileage() * elapsedDateRatio
  );
}

// Final result

let result = `Average annual mileage: ${yearlyMileage()} \nCurrent mileage: ${currentMileage()} (since ${
  monthNames[lastCheckedDate.getMonth()]
} ${lastCheckedDate.getFullYear()})`;

document.getElementById("result").innerText = result;
