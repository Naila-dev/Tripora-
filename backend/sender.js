// d:/End_Project1/tripora/backend/seeder.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./models/tourModel.js'); // Make sure this path is correct

// Load env vars
dotenv.config();

// Sample tour data
const tours = [
  {
    title: 'Serengeti Safari Adventure',
    location: 'Tanzania',
    price: 2500,
    duration: '5 days',
    description: 'A classic safari experience in the world-famous Serengeti National Park. Witness the vast plains teeming with wildlife.',
    image: '/images/tour-1.jpg',
  },
  {
    title: 'Majestic Mount Kilimanjaro',
    location: 'Tanzania',
    price: 3000,
    duration: '7 days',
    description: 'Challenge yourself with a trek to the summit of Africa\'s highest peak, Mount Kilimanjaro. Breathtaking views await.',
    image: '/images/tour-2.jpg',
  },
  {
    title: 'Zanzibar Beach Holiday',
    location: 'Tanzania',
    price: 1500,
    duration: '4 days',
    description: 'Relax on the pristine white-sand beaches of Zanzibar and explore the historic Stone Town.',
    image: '/images/tour-3.jpg',
  },
  {
    title: 'Nile River Cruise',
    location: 'Egypt',
    price: 2200,
    duration: '6 days',
    description: 'Sail down the legendary Nile River, visiting ancient temples and tombs from Luxor to Aswan.',
    image: '/images/tour-4.jpg',
  },
  {
    title: 'Cape Town & Winelands',
    location: 'South Africa',
    price: 1800,
    duration: '5 days',
    description: 'Discover the vibrant city of Cape Town, ascend Table Mountain, and tour the beautiful Cape Winelands.',
    image: '/images/tour-5.jpg',
  },
  {
    title: 'Victoria Falls Experience',
    location: 'Zambia/Zimbabwe',
    price: 1900,
    duration: '3 days',
    description: 'Witness the awe-inspiring power of Victoria Falls, one of the Seven Natural Wonders of the World.',
    image: '/images/tour-6.jpg',
  },
  {
    title: 'Gorilla Trekking in Rwanda',
    location: 'Rwanda',
    price: 3500,
    duration: '4 days',
    description: 'An unforgettable encounter with the majestic mountain gorillas in their natural habitat in Volcanoes National Park.',
    image: '/images/tour-7.jpg',
  },
  {
    title: 'Masai Mara Wildebeest Migration',
    location: 'Kenya',
    price: 2800,
    duration: '7 days',
    description: 'Witness the breathtaking Great Migration in the Masai Mara, a once-in-a-lifetime wildlife spectacle.',
    image: '/images/tour-8.jpg',
  },
  {
    title: 'Pyramids of Giza Tour',
    location: 'Egypt',
    price: 1200,
    duration: '3 days',
    description: 'Explore the ancient wonders of the world, including the Great Pyramids and the Sphinx in Giza.',
    image: '/images/tour-9.jpg',
  },
  {
    title: 'Okavango Delta Mokoro Trip',
    location: 'Botswana',
    price: 3200,
    duration: '5 days',
    description: 'Glide through the serene waterways of the Okavango Delta in a traditional mokoro canoe, spotting incredible birdlife and wildlife.',
    image: '/images/tour-10.jpg',
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
