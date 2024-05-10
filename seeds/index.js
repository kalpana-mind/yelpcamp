const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '66396f62e355500c7a6897ed',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dl6ae8oyo/image/upload/v1715213563/YelpCamp/eigelgpbupacns2qvblx.jpg',
          filename: 'YelpCamp/eigelgpbupacns2qvblx',
        },
        {
          url: 'https://res.cloudinary.com/dl6ae8oyo/image/upload/v1715213563/YelpCamp/x8c9ufud1dhjxz0xgrwz.jpg',
          filename: 'YelpCamp/x8c9ufud1dhjxz0xgrwz',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet tempora nemo laboriosam quam nobis! Quisquam, quos consequuntur sit vitae consequatur porro quod laudantium quia nemo debitis enim explicabo qui necessitatibus.',
      price,
    });

    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
