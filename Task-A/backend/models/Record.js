import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    date: Date,
  },
  { timestamps: true }
);

const Record = mongoose.model('Record', recordSchema);

export default Record;
