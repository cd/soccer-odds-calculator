const { Team } = require('./index.js');

const matches = [
  {
    name: 'bayern',
    attemps: 10,
    counterAttemps: 3,
    goals: 2,
    counterGoals: 1,
    homeAdvantage: false
  },
  {
    name: 'teamA',
    attemps: 10,
    counterAttemps: 3,
    goals: 2,
    counterGoals: 1,
    homeAdvantage: false
  },
  {
    name: 'teamB',
    attemps: 10,
    counterAttemps: 3,
    goals: 2,
    counterGoals: 1,
    homeAdvantage: false
  }
];

const bvb = new Team('bvb', matches);

console.log(bvb.getGoalRate());
// console.log(bvb.getGoalFunction());
// console.log(bvb.getHomeAdvantage());
