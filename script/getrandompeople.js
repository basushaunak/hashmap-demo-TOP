export async function getRandomPeople(count) {
  const response = await fetch(`https://randomuser.me/api/?results=${count}`);
  const data = await response.json();

  return data.results.map(person => ({
    key: `${person.name.last} ${person.name.first}`,
    value: Math.floor(Math.random() * 60) + 21
  }));
}
