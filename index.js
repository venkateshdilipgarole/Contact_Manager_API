import express from "express";
import { MongoClient } from "mongodb";
import "dotenv/config";
import bodyParser from "body-parser";




const app = express();
app.use(bodyParser.json());

let contacts = [];
let currentId = 1;

// Create a Contact
app.post('/contacts', (req, res) => {
  const newContact = {
    id: currentId++,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Get All Contacts
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// Get a Single Contact
app.get('/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id == req.params.id);
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.json(contact);
});

// Update a Contact
app.put('/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id == req.params.id);
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.phone = req.body.phone;
  res.json(contact);
});

// Delete a Contact
app.delete('/contacts/:id', (req, res) => {
  contacts = contacts.filter(c => c.id != req.params.id);
  res.json({ message: 'Contact deleted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
