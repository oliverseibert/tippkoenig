const fs = require('fs');
const http = require('http');
const https = require('https');
import * as _ from 'lodash';
import app from './app';
const HTTP_PORT = _.get(process, 'env.httpPort', 14531);
const HTTPS_PORT = _.get(process, 'env.httpsPort', 4530);

try {
  // Certificate
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/xxx/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/xxx/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/xxx/chain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(HTTPS_PORT, () => {
    console.log('HTTPS Server running on port' + HTTPS_PORT);
  });
} catch (error) {
  console.log(error);
}


// Starting both http & https servers
const httpServer = http.createServer(app);

httpServer.listen(HTTP_PORT, () => {
  console.log('HTTP Server running on port ' + HTTP_PORT);
});


