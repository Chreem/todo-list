const fs = require('fs')
    , dns = require('dns')
    ;

let data = fs.readFileSync('./search-domain.txt')
let result = []
data = data.toString().split('\r\n')
data.forEach(domain => {
    if (domain.split('.').length <= 1) return;
    dns.resolve4(domain, (err, add) => {
        // result.push({ domain, address: err ? '' : add })
        fs.appendFileSync('./result.txt', domain + ';' + add + '\r\n')
        dns.reverse(add[0], (err, host) => {
            console.log(domain, add[0], host)
        })
    })
})
