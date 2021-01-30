/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { animals, employees, hours, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return ids.map(animalId => animals.find(({ id }) => id === animalId));
}

function animalsOlderThan(animal, age) {
  return animals.find(({ name }) => name === animal)
  .residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  return employeeName ? employees.find(employee =>
  Object.values(employee).includes(employeeName)) : {};
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some(({ managers }) => managers.some(managerid => managerid === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
  const animalObj = {};
  animals.forEach(({ name, residents }) => (animalObj[name] = residents.length));
  return species ? animalObj[species] : animalObj;
}

function entryCalculator(entrants) {
  return entrants ? Object.keys(entrants).reduce((sum, ageGroup) =>
  (sum += entrants[ageGroup] * prices[ageGroup]), 0) : 0;
}

function animalMap(options) {
  const { includeNames = false, sex, sorted = false } = options || {};
  const locations = ['NE', 'NW', 'SE', 'SW'];
  const animalsObj = {};

  const animalsByLocation = position => animals
  .filter(({ location }) => location === position);

  locations.forEach((location) => {
    if (!includeNames) {
      animalsObj[location] = animalsByLocation(location).map(({ name }) => name);
    }
    if (includeNames) {
      animalsObj[location] = animalsByLocation(location)
      .map(({ name, residents }) => ({ [name]: residents
        .filter(animal => animal.sex === sex || !sex)
        .map(resident => resident.name) }));
    }
    if (includeNames && sorted) {
      animalsObj[location] = animalsByLocation(location)
      .map(({ name, residents }) => ({ [name]: residents
        .filter(animal => animal.sex === sex || !sex)
        .map(resident => resident.name).sort() }));
    }
  });
  return animalsObj;
}

function schedule(dayName) {
  const schedObj = {};
  Object.keys(hours).forEach(day => ((hours[day].open !== hours[day].close) ?
  (schedObj[day] = `Open from ${hours[day].open}am until ${hours[day].close - 12}pm`)
  : (schedObj[day] = 'CLOSED')));
  return dayName ? { [dayName]: schedObj[dayName] } : schedObj;
}

function oldestFromFirstSpecies(id) {
  const specieId = employees.find(employee => employee.id === id).responsibleFor[0];
  const specieObj = animals.find(animal => animal.id === specieId).residents;
  const oldest = specieObj.reduce((older, resid) => (older.age < resid.age ? resid : older));
  return Object.values(oldest);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach(key =>
  (prices[key] = Math.ceil(prices[key] * (percentage + 100)) / 100));
  return prices;
}

function employeeCoverage(idOrName) {
  const result = {};
  const employee = idOrName ? [employeeByName(idOrName)] : employees;
  employee.forEach(({ firstName, lastName, responsibleFor }) =>
  (result[`${firstName} ${lastName}`] = animalsByIds(...responsibleFor).map(({ name }) => name)));
  return result;
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
