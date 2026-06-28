import pino from 'pino';
import env from './env.js'
export default pino({
    level:'info',
    transport:{
        target:"pino-pretty",
    }
})