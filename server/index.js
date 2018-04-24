import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import {resolve} from 'path'
import {router} from './middlewares/router'

let config = require('../nuxt.config.js')
config.dev = !(process.env == 'production');

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const r = path => resolve(__dirname,path);

class Server {
    constructor(){
    	this.app = new Koa();
        router(this.app);
    }

    async start(){
        const nuxt = await new Nuxt(config)

        if (config.dev) {
            try{
                await new Builder(nuxt).build();
            }catch(e){
                console.error(e);
                process.exit(1);
            }
        }

        this.app.use(async(ctx,next) => {
            ctx.status = 200;
            return new Promise((resolve, reject) => {
                nuxt.render(ctx.req, ctx.res, promise => {
                    promise.then(resolve).catch(reject)
                })
            })
        })

        this.app.listen(port, host);
        console.log('Server listening on ' + host + ':' + port);
    }

}

const app = new Server();
app.start();
