module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'airfryer-test'
    },
    binary: {
      version: '4.0.2',
      skipMD5: true
    },
    autostart: false
  }
}