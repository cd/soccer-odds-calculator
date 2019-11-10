/**
 * Calculates linear regression
 * @param {Array} xArr
 * @param {Array} yArr
 * @return {object} {a, b}
 */
const getLinearRegression = function(xArr, yArr) {
  let xAvg = 0;
  let yAvg = 0;
  const xx = xArr;
  const yy = yArr;
  const xxyy = [];
  const xx2 = [];
  let xxyySum = 0;
  let xx2Sum = 0;
  if (xArr.length < 1 || xArr.length !== yArr.length) return null;
  for (let i = 0; i < xArr.length; i++) {
    xAvg = xAvg + xArr[i];
    yAvg = yAvg + yArr[i];
  }
  xAvg = xAvg / xArr.length;
  yAvg = yAvg / yArr.length;
  for (let i = 0; i < xArr.length; i++) {
    xx[i] = xArr[i] - xAvg;
    yy[i] = yArr[i] - yAvg;
    xxyy.push(xx[i] * yy[i]);
    xx2.push(xx[i] * xx[i]);
    xxyySum = xxyySum + xxyy[i];
    xx2Sum = xx2Sum + xx2[i];
  }
  const b = xxyySum / xx2Sum;
  const a = yAvg - b * xAvg;
  return { a, b };
};

/**
 * Returns an array of all team names
 * @param {Array} matches
 * @return {Array}
 */
const getTeams = matches => {
  const teams = [];
  matches.forEach(match => {
    if (!teams.includes(match.teams[0])) teams.push(match.teams[0]);
    if (!teams.includes(match.teams[1])) teams.push(match.teams[1]);
  });
  return teams;
};

/**
 * TODO
 * @param {Array} teams
 * @param {Array} matches
 * @return {Array}
 */
const getSkillTable = (teams, matches) => {
  const points = new Array(teams.length).fill(0);
  matches.forEach(match => {
    const homeIndex = teams.indexOf(match.teams[0]);
    const homeSkillPoint = match.attempts[0] / match.attempts[1];

    const awayIndex = teams.indexOf(match.teams[1]);
    const awaySkillPoint = 1 / homeSkillPoint;

    points[homeIndex] += homeSkillPoint;
    points[awayIndex] += awaySkillPoint;
  });

  return points;
};

module.exports = {
  getTeams,
  getSkillTable
};
