function makeFriendsList(friends) {
  const uList = document.createElement('ul');
  friends.forEach(friend => {
    const list = document.createElement('li');
    list.textContent = `${friend.firstName} ${friend.lastName}`;
    uList.appendChild(list);
  });
  return uList;
}