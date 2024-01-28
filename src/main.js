window.isDebug = false;
import MicroserviceClient from "./MicroserviceClient"

var client = new MicroserviceClient({
  URL: "https://api.wrls.incomrealestate.com",
  accessToken: "9ac7fbf39ea54820d75bebf3be9efe967ad068573ca9d5a5"
})

var res = await client.search("users", {query:{}, limit:10})
console.log(res)

var div = document.getElementById('app');

div.innerHTML += JSON.stringify(res, null, 2)