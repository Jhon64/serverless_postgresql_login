import {APIGatewayProxyResult, Handler} from "aws-lambda";

import {router} from './router'
import {HandlerRes} from "./core/handler-response";


/**punto de entrada de los lambdas*/
export const handler: Handler = async (event, context, callback): Promise<APIGatewayProxyResult> => {
  try {
    globalThis.initTimeExec = Date.now() //miliseconds
    // globalThis.initTimeExec = Math.floor(Date.now()/1000)
    console.log('ejecutando MAIN...')
    // console.log('globalThis',globalThis)
    const METHOD = event.requestContext.http.method || '-'
    const PATH = event.rawPath || '/'
    console.log({METHOD, PATH})
    let handlerRequest: any = {
      statusCode: 100, //valor por default
      body: JSON.stringify({message: 'ruta no encontrada'})
    }

    const _routesString = Object.keys(router)
    for (let _route of _routesString) {
      const _stringArray = _route.split('.')
      if (_stringArray.length == 1) {//is main
        _stringArray.push('')
      }
      const [method, nameUrl] = _stringArray
      // console.log(nameUrl, PATH)
      // console.log(method, METHOD)
      if (('/api/' + nameUrl) == (PATH) && (method.toLowerCase()).includes((METHOD.toLowerCase()))) {
        globalThis.handlerSelected = _route
        const _functionHandler = await router[_route]
        handlerRequest = _functionHandler(event, event.queryStringParameters, callback);

      }
      if ('/api' == PATH && nameUrl == '') {
        globalThis.handlerSelected = _route
        const _functionHandler = await router[_route]
        handlerRequest = _functionHandler(event, context, callback);
      }
    }
    if (handlerRequest.statusCode == 100) {
      throw "Ruta no encontrada"
    }

    // return handlerRequest
    return await handlerRequest

  } catch (e) {
    console.log(e)
    const body = {message: e}
    return await HandlerRes.error(body)
  }
}