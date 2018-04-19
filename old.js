const profile = buildURL(`/me`);
fetch(profile).then(response => {
  response.json().then(json => {
    const friends = buildURL(`/${json.id}/friends`);
    fetch(friends).then(response => {
      response.json().then(json => {
        const birthdays = [];
        const friendsList = json.data;
        const friendsWillBeOk = friendsList.map(myFriend => {
          const friend = buildURL(`/${myFriend.id}?fields=name,birthday`);
          return fetch(friend).then(response => {
            response.json().then(response => {
              birthdays.push({
                name: response.name,
                birthday: response.birthday
              });
            });
          });
        });

        promiseMeAllMy(friendsWillBeOk).then(() => {
          birthdays.map(birthday => {
            console.log(birthday);
          });
        }).catch(error => {
          console.error(error);
        });
      });
    });
  });
}).catch(error => {
  console.error(error);
});
