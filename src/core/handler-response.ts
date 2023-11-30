import {differenceInSeconds} from 'date-fns'
import {APIGatewayProxyResult} from "aws-lambda";

export namespace HandlerRes {
  export const success = async (body: any, status?: number, headers?: any,): Promise<APIGatewayProxyResult> => {

    console.log(`handler exec : ${globalThis.handlerSelected}`)
    const dateFinish = Date.now()
    // console.log(`dateFinish:${dateFinish}`)
    console.log(`tiempo transcurrido: ${dateFinish - (globalThis.initTimeExec || dateFinish)} miliseconds`)
    let parseBody = ''
    if (typeof body == 'string') {
      parseBody = body
    } else if (typeof body == 'number' || typeof body == 'boolean' || typeof body == 'bigint')
      parseBody = body + ''
    else if (typeof body == 'object')
      parseBody = JSON.stringify({
        status: status || 200, body,
      })

    console.log("response body::", body)

    return {
      statusCode: status || 200,
      body: parseBody,
      headers: headers || {"content-type": "application/json; charset=utf-8"}
    }
  }
  export const error = async (body: any, status?: number): Promise<APIGatewayProxyResult> => {
    console.log(`handler exec : ${globalThis.handlerSelected}`)
    const dateFinish = new Date()
    console.log(`tiempo transcurrido: ${differenceInSeconds(dateFinish, globalThis.handlerSelected)}`)
    let parseBody = ''
    if (typeof body == 'string') {
      parseBody = body
    } else if (typeof body == 'object')
      parseBody = JSON.stringify(body)

    return {
      statusCode: status || 500, body: parseBody, headers: {"content-type": "application/json; charset=utf-8"}
    }
  }
}