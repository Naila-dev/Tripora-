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

  {
    title: 'Masai Mara Great Migration Safari',
    location: 'Masai Mara',
    price: 2800,
    duration: '6 days',
    description:
      'Experience the world-famous Great Migration and spot the Big Five in the breathtaking Masai Mara National Reserve.',
    image: '/images/migration.jpeg',
  },
  {
    title: 'Amboseli Safari & Kilimanjaro Views',
    location: 'Amboseli National Park',
    price: 2200,
    duration: '4 days',
    description:
      'Witness herds of elephants and capture stunning views of Mount Kilimanjaro in this unforgettable safari experience.',
    image: '/images/antelopes.jpeg',
  },
  {
    title: 'Diani Beach Paradise Escape',
    location: 'Diani Beach, Ukunda',
    price: 1800,
    duration: '5 days',
    description:
      'Relax on Kenya’s most beautiful white-sand beach, enjoy water sports, and explore local coastal culture.',
    image: '/images/diani.jpg',
  },
  {
    title: 'Mount Kenya Climbing Adventure',
    location: 'Mount Kenya National Park',
    price: 2500,
    duration: '5 days',
    description:
      'Conquer Africa’s second-highest mountain and enjoy scenic alpine landscapes, glaciers, and wildlife along the trail.',
    image: '/images/mountain.jpeg',
  },
  {
    title: 'Lake Nakuru Flamingo Safari',
    location: 'Lake Nakuru National Park',
    price: 1500,
    duration: '3 days',
    description:
      'Explore Lake Nakuru’s pink flamingo shores and spot rhinos, lions, and leopards in the Great Rift Valley.',
    image: '/images/coastalpathway.jpeg',
  },
  {
    title: 'Samburu Culture & Wildlife Expedition',
    location: 'Samburu National Reserve',
    price: 2600,
    duration: '5 days',
    description:
      'Discover the unique wildlife of northern Kenya and immerse yourself in Samburu tribal culture and traditions.',
    image: '/images/river.jpeg',
  },
  {
    title: 'Lamu Island Heritage Tour',
    location: 'Lamu Island',
    price: 1900,
    duration: '4 days',
    description:
      'Step back in time on the ancient streets of Lamu, a UNESCO World Heritage site rich in Swahili culture and charm.',
    image: '/images/coast.jpeg',
  },
  {
    title: 'Tsavo East & West Safari Adventure',
    location: 'Tsavo National Park',
    price: 2300,
    duration: '5 days',
    description:
      'Explore Kenya’s largest national park, home to red elephants, lions, and rugged savannah landscapes.',
    image: '/images/savannah2.jpeg',
  },
  {
    title: 'Hell’s Gate Biking & Hiking Experience',
    location: 'Naivasha',
    price: 1200,
    duration: '2 days',
    description:
      'Ride through gorges and cliffs in Hell’s Gate National Park, known for its dramatic scenery and geothermal features.',
    image: '/images/view1.jpg',
  },
  {
    title: 'Nairobi City & Wildlife Tour',
    location: 'Nairobi',
    price: 900,
    duration: '2 days',
    description:
      'Discover Nairobi’s best — visit the Giraffe Centre, David Sheldrick Elephant Orphanage, and Nairobi National Park.',
    image: '/images/kenya-nairobi.jpg',
  },
  {
    title: 'Lake Naivasha Boat & Crescent Island Tour',
    location: 'Lake Naivasha',
    price: 1300,
    duration: '2 days',
    description:
      'Take a peaceful boat ride among hippos and enjoy a guided walk among giraffes and zebras on Crescent Island.',
    image: '/images/island.jpeg',
  },
  {
    title: 'Aberdare Waterfalls & Tree Lodge Stay',
    location: 'Aberdare Ranges',
    price: 1600,
    duration: '3 days',
    description:
      'Stay in a treetop lodge, enjoy cool mountain air, and see elephants at the forest waterholes in Aberdare National Park.',
    image: '/images/waterfall.jpg',
  },
  {
    title: 'Malindi & Watamu Coastal Retreat',
    location: 'Malindi & Watamu',
    price: 1700,
    duration: '4 days',
    description:
      'Unwind on Kenya’s coral coast, visit the Gede Ruins, and snorkel in the clear waters of Watamu Marine Park.',
    image: '/images/beach2.jpg',
  },
  {
    title: 'Ol Pejeta Rhino Sanctuary Safari',
    location: 'Ol Pejeta Conservancy',
    price: 2100,
    duration: '4 days',
    description:
      'Visit the world’s last northern white rhinos and experience close-up encounters with lions and chimps.',
    image: '/images/antelopes.jpeg',
  },
  {
    title: 'Turkana Desert & Lake Adventure',
    location: 'Lake Turkana',
    price: 3500,
    duration: '7 days',
    description:
      'Embark on an epic journey to the Jade Sea, exploring remote desert landscapes and ancient rock art.',
    image: '/images/savannah.jpg',
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
