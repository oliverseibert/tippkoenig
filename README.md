# tippkoenig

## Server Installation

### MongoDB

Installation:
https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-debian-8

Getting Started:
mongo
use tippkoenig
db.registries.save({_id:"1",showFullscreenAdIOS:true,showFullscreenAdAndroid:true,showBannerAdIOS:true,showBannerAdAndroid:true,showFullscreenAdCounter:15})
db.createUser({user: "tippkoenigUser", pwd: "jf984ntf#", roles: [{role: "readWrite", db: "tippkoenig"}]});
db.createUser({user: "tippkoenigAdmin", pwd: "e94n94nr#", roles: [{role: "dbAdmin", db: "tippkoenig"}]});

### Node

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-debian-8

HTTPS:
https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca

**Environment**
Create file .env (copy from .env.example) and fill it

**Start Server**
npm run dev
check with postman (dev): http://localhost:14531/registry