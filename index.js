'use strict'

const { MongoClient } = require('mongodb')
const [,, ...Args] = process.argv

// Address mongo server linked to test db
const MONGODB_URL = 'mongodb://localhost:27017/test'

const name = RegExp(`^${Args.join(' ')}`, 'i')

// EXAMPLE 4
// Searching for a restaurant name (incomplete and insensitive to case)
MongoClient
	.connect(MONGODB_URL)
	.then(db => {
		// Inserting a document -- find() is asynch operation
		db.collection('restaurants')
			// ES6 name is an enhanced object literal
			.find({name})
			.sort({name: 1})
			.forEach(restaurants => {
				if (restaurants.name) {
					console.log(restaurants.name)
				}	
			},
				() => db.close()
			)					
	})
	// If server does not connect
	.catch(console.error)


// EXAMPLE 3 - forEach recieves it in chunks (forEach method on cursor)
// MongoClient
// 	.connect(MONGODB_URL)
// 	.then(db => {
// 		// Inserting a document -- find() is asynch operation
// 		db.collection('restaurants')
// 			.find()
// 			.forEach(restaurants => {
// 				console.log(restaurants)
// 			},
// 				() => db.close()
// 			)					
// 	})
// 	// If server does not connect
// 	.catch(console.error)

	
// EXAMPLE 2 with promise (mongo 2.2 api)
// MongoClient
// 	.connect(MONGODB_URL)
// 	.then(db => {
// 		// Inserting a document -- find() is asynch operation
// 		db.collection('restaurants')
// 			.find()
// 			.toArray()
// 			.then(restaurants => {
// 				console.log(restaurants)
// 				db.close()
// 			})	
// 			.catch(console.error)
// 	})
// 	// If server does not connect
// 	.catch(console.error)


// EXAMPLE 1
// Asynch request - needs cb
// MongoClient.connect(MONGODB_URL, (err, db) => {
// 	// Logging a db object
// 	console.log(db)
// 	// Explicitly closes connection
// 	db.close()
// })


