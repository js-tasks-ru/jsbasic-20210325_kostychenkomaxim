function showSalary(users, age) {
  // ваш код...
  return users.filter(user => user.age <= age).map(item => `${item.name}, ${item.balance}`).join('\n');
}
