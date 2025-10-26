// d:/End_Project1/tripora/backend/seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from './models/tourModel.js'; // Make sure this path is correct

// Load env vars
dotenv.config({ path: './config/config.env' });

// Sample tour data
const tours = [
  {
    title: 'Serengeti Safari Adventure',
    location: 'Tanzania',
    price: 2500,
    image: '/images/tour-1.jpg',
  },
  {
    title: 'Majestic Mount Kilimanjaro',
    location: 'Tanzania',
    price: 3000,
    image: '/images/tour-2.jpg',
  },
  {
    title: 'Zanzibar Beach Holiday',
    location: 'Tanzania',
    price: 1500,
    image: '/images/tour-3.jpg',
  },
  {
    title: 'Nile River Cruise',
    location: 'Egypt',
    price: 2200,
    image: '/images/tour-4.jpg',
  },
  {
    title: 'Cape Town & Winelands',
    location: 'South Africa',
    price: 1800,
    image: '/images/tour-5.jpg',
  },
  {
    title: 'Victoria Falls Experience',
    location: 'Zambia/Zimbabwe',
    price: 1900,
    image: '/images/tour-6.jpg',
  },
  {
    title: 'Gorilla Trekking in Rwanda',
    location: 'Rwanda',
    price: 3500,
    image: '/images/tour-7.jpg',
  },
];

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import data into DB
const importData = async () => {
  try {
    await Tour.deleteMany();
    await Tour.insertMany(tours);
    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use the -i flag to import data or -d to delete data');
  process.exit();
}
