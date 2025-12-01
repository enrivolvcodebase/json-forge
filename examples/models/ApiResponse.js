/**
 * @typedef {Object} Pagination
 * @property {number} page
 * @property {number} perPage
 * @property {number} total
 */

module.exports = {};

/**
 * @typedef {Object} Attributes
 * @property {string} color
 * @property {string} size
 */

module.exports = {};

/**
 * @typedef {Object} Items
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {Attributes} attributes
 */

module.exports = {};

/**
 * @typedef {Object} Data
 * @property {Array<Items>} items
 * @property {Pagination} pagination
 */

module.exports = {};

/**
 * @typedef {Object} ApiResponse
 * @property {string} status
 * @property {Data} data
 * @property {Array} errors
 */

module.exports = {};
