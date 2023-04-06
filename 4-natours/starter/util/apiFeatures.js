class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    /* ----------------------------  1A) Filtering ---------------------------- */
    const queryObj = { ...this.queryString };
    const exludedFields = ['limit', 'page', 'sort', 'fields'];
    exludedFields.forEach(field => delete queryObj[field]);
    /* ------------------------  1B) Advanced filtering ----------------------- */
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      match => `$${match}`
    );
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    /* ----------------------------  2) Sorting ---------------------------- */
    if (this.queryString.sort) {
      // if sort is specified, sort the results by that field.
      const sortedBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortedBy); // sort is a function.
    } else {
      // if no sort is specified, sort the results by the creation time.
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limit() {
    /* ---------------------------------- Limit --------------------------------- */
    if (this.queryString.fields) {
      // if field is specified, limit the number of fields returned.
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // if no field is specified, limit the number of fields returned.
      this.query = this.query.select('-__v'); // select all fields, except __v.
    }
    return this;
  }

  paginat() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10; // default to 10.
    const skip = (page - 1) * limit; // skip the number of records.

    this.query = this.query.skip(skip).limit(limit); // skip and limit the number of records.
    return this;
  }
}

module.exports = APIFeatures;
