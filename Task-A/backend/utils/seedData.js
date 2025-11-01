import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Record from '../models/Record.js';

dotenv.config();
connectDB();


const sampleData = [
  { name: 'Apple iPhone 14', category: 'Electronics', price: 799, date: new Date('2024-05-01') },
  { name: 'Samsung Galaxy S23', category: 'Electronics', price: 699, date: new Date('2024-03-15') },
  { name: 'Asus Laptop', category: 'Computers', price: 1200, date: new Date('2024-02-10') },
  { name: 'Nike Shoes', category: 'Fashion', price: 120, date: new Date('2024-04-25') },
  { name: 'Levis Jeans', category: 'Fashion', price: 80, date: new Date('2024-04-10') },
  { name: 'Dell Monitor', category: 'Electronics', price: 250, date: new Date('2024-01-22') },
  { name: 'Sony Headphones', category: 'Accessories', price: 149, date: new Date('2024-02-15') },
  { name: 'Apple Watch', category: 'Accessories', price: 399, date: new Date('2024-05-10') },
  { name: 'HP Printer', category: 'Computers', price: 180, date: new Date('2024-03-27') },
  { name: 'Adidas T-Shirt', category: 'Fashion', price: 45, date: new Date('2024-04-05') },
  { name: 'Adidas Shoes', category: 'Fashion', price: 40, date: new Date('2024-04-07') },
];

const importData = async () => {
  try {
    await Record.deleteMany(); // clean old data
    await Record.insertMany(sampleData);
    console.log('Sample data inserted successfully!');
    process.exit();
  } catch (error) {
    console.error('Error inserting/seeding data:', error);
    process.exit(1);
  }
};

importData();
