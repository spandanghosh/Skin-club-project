const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://rakib:easypass@skin-club.21rmgao.mongodb.net/skin-club';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Anti wrinkle injections - 3 areas Flat fee
// Bio remodelling - $595 per syringe Flat fee