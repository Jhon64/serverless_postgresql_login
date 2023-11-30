import * as InitHandler from './init.handler'
import {Handler} from "aws-lambda";

export const router: { [key: string]: Handler } = {
  "GET": InitHandler.InitHandler,
  "GET.hello-world": InitHandler.HelloWorldHandler,
  "GET.hello-world-2": InitHandler.HelloWorldHandlerByID
}