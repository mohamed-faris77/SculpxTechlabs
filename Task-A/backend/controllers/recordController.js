import Record from '../models/Record.js';

export const getRecords = async (req, res) => {
  try {
    const { search, category, sort, order, startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const sortOptions = {};
    if (sort) sortOptions[sort] = order === 'desc' ? -1 : 1;

    const skip = (page - 1) * limit;

    const data = await Record.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Record.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
