#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(name) {
  const category = new Category({ name: name });
  await category.save();
  categories.push(category);
  console.log(`Added category: ${name}`);
}

async function itemCreate(name, desc, category, price, stock) {
  itemDetail = {
    name: name,
    desc: desc,
    price: price,
    stock: stock,
  };
  if (category != false) itemDetail.category = category;

  const item = new Item(itemDetail);
  await item.save();
  items.push(item);
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");

  await categoryCreate("Sneakers");
  await categoryCreate("Formal");
  await categoryCreate("Heels");
  await categoryCreate("Boots");
  await categoryCreate("Casual");
}

async function createItems() {
  console.log("Adding Items");
  await Promise.all([
    itemCreate(
      "Sven Sports Trainers",
      "Black running shoes from Sven",
      [categories[0]],
      70,
      80
    ),
    itemCreate(
      "Radiate Men's Sports Trainers",
      "Red Sports Trainers for Men",
      [categories[0]],
      120,
      40
    ),
    itemCreate(
      "Ezra Trainers Green",
      "Green running shoes from Ezra",
      [categories[0]],
      90,
      20
    ),
    itemCreate(
      "Ezra Trainers Blue",
      "Blue running shoes from Ezra",
      [categories[0]],
      90,
      30
    ),
    itemCreate(
      "Mario Dress Shows",
      "Brown and clean dress shoes",
      [categories[1]],
      190,
      30
    ),
    itemCreate(
      "Underwood shoes",
      "Fitting and very comfy dress shoes",
      [categories[1]],
      220,
      10
    ),
    itemCreate(
      "Saffy Block Heels",
      "Wide fit heel. Comes in white.",
      [categories[2]],
      190,
      30
    ),
    itemCreate(
      "Fife Gumboots",
      "Long black gumboots for outdoor work.",
      [categories[3]],
      80,
      30
    ),
    itemCreate(
      "Asphalt 12inch Gumboots",
      "Extra long gumboots. Comes in gray.",
      [categories[3]],
      80,
      30
    ),
    itemCreate(
      "White skate shoes",
      "White skate shoes with a checkerboard pattern. Has extra grip.",
      [categories[4]],
      40,
      20
    ),
    itemCreate(
      "Laced canvas shoes",
      "Comes in a variety of colours.",
      [categories[4]],
      60,
      70
    ),
    itemCreate(
      "Jack Walker Casual Shoes",
      "Jack Walker brand shoes. Very fitting and suitable for long distance walking.",
      [categories[4]],
      60,
      20
    ),
    itemCreate(
      "Cassidy Slip On Shoes",
      "No laces or straps. Slips right on. Has a nice leather exterior texture.",
      [categories[4]],
      90,
      10
    ),
  ]);
}
