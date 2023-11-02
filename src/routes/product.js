const router = require('express').Router();
const {
  getAllProducts,
  getProductById,
  searchProducts,
  getProductCategories,
  getProductsByCategoryName,
  addNewProduct,
  updateProductById,
  deleteProductById,
} = require('../controllers/product');

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: The product API
 * components:
 *   schemas:
 *     Products:
 *      type: object
 *      properties:
 *       products:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Product'
 *       total:
 *        type: number
 *       skip:
 *        type: number
 *       limit:
 *        type: number
 *     Product:
 *      type: object
 *      properties:
 *       id:
 *        type: number
 *        example: 1
 *       title:
 *        type: string
 *        example: "iPhone 9"
 *       description:
 *        type: string
 *        example: "An apple mobile which is nothing like apple"
 *       price:
 *        type: number
 *        example: 549
 *       discountPercentage:
 *        type: number
 *        example: 12.96
 *       rating:
 *        type: number
 *        example: 4.69
 *       stock:
 *        type: number
 *        example: 94
 *       brand:
 *        type: string
 *        example: "Apple"
 *       category:
 *        type: string
 *        example: "smarphones"
 *       thumbnail:
 *        type: string
 *        example: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
 *       images:
 *        type: array
 *        items:
 *         type:
 *          string
 *        example: [
 *                   "https://i.dummyjson.com/data/products/1/1.jpg",
 *                   "https://i.dummyjson.com/data/products/1/2.jpg",
 *                   "https://i.dummyjson.com/data/products/1/3.jpg",
 *                   "https://i.dummyjson.com/data/products/1/4.jpg",
 *                   "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
 *                 ]
 *     ProductDelete:
 *      allOf:
 *       - $ref: '#/components/schemas/Product'
 *       - type: object
 *         properties:
 *          isDeleted:
 *           type: boolean
 *           example: true
 *          deletedOn:
 *           type: string
 *           example: "2023-11-02T08:12:00.000Z"
 *           description: "ISO time"
 */

/**
 * @swagger
 * /products:
 *  get:
 *   summary: Get all products
 *   tags: [Product]
 *   description: |
 *     Limit and skip products:
 *       - You can pass "limit" and "skip" params to limit and skip the results for pagination, and use limit=0 to get all items.
 *       - You can pass "select" as query params with comma-separated values to select specific data.
 *   parameters:
 *    - in: query
 *      name: limit
 *      example: 10
 *      schema:
 *       type: number
 *      required: false
 *    - in: query
 *      name: skip
 *      example: 10
 *      schema:
 *       type: number
 *      required: false
 *    - in: query
 *      name: select
 *      example: title,price
 *      schema:
 *       type: string
 *      required: false
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Products'
 *    500:
 *     description: error
 */
// get all products
router.get('/', (req, res) => {
  res.send(getAllProducts({ ...req._options }));
});

/**
 * @swagger
 * /products/search:
 *  get:
 *   summary: Search products
 *   description: |
 *     Limit and skip products:
 *       - You can pass "limit" and "skip" params to limit and skip the results for pagination, and use limit=0 to get all items.
 *       - You can pass "select" as query params with comma-separated values to select specific data.
 *   tags: [Product]
 *   parameters:
 *    - in: query
 *      name: q
 *      description: Search Query
 *      example: phone
 *      schema:
 *       type: string
 *      required: true
 *    - in: query
 *      name: limit
 *      example: 10
 *      schema:
 *       type: number
 *      required: false
 *    - in: query
 *      name: skip
 *      example: 10
 *      schema:
 *       type: number
 *      required: false
 *    - in: query
 *      name: select
 *      example: title,price
 *      schema:
 *       type: string
 *      required: false
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Products'
 *    500:
 *     description: error
 */
// search product
router.get('/search', (req, res) => {
  res.send(searchProducts({ ...req._options }));
});

