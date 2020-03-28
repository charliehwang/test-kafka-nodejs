const { Kafka, logLevel } = require("kafkajs")

const kafka = new Kafka({
  clientId: "my-app3",
  brokers: ["192.168.86.17:9092"],
  logLevel: logLevel.ERROR,
})
// NOTHING, ERROR, WARN, INFO, and DEBUG. INFO
// kafka.logger().setLogLevel(logLevel.WARN)

const producer = kafka.producer()

async function sendMessage(msg) {
  await producer.connect()
  await producer.send({
    topic: "test-topic",
    messages: [{ value: msg }],
  })

  await producer.disconnect()
}

sendMessage(`I am the message. ${new Date().toISOString()}`).then(() => {
  console.log("Finished sending the message.")
})
