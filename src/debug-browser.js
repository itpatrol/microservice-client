
const debug = {
  debug: function() {
    if(window.isDebug) {
      console.info.apply(console, arguments);
    }
  },
  log: window.console.log.bind(window.console),
}


export default debug