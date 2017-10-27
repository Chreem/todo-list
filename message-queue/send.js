const amqp = require('amqplib')

amqp.connect('amqp://localhost')
    .then(conn => conn.createChannel())
    .then(ch => {
        const q = 'hello';
        ch.assertQueue(q, { durable: false });

        let count = 1;
        setInterval(() => {
            ch.sendToQueue(q, new Buffer('hello world' + count));
            console.log('send ' + count++)
        }, 1000)

        for (let i = 0; i < 5; i++) {
            ch.sendToQueue(q, new Buffer('hello world' + count), { persistent: true });
            console.log('send ' + count++)
        }
    });
