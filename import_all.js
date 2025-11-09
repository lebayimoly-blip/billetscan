const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect("mongodb+srv://MolyLEBAYIONGUELE:W6BWgGv5V83aS7l3@cluster0.6h82w7w.mongodb.net/scanbillet?retryWrites=true&w=majority");

const data = JSON.parse(fs.readFileSync('./scanbillet_export.json', 'utf-8'));

(async () => {
  for (const [collectionName, documents] of Object.entries(data)) {
    const model = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }));
    await model.insertMany(documents);
    console.log(`✅ Importé ${documents.length} documents dans ${collectionName}`);
  }
  mongoose.disconnect();
})();
