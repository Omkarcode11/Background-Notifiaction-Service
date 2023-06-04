const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongod

module.exports.connect = async () => {
    if (!mongod) {
        mongod = await MongoMemoryServer.create()
        let uri = mongod.getUri()
        let dbConfig = {
            maxPoolSize: 10,
            useUndefineTopology: true,
        }
        mongoose.connect(uri, dbConfig)
    }
}

module.exports.closeDB = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    if (mongod) {
        await mongod.stop()
    }
}


module.exports.clearDB = async () => {
    let collections = await mongoose.connection.collections
    for (const key in collections) {
        let coll = collections[key]
        await coll.deleteMany()
    } 
}