module.exports = (() => {
  /**
   * Constructor function
   * @param {Array} teams
   */
  function Constructor(teams) {
    this.teams = teams.map(e => ({
      id: e,
      form: null,
      attemptsPerGoal: null,
      basicSkill: null,
      homeAdvantage: null,
      linRegAttempts: {
        a: null,
        b: null
      },
      linRegCounterAttempts: {
        a: null,
        b: null
      }
    }));
    this.matches = [];
  };

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
   * TODO
   * @param {Object} match
   * @return {Array}
   */
  const getMatchRating = match => {
    return [
      match.attempts[0] / match.attempts[1],
      match.attempts[1] / match.attempts[0]
    ];
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
      const matchRating = getMatchRating(match);

      const homeIndex = teams.indexOf(match.teams[0]);
      const homeSkillPoint = matchRating[0];

      const awayIndex = teams.indexOf(match.teams[1]);
      const awaySkillPoint = matchRating[1];

      points[homeIndex] += homeSkillPoint;
      points[awayIndex] += awaySkillPoint;
    });

    return points;
  };

  /**
   * Train
   * @param {Object} match Match data
   */
  // Constructor.prototype.train = match => {};

  /**
   * Predict
   * @param {Object} match Match data
   */
  // Constructor.prototype.predict = match => {};

  return Constructor;
})();
