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
  // Stage 1: Match accounts with a balance greater than 1,500 USD
{ $match: { balance: {$gt:1000}}},
  
  {
  $sort: {balance : -1}
  },

  {
  $project: {
    _id: 0,
    account_id: 1,
    account_type: 1,
    gdp_balance: { $divide: ["$balance", 1.3] },
  },

},

  // Stage 2: Sort the documents in the collection by the balance field in descending order
  // Stage 3: Project the account_id, account_type,and balance fields and a new field called gdp_balance which divides the balance field by 1.3
];

const main = async () => {
  try {
    await client.connect()
    console.log(`Connected to the database 🌍\n ${safeURI}`)
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

