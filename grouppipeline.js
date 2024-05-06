const { MongoClient,ServerApiVersion,ObjectId } = require("mongodb");

const uri = "mongodb+srv://myAtlasDBUser:myatlas-001@myatlasclusteredu.uae5pmk.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  } 
});

const dbname = "bank";
const collection_name = "accounts";
const accountsCollection = client.db(dbname).collection(collection_name);



const pipeline = [
  // Stage 1: Get the accounts with a balance less than $1,000
  { $match: { balance: { $lt: 1000 } } },

  // Stage 2: Calculate average balance and total balance
  { $group: { _id: "$account_type", avg_balance: { $avg: "$balance" } } },
]

const main = async () => {
  try {
    await client.connect()
    console.log(`Connected to the database 🌍. \nFull connection string: ${safeURI}`)
    let accounts = client.db("bank").collection("accounts")
    let result = await accountsCollection.aggregate(pipeline)
    for await (const doc of result) {
      console.log(doc)
    }
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`)
  } finally {
    await client.close()
  }
}

main()
