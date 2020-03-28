const { Kafka } = require("kafkajs")
const { v1: uuidv1 } = require("uuid")

const kafka = new Kafka({
  // clientId: "my-app2",
  clientId: uuidv1(),
  brokers: ["192.168.86.17:9092"],
})

// const consumer = kafka.consumer({ groupId: "test-group" })
const consumer = kafka.consumer({ groupId: uuidv1() })

async function getMessages() {
  await consumer.connect()
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  })
}

getMessages()
