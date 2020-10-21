const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  // copy of the request query
  const reqQuery = { ...req.query };

  // Remove these fields from query
  const exclusions = [
    'select',
    'sort',
    'sortDirection',
    'limit',
    'page',
    'skip',
  ];

  exclusions.forEach((p) => delete reqQuery[p]);

  // JSON the query to manipulate it
  let queryStr = JSON.stringify(reqQuery);

  // Create mongo operators from query params
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = model.find(JSON.parse(queryStr));

  // Select specific fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sorting
  if (req.query.sort) {
    let sortBy = req.query.sort.split(',').join(' ');
    if (req.query.sortDirection && req.query.sortDirection === 'desc') {
      sortBy = `-${sortBy}`
    }
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;

  const limit = parseInt(req.query.limit, 10) || 500;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();
  const pagination = {};

  if (endIndex < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.prev = { page: page - 1, limit };
  }
  // End pagination

  // Apply pagination
  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  const results = await query;

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResults;