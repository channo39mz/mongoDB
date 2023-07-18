const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://65050197:no39mzmz@cluster0.tff36tq.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // await listDatabases(client);

    // await Createdatabase(client , {
    //   name : "cha",
    //   age : 19,
    //   id : 123456789,
    //   pet : "cat"
    // })

    // await CreatedMultipleListings(client , [
    //   {
    //     name : "a",
    //     age : 23,
    //     pet : "dog",
    //     id : 14212345
    //   },
    //   {
    //     name : "b",
    //     age : 40,
    //     color : "red",
    //     id : 142515667
    //   },
    //   {
    //     name : "c",
    //     age : 99,
    //     group : 1,
    //     id : 16545646,
    //     unkonw : "???"
    //   },
    // ]);

    // await ReadData(client , "cha");

    // await UpdateDataByName(client , "cha" , {name : "a", age : 99});
    // await UpsertDataByName(client , "a" , {name : "B", age : 39});

    // await UpdateAllList(client);

    await DeletelistByName(client, "a");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function listDatabases(client){
  const databastatlist = await client.db().admin().listDatabases();
  console.log("Databases :");
  databastatlist.databases.forEach(db => {
    console.log(`- ${db.name}`);
  });
}
async function Createdatabase(client , newList){
  const result = await client.db("sample_airbnb").collection("ListingAndRevivews").insertOne(newList);

  console.log(`new listing created with the following id : ${result.insertedId}`);
}
async function CreatedMultipleListings(client , newListing){
  const result = await client.db("sample_airbnb").collection("ListingAndRevivews").insertMany(newListing);
  console.log(`${result.insertedCount} new listing create following id (s) : `)
  console.log(result.insertedIds);
}

async function ReadData(client, nameOflist){
  const result = await client.db("sample_airbnb").collection("ListingAndRevivews")
  .findOne({name : nameOflist});
  if (result){
    console.log(`find result of id '${nameOflist}'`)
    console.log(result);
  }
  else {
    console.log(`Not find result of id '${nameOflist}'`)
    console.log(result);
  }
}
async function UpdateDataByName(client , NameOfUpdatelist , UpdateList){
  const result = await client.db("sample_airbnb").collection("ListingAndRevivews").updateOne({name:NameOfUpdatelist} , {$set: UpdateList});

  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(`${result.modifiedCount} documents was/were updated`);
}

async function UpsertDataByName(client , NameOfUpdatelist , UpdateList){
  const result = await client.db("sample_airbnb").collection("ListingAndRevivews").updateOne({name:NameOfUpdatelist} , {$set: UpdateList}, {upsert : true});

  console.log(`${result.matchedCount} document(s) match the query critiria`);

  if(result.upseredCount > 0){
    console.log(`One document was inserted with the id ${result.upsertId}`);
  }
  else{
    console.log(`${result.modifiedCount} documents was/were updated`);
  }
}

async function UpdateAllList(client){
  const result = await client.db("sample_airbnb").collection("ListingAndRevivews").updateMany({
    property_type : {$exists: false}} , {$set:{property_type : "unknow"}});
    
  console.log(`${result.matchedCount} document(s) match the query critiria `);
  console.log(`${result.modifiedCount} documents was/were updated`);

}
async function DeletelistByName(client , nameOflist){
  const result = await client.db("sample_airbnb").collection("ListingAndRevivews").deleteOne({name:nameOflist})

  console.log(`${result.deletedCount} documents was/were deleted`);
}