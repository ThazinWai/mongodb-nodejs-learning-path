
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://myAtlasDBUser:myatlas-001@myatlasclusteredu.uae5pmk.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

const sampleAccounts = [
 {
   account_id: "MDB011235813",
   account_holder: "Ada Lovelace",
   account_type: "checking",
   balance: 60218,
 },
 {
   account_id: "MDB829000001",
   account_holder: "Muhammad ibn Musa al-Khwarizmi",
   account_type: "savings",
   balance: 267914296,
 },
]

// Document used as a filter for the find() method
const documentsToFind = { balance: { $gt: 4700 } }

// Document used as a filter for the findOne() method
//const documentToFind = { _id: ObjectId("62a3638521a9ad028fdf77a3") }

// update doc
const documentToUpdate = { account_id: "MDB011235813" }
const update = { $inc: { balance: 100} }

// delete doc
const documentToDelete = { _id: new ObjectId("66372b3acc4d054bc49b1dc9") }

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect()
    console.log(`Connected to the ${dbname} database 🌍 \nFull connection string: ${safeURI}`)
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`)
  }
}
 
const main = async () => {
 try {
    connectToDatabase()

  //  ****insertMany() method 
      //  let result = await accountsCollection.insertMany(sampleAccounts)
      //  console.log(`Inserted ${result.insertedCount} documents`)
      //  console.log(result)

  // ****find() method is used here to find documents that match the filter
      //  let result = accountsCollection.find(documentsToFind)
      //  let docCount = accountsCollection.countDocuments(documentsToFind)
      //  await result.forEach((doc) => console.log(doc))
      //  console.log(`Found ${await docCount} documents`)

  //****updateOne() method
      // let result = accountsCollection.updateOne(documentToUpdate,update)
      // result.modifiedCount === 1
      // ? console.log("Updated one document")
      // : console.log("No documents updated")

  //****deleteOne() method
      let result = accountsCollection.deleteOne(documentToDelete)
      result.deleteCount === 1
      ? console.log("Deleted one document")
      : console.log("No documents deleted")

 } catch (err) {
   console.error(`Error inserting documents: ${err}`)
 } finally {
   await client.close()
 }
}

main()
