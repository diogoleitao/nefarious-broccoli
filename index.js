const API_BASE = 'https://graph.facebook.com';
const API_VERSION = 'v2.12';

const ACCESS_TOKEN = window.ACCESS_TOKEN;

const buildURL = path => {
  return `${API_BASE}${path}?access_token=${ACCESS_TOKEN}&format=json&method=get`;
}

const fetchMyId = () => {
  return new Promise((resolve, reject) => {
    const profile = buildURL('/me');
    fetch(profile).then(r => {
      r.json().then(json => {
        resolve(json.id);
      });
    });
  });
}

const fetchFriends = id => {
  return new Promise((resolve, reject) => {
    const friends = buildURL(`/${json.id}/friends`);
    fetch(friends).then(r => {
      r.json().then(json => {
        resolve(json.data);
      });
    });
  });
}

const fetchAllFriendsBirthdays = friends => {
  const birthdays = [];
  const friendsList = friends.data;
  const fetchAllBirthdays = friendsList.map(myFriend => {
    const friend = buildURL(`/${myFriend.id}?fields=name,birthday`);
    return fetch(friend).then(response => {
      response.json().then(response => {
        birthdays.push({
          who: response.name,
          when: response.birthday
        });
      });
    });
  });

  return Promise.all(fetchAllBirthdays).then(() => birthdays);
}

const logBirthdays = birthdays => {
  birthdays.each(birthday => {
    console.log(`${birthday.who}: ${birthday.when}`);
  });
}

export default getAllFriendsBirthdays = () => {
  fetchMyId()
    .then(id => fetchFriends(id))
    .then(friends => fetchAllFriendsBirthdays(friends))
    .then(birthdays => logBirthdays(birthdays))
    .catch(error => {
      console.error(error);
    });
}
