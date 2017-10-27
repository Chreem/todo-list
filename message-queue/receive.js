const amqp = require('amqplib')
const { user, password, host } = require('./account.json')

const sleep = t => new Promise(r => setTimeout(r, t))

amqp.connect(`amqp://${user}:${password}@${host}`)
    .then(conn => conn.createChannel())
    .then(ch => {
        const q = 'hello'
        ch.assertQueue(q, { durable: false }).then(() => {
            ch.prefetch(1)
            ch.consume(q, async msg => {
                const time = parseInt(2000 + Math.random() * 2000);
                await sleep(time)
                console.log(`message => ${msg.content.toString()}  cost time => ${time}`)
                ch.ackAll()
            }, { noAck: false })
        })
    })
