const AdjustmentForm = require('../../models/forms/billingAdjustmentFormsModel'); // Assuming this is the correct path


/**
 * Get adjustments with optional filtering by form type and user role
 * @route GET /adjustments
 * @query {string} [formType] - Optional form type to filter adjustments
 * @query {number} [page=1] - Page number for pagination
 * @query {number} [limit=10] - Number of items per page
 * @query {boolean} [viewAll] - Flag to indicate if all submissions should be returned
 */
exports.getAdjustments = async (req, res) => {
  try {
    console.log(req.query);
    const { formType, page = 1, limit = 100, viewAll } = req.query;
    let filter = formType ? { formType } : {};

    // If viewAll is false or not provided, filter by the current user's ID
    if (!viewAll || viewAll === 'false') {
      filter.submittedBy = req.user.id;
    }

    const results = await AdjustmentForm.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await AdjustmentForm.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: results.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: results
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    });
  }
}


/**
 * Create a new adjustment
 * @route POST /adjustments
 * @body {Object} adjustment - Adjustment form data
 */
exports.createAdjustment = ('/', async (req, res) => {
  try {
    console.log(req.user)
    req.body.formType = req.query.formType
    req.body.submittedBy = req.user.id;
    console.log(req.body)
    const result = await AdjustmentForm.create(req.body);

    res.status(201).json({
      success: true,
      data: result
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    });
  }
});


/**
 * Get a single adjustment by ID
 * @route GET /adjustments/:id
 * @param {string} id - Adjustment form ID
 */
exports.getAdjustmentById = ('/:id', async (req, res) => {
  try {
    const result = await AdjustmentForm.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'No adjustment form found'
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    });
  }
});


/**
 * Update an adjustment
 * @route PUT /adjustments/:id
 * @param {string} id - Adjustment form ID
 * @body {Object} adjustment - Updated adjustment form data
 */
exports.updateAdjustment = ('/:id', async (req, res) => {
  try {
    const result = await AdjustmentForm.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'No adjustment form found'
      });
    }

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    });
  }
});


/**
 * Delete an adjustment
 * @route DELETE /adjustments/:id
 * @param {string} id - Adjustment form ID
 */
exports.deleteAdjustment = ('/:id', async (req, res) => {
  try {
    const result = await AdjustmentForm.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'No adjustment form found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Adjustment form successfully deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'An error occurred when processing your request',
      error: err.message
    });
  }
});