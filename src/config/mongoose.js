/**
 * @file This module contains the configuration for the Mongoose ODM.
 * @module mongoose
 * @author Mats Loock
 */

import mongoose from 'mongoose'

/**
 * Establishes a connection to a database.
 *
 * @param {string} connectionString - The connection string.
 * @param {object} [options] - Optional mongoose connect options (for example { dbName: 'store' }).
 * @returns {Promise<mongoose.Mongoose>} Resolves to a Mongoose instance if connection succeeded.
 */
export const connectToDatabase = async (connectionString, options = {}) => {
  const { connection } = mongoose

  // Will cause errors to be produced instead of dropping the bad data.
  mongoose.set('strict', 'throw')

  // Turn on strict mode for query filters.
  mongoose.set('strictQuery', true)

  // Bind connection to events (to get notifications).
  connection.on('connected', () => console.log('Mongoose connected to MongoDB.'))
  connection.on('error', (err) => console.error(`Mongoose connection error: ${err}`))
  connection.on('disconnected', () => console.log('Mongoose disconnected from MongoDB.'))

  // If the Node.js process ends, close the connection.
  for (const signalEvent of ['SIGINT', 'SIGTERM']) {
    process.on(signalEvent, () => {
      (async () => {
        await connection.close()
        console.log(`Mongoose disconnected from MongoDB through ${signalEvent}.`)
        process.exit(0)
      })()
    })
  }

  // Connect to the server. Forward any provided options (e.g. dbName) so the
  // caller can override the database used when the connection string does
  // not include an explicit database segment.
  console.log('Mongoose connecting to MongoDB.')
  return mongoose.connect(connectionString, options)
}
