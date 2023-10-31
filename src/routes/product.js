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
 *       title:
 *        type: string
 *       description:
 *        type: string
 *       price:
 *        type: number
 *       discountPercentage:
 *        type: number
 *       rating:
 *        type: number
 *       stock:
 *        type: number
 *       brand:
 *        type: string
 *       category:
 *        type: string
 *       thumbnail:
 *        type: string
 *       images:
 *        type: array
 *        items:
 *         type:
 *          string
 *     ProductDelete:
 *      allOf:
 *       - $ref: '#/components/schemas/Product'
 *       - type: object
 *         properties:
 *          isDeleted:
 *           type: boolean
 *          deletedOn:
 *           type: string
 */

/**
 * @swagger
 * /products:
 *  get:
 *   summary: get all products
 *   tags: [Product]
 *   parameters:
 *    - in: query
 *      name: limit
 *      schema:
 *       type: number
 *      required: false
 *    - in: query
 *      name: skip
 *      schema:
 *       type: number
 *      required: false
 *    - in: query
 *      name: select
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
 *   summary: search products
 *   tags: [Product]
 *   parameters:
 *    - in: query
 *      name: q
 *      description: searchQuery
 *      schema:
 *       type: string
 *      required: false
 *    - in: query
 *      name: limit
 *      schema:
 *       type: number
 *      required: false
 *    - in: query
 *      name: skip
 *      schema:
 *       type: number
 *      required: false
 *    - in: query
 *      name: select
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
 *   summary: get all products categories
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
 *   summary: get product by id
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: product_id
 *      schema:
 *       type: integer
 *      required: true
 *    - in: query
 *      name: select
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
 *   summary: get products of category
 *   tags: [Product]
 *   parameters:
 *    - in: query
 *      name: category_name
 *      description: categorName
 *      schema:
 *       type: string
 *      required: true
 *    - in: query
 *      name: select
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
 * /producs/add:
 *  post:
 *   summary: create a new product
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
 * /producs/{product_id}:
 *  put:
 *   summary: update a product
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: product_id
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
 * /producs/{product_id}:
 *  patch:
 *   summary: update a product
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: product_id
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
 * /producs/{product_id}:
 *  delete:
 *   summary: delete a product
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: product_id
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
