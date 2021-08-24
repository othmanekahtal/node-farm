module.exports = (template, element) => {
    let output = template.replace(/{%IMAGE%}/g, element.image)
    output = output.replace(/{%PRICE%}/g, element.price)
    output = output.replace(/{%ID%}/g, element.id)
    output = output.replace(/{%QUANTITY%}/g, element.quantity)
    output = output.replace(/{%PRODUCT__NAME%}/g, element.productName)
    output = output.replace(/{%FROM%}/g, element.from)
    output = output.replace(/{%NUTRIENTS%}/g, element.nutrients)
    output = output.replace(/{%DESCRIPTION%}/g, element.description)
    if (!element.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    } else {
        output = output.replace(/{%NOT_ORGANIC%}/g, '')
    }
    return output
}