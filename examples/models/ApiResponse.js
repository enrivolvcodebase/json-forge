/**
 * @typedef {Object} ApiResponseDataPagination
 * @property {number} page
 * @property {number} perPage
 * @property {number} total
 */

module.exports = {};

/**
 * @typedef {Object} ApiResponseDataItemsItemAttributes
 * @property {string} color
 * @property {string} size
 */

module.exports = {};

/**
 * @typedef {Object} ApiResponseDataItemsItem
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {ApiResponseDataItemsItemAttributes} attributes
 */

module.exports = {};

/**
 * @typedef {Object} ApiResponseData
 * @property {Array<ApiResponseDataItemsItem>} items
 * @property {ApiResponseDataPagination} pagination
 */

module.exports = {};

/**
 * @typedef {Object} ApiResponse
 * @property {string} status
 * @property {ApiResponseData} data
 * @property {Array} errors
 */

module.exports = {};
