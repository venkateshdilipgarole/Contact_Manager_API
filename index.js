
import express from "express";
import { MongoClient } from "mongodb";
import "dotenv/config";


const app = express();


// Middleware for parsing JSON request bodies
app.use(express.json());


const PORT = process.env.PORT || 3000;


// Connection URL
const url = process.env.MONGO_URL;


const client = new MongoClient(url);


async function ConnectDB() {
    try {
      await client.connect();
      console.log("✔✔ Connected to the database ✔✔");
      return client;
    } catch (error) {
      if (error instanceof MongoServerError) {
        console.log(`Error worth logging: ${error}`); // special case for some reason
      }
      throw error; // still want to crash
    }
  }
  
  
  await ConnectDB();
  


// home get method
const contacts = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
];

app.get('/contacts', (req, res) => {
  res.send(contacts);
});





//call back function to our app for feedback
app.listen(PORT, () => {
  console.log("Server running on port 3000 🎉🎉🎉");
});
