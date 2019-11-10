const calculator = require('./index.js');

const matches = [
  {
    teams: ['BVB', 'Bayern'],
    attempts: [9, 18]
  },
  {
    teams: ['BVB', 'Freiburg'],
    attempts: [16, 4]
  },
  {
    teams: ['Bayern', 'Freiburg'],
    attempts: [16, 2]
  }
];

const teams = calculator.getTeams(matches);

console.log(teams);

const skillTable = calculator.getSkillTable(teams, matches);

console.log(skillTable);
