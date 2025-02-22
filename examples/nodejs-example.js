import MicroserviceClient from './MicroserviceClient';
window.isDebug = false;

const client = new MicroserviceClient({
  URL: 'http://api.eh1.ca:8080',
  accessToken: '502b0c35389db789243f1dc40dbe7a780d4a92248371e530',
});

const res = await client.search('users', { query: {}, limit: 10 });
console.log(res);

const div = document.getElementById('app');

div.innerHTML += JSON.stringify(res, null, 2);
