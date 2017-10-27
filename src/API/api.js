
export function getAPI () {
  return (new Promise((resolve, reject) => {
    fetch('https://itunes.apple.com/us/rss/topfreeapplications/limit=2/json', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        return resolve(responseJson);
      })
      .catch((error) => {
        return reject(error);
      });

  }));
}


export function postAPI (body) {
  return (new Promise((resolve, reject) => {
    // setTimeout(() => {
    //   return resolve(people)
    // }, 3000)

    fetch('https://itunes.apple.com/us/rss/topfreeapplications/limit=1/json', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => response.json())
      .then((responseJson) => {
        return resolve(responseJson);
      })
      .catch((error) => {
        return reject(error);
      });

  }));
}