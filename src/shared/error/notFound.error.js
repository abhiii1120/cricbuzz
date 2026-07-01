import { StatusCodes } from "http-status-codes";
import AppError from "./app.error.js";

export default class notFound extends AppError{
    constructor(message,details=''){
        super(message,StatusCodes.NOT_FOUND,details);
    }
}