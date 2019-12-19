const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const argv = require('yargs').argv;

// Load env vars
dotenv.config({ path: '.env' });

const model = argv.model;

// Load model
const Model = require(`./models/${model.charAt(0).toUpperCase() +
    model.slice(1)}`);

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const data = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/${model.toLowerCase()}.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
    try {
        await Model.create(data);

        console.log(`Import data for model "${model}"`.green.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Model.deleteMany();

        console.log(`Delete data for model "${model}"`.red.inverse);
        process.exit();
    } catch (error) {
        console.log(error);
    }
};

if (argv.action === 'delete') {
    deleteData();
} else {
    importData();
}
