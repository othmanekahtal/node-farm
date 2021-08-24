const http = require('http')
const url = require('url')
const fs = require('fs')
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const products = JSON.parse(data)
const card = fs.readFileSync('./templates/card-template.html', 'utf-8');
const overview = fs.readFileSync('./templates/overview-template.html', 'utf-8');
const product = fs.readFileSync('./templates/product-template.html', 'utf-8');


const replacePlaceHolder =require('./modules/replaceplaceholder');


http.createServer((request, response) => {
    const {query, pathname} = url.parse(request.url, true);
    if (pathname === '/' || pathname === '/overview') {

        response.writeHead(201, {
            'Content-type': 'text/html'
        })

        const cards = products.map((element) => replacePlaceHolder(card, element)).join('');
        const output = overview.replace('{%CARDS__PRODUCT%}', cards)

        return response.end(output)

    } else if (pathname === '/product') {

        response.writeHead(201, {
            'Content-type': 'text/html'
        })
        // return response.end(JSON.stringify(products.filter(element=> element.id === +query.id)))
        let productHTML = replacePlaceHolder(product, ...products.filter(element => element.id === +query.id))
        return response.end(productHTML)
    } else {
        response.writeHead(404, {
            'Content-type': 'text/html'
        })
        response.end('Error 404 page is not found!')
    }
}).listen(1337, '127.0.0.1', () => console.log('127.0.0.1:1337/'))