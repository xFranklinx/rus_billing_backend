const mongoose = require('mongoose')

const mongoDB = {
  connection: null,

  connect: async function () {
    try {
      this.connection = await mongoose.connect(process.env.MONGODB_URI)

      console.log('Connected to MongoDB Atlas database!'.yellow.bold)

    } catch (err) {
      console.error(`Error when connecting to MongoDB Atlas database... ${err}`)
      process.exit(1)
    }
  }
}

module.exports = mongoDB