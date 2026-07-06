import {StatusCodes} from 'http-status-codes'
import AppError from './app.error.js'

export default class UnAuthorize extends AppError {
    constructor(message,details=''){
        super(message,StatusCodes.UNAUTHORIZED,details)
    }
}