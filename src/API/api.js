
import checkStatus from './checkStatus';

const BASE_URL = 'http://139.59.76.14:4001';

export function getAPI (url) {
  return (new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        if (Object.keys(responseJson).length > 0) {
          return resolve(responseJson);  
        }
        return reject(new Error('No data available'));
      })
      .catch((error) => {
        return reject(error);
      });

  }));
}


export function postAPI (url ,body) {
  return (new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${url}`, {
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

export function putAPI (url ,body) {
  return (new Promise((resolve, reject) => {
    fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
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
