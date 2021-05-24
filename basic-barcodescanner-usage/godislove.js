import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyDmmqwHW-BLJWj7XNdFABh0AAztkN4afFg",
  authDomain: "kiki-e94b5.firebaseapp.com",
  databaseURL: "https://kiki-e94b5-default-rtdb.firebaseio.com",
  projectId: "kiki-e94b5",
  storageBucket: "kiki-e94b5.appspot.com",
  messagingSenderId: "590427830484",
  appId: "1:590427830484:web:dfbda3e6ac1c72e8e82341",
  measurementId: "G-48527L3DPC"
};
if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

import { AsyncStorage } from 'react-native';
export function getVersion() {
  return 1;
}
export function database(path, value) {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  let newdate = year + '-' + month + '-' + day;
  getData('data/' + newdate + '/' + path + '/', (data) => {
    let past = 0;
    if (data != null) {
      past = data;
    }

    update('data/' + newdate + '/' + path + '/', value + past, () => {});
  });
}
export function adcost(config, path, money) {
  config = config.adcost;

  let adcost = config.calc / money;

  if (adcost < config.min) {
    adcost = config.min;
  } else if (adcost > config.max) {
    adcost = config.max;
  }
  return Math.round(adcost);
}
export function updateUser(user, path, type, value, call) {
  let newvalue =
    type == 'ADD' ? user.live[path] + value : user.live[path] - value;

  update(
    'users/' + user.normal.type + '/' + user.normal.uid + '/main/live/' + path,
    newvalue,
    function (data) {
      call();
    }
  );
}
export function updateUserAll(user, value, call) {
  update(
    'users/' + user.normal.type + '/' + user.normal.uid + '/main/live/',
    value,
    function (data) {
      call();
    }
  );
}
export function back(godislove, user, value, call) {
  push(
    'users/guest/' + user.normal.uid + '/back/reklams/',
    value,
    function (data) {
      call();
    }
  );
}
export function getTime() {
  let d = new Date();

  return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
}

export function addUser(email, pass, call) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .then((data) => {
      call({ status: true, data: data });
    })
    .catch((error) => {
      call({ status: false, data: error.message });
    });
}

export function getData(path, call) {
  firebase
    .database()
    .ref(path)
    .once('value', function (snapshotgodislove) {
      call(snapshotgodislove.val());
    });
}
export function push(path, data, call) {
  firebase
    .database()
    .ref(path)
    .push(data)
    .then((snap) => {
      call(snap.key);
    });
}

export function watch(path, call) {
  firebase
    .database()
    .ref(path)
    .on('value', function (snapshotgodislove) {
      call(snapshotgodislove.val());
    });
}
export function update(path, value, call) {
  firebase.database().ref(path).set(value).then(call);
}
export function del(path, value, call) {
  firebase.database().ref(path).remove().then(call);
}
export function update2(newPhoto, call) {
  firebase.database().ref().update(newPhoto).then(call);
}
function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
export async function checklogin() {
  let res = false,
    data = null;
  try {
    let value = await AsyncStorage.getItem('godislove');
   value = JSON.stringify({ uid: 'nahom' });
    if (value !== null) {
      if (isJson(value)) {
        res = true;
        data = JSON.parse(value);
      }
    }
  } catch (error) {
    // Error retrieving data
  }
  return { status: res, data: data };
}
export async function getlang() {
  let res = false,
    data = null,
    value2 = null;
  try {
    const value = await AsyncStorage.getItem('lang');
    value2 = await AsyncStorage.getItem('introcheck');
    if (value !== null) {
      if (isJson(value)) {
        res = true;
        data = JSON.parse(value);
      }
    }
  } catch (error) {
    // Error retrieving data
  }
  return { status: res, data: data, intro: value2 };
}
export async function localSave(item) {
  let res = false;
  try {
    await AsyncStorage.setItem('godislove', item);
    res = true;
  } catch (error) {
    // Error saving data
  }
  return res;
}
