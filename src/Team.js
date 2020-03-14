module.exports = (() => {
  /**
   * Constructor function
   * @param {String} id
   * @param {Array} matches
   */
  function Constructor(id, matches) {
    this.id = id;
    this.matches = matches;
  }

  const getLinearRegression = (xArr, yArr) => {
    const xx = xArr;
    const yy = yArr;
    let xAvg = 0;
    let yAvg = 0;
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

  Constructor.prototype.getGoalRate = function() {
    const matches = this.matches.slice(-20);
    const attemps = matches
      .map(e => e.attemps)
      .reduce((acc, cur) => (acc += cur));
    const goals = matches.map(e => e.goals).reduce((acc, cur) => (acc += cur));
    return attemps / (goals || 1);
  };

  Constructor.prototype.getGoalFunction = function() {
    const relevantMatches = this.matches.slice(-5);
    const attempsPerGoal = this.getGoalRate();
    const teams = [
      {
        name: this.id,
        pos: 0
      }
    ];
    relevantMatches.forEach(match => {
      teams.push({
        name: match.teams[1],
        pos: match.chances[1] - match.chances[0]
      });
      // todo: remove/merge duplicates
    });
    const linRegAttemps = this.getLinearRegression(
      teams.map(e => e.pos),
      relevantMatches.map(e => e.attemps / attempsPerGoal)
    );
    return { linRegAttemps };
  };

  Constructor.prototype.getHomeAdvantage = function() {
    const teams = [
      {
        name: this.id,
        pos: 0
      }
    ];
    this.matches.forEach(match => {
      teams.push({
        name: match.teams[1],
        pos: match.chances[1] - match.chances[0]
      });
      // todo: remove/merge duplicates
    });
    return teams;
  };

  return Constructor;
})();
