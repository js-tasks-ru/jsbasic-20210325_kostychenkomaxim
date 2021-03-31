function makeFriendsList(friends) {
  // ваш код...
  const usersList = document.createElement('ul');
  friends.map(user => {
    const userItem = document.createElement('li');
    userItem.innerHTML = `${user.firstName} ${user.lastName}`;
    usersList.appendChild(userItem);
  });
  return usersList;
}
