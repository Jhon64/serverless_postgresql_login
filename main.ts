import {app} from './src/main.handler'
function main() {
    console.log("inicianlizando app::ass")
    app.listen(5000, function (port = 5000) {
        console.log("http://localhost:5000", ' server')
    })
}
main()