/**
 * @swagger
 * /products/categories:
 *  get:
 *   summary: Get all products categories
 *   tags: [Product]
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         type:
 *          string
 *        example: [
 *                   "smartphones",
 *                   "laptops",
 *                   "fragrances",
 *                   "skincare",
 *                   "groceries",
 *                   "home-decoration",
 *                   "furniture",
 *                   "tops",
 *                   "womens-dresses",
 *                   "womens-shoes",
 *                   "mens-shirts",
 *                   "mens-shoes",
 *                   "mens-watches",
 *                   "womens-watches",
 *                   "womens-bags",
 *                   "womens-jewellery",
 *                   "sunglasses",
 *                   "automotive",
 *                   "motorcycle",
 *                   "lighting"
 *                 ]
 *    500:
 *     description: error
 */
// get product categories
router.get('/categories', (req, res) => {
  res.send(getProductCategories());
});

/**
 * @swagger
 * /products/{product_id}:
 *  get:
 *   summary: Get product by id
 *   tags: [Product]
 *   description: |
 *     - You can pass "select" as query params with comma-separated values to select specific data.
 *   parameters:
 *    - in: path
 *      name: product_id
 *      example: 1
 *      schema:
 *       type: integer
 *      required: true
 *    - in: query
 *      name: select
 *      example: title,price
 *      schema:
 *       type: string
 *      required: false
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Product'
 *    500:
 *     description: error
 */
// get product by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { select } = req._options;

  res.send(getProductById({ id, select }));
});

/**
 * @swagger
 * /products/category/{category_name}:
 *  get:
 *   summary: Get products of category
 *   tags: [Product]
 *   description: |
 *     - You can pass "select" as query params with comma-separated values to select specific data.
 *   parameters:
 *    - in: query
 *      name: category_name
 *      description: Category name
 *      example: smartphones
 *      schema:
 *       type: string
 *      required: true
 *    - in: query
 *      name: select
 *      example: title,price
 *      schema:
 *       type: string
 *      required: false
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Products'
 *    500:
 *     description: error
 */
// get products by categoryName
router.get('/category/:categoryName', (req, res) => {
  const { categoryName } = req.params;

  res.send(getProductsByCategoryName({ categoryName, ...req._options }));
});

/**
 * @swagger
 * /products/add:
 *  post:
 *   summary: Create a new product
 *   description: |
 *     - Adding a new product will not add it into the server.
 *     - It will simulate a POST request and will return the new created product with a new id
 *   tags: [Product]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Product'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Product'
 *    500:
 *     description : error
 */
// add new product
router.post('/add', (req, res) => {
  res.send(addNewProduct({ ...req.body }));
});

/**
 * @swagger
 * /products/{product_id}:
 *  put:
 *   summary: Update a product
 *   description: |
 *     - Updating a product will not update it into the server.
 *     - It will simulate a PUT request and will return the product with modified data
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: product_id
 *      example: 1
 *      schema:
 *       type: integer
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Product'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Product'
 *    500:
 *     description : error
 */
// update product by id (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;

  res.send(updateProductById({ id, ...req.body }));
});

/**
 * @swagger
 * /products/{product_id}:
 *  patch:
 *   summary: Update a product
 *   description: |
 *     - Updating a product will not update it into the server.
 *     - It will simulate a PACTH request and will return the product with modified data
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: product_id
 *      example: 1
 *      schema:
 *       type: integer
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/Product'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Product'
 *    500:
 *     description : error
 */
// update product by id (PATCH)
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  res.send(updateProductById({ id, ...req.body }));
});

/**
 * @swagger
 * /products/{product_id}:
 *  delete:
 *   summary: Delete a product
 *   description: |
 *     - Deleting a product will not delete it into the server.
 *     - It will simulate a DELETE request and will return deleted product with "isDeleted" & "deletedOn" keys
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: product_id
 *      example: 1
 *      schema:
 *       type: integer
 *      required: true
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/ProductDelete'
 *    500:
 *     description : error
 */
// delete product by id
router.delete('/:id', (req, res) => {
  res.send(deleteProductById({ ...req.params }));
});

module.exports = router;
