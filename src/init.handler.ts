import {HttpRequest} from "aws-sdk";
import {APIGatewayProxyResult} from "aws-lambda";
import {HandlerRes} from "./core/handler-response";
import {PG} from "./core/database";

/**
 *param: qsParams es el query paramas demo?id:1&id2:2
 * */
export const InitHandler = async (req: HttpRequest, res): Promise<APIGatewayProxyResult> => {
  const body = {message: "inicializando app"}
  return await HandlerRes.success(body)
}
/**
 *param: qsParams es el query paramas demo?id:1&id2:2
 * */
export const HelloWorldHandler = async (req: HttpRequest, res): Promise<APIGatewayProxyResult> => {
  try {
    let result = [] as any[]
    result = await PG.Instance.Query("select *from users")
    return await HandlerRes.success(result)
  } catch (e) {
    console.log("error al ", e)
    return await HandlerRes.error(e, 400)
  }
}

/**
 *param: qsParams es el query paramas demo?id:1&id2:2
 * */
export const HelloWorldHandlerByID = async (req: HttpRequest, qsParams): Promise<APIGatewayProxyResult> => {
  console.log(qsParams.id)
  const body = {message: "Hello world by ID"}
  return await HandlerRes.success(body)
}