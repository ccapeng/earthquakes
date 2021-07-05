import app, {routers} from './app.js';
import { settings } from './settings.js';

const server = app.listen(settings.PORT, () => {
  let host = settings.HOST + ":" + settings.PORT;
  console.log("server:", host);
  for (let router of routers) {
    router.stack.forEach(function(r){
      if (r.route && r.route.path){
        console.log(`Route: ${host}${r.route.path}`)
      }
    });
  }
});

export default server;