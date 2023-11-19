const router = require('express').Router();
const {
  getAllCarts,
  getCartsByUserId,
  getCartById,
  addNewCart,
  updateCartById,
  deleteCartById,
} = require('../controllers/cart');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: The cart API
 * components:
 *   schemas:
 *     Carts:
 *      type: object
 *      items:
 *      properties:
 *       carts:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Cart'
 *       total:
 *        type: number
 *        example: 1
 *       skip:
 *        type: number
 *        example: 0
 *       limit:
 *        type: number
 *        example: 1
 *     Cart:
 *      type: object
 *      properties:
 *       id:
 *        type: number
 *        example: 7
 *       products:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/CartProduct'
 *       total:
 *        type: number
 *        example: 4339
 *       discountedTotal:
 *        type: number
 *        example: 4007
 *       userId:
 *        type: number
 *        example: 1
 *       totalProducts:
 *        type: number
 *        example: 1
 *       totalQuantity:
 *        type: number
 *        example: 1
 *     CartProduct:
 *      type: object
 *      properties:
 *       id:
 *        type: number
 *        example: 1
 *       title:
 *        type: string
 *        example: "iPhone 9"
 *       price:
 *        type: number
 *        example: 549
 *       quantity:
 *        type: number
 *        example: 1
 *       total:
 *        type: number
 *        example: 1098
 *       discountPercentage:
 *        type: number
 *        example: 12.96
 *       discountedPrice:
 *        type: number
 *        example: 956
 *       thumbnail:
 *        type: string
 *        example: "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
 *     CartAdd:
 *      type: object
 *      properties:
 *       userId: 
 *        type: number
 *        example: 1
 *       products:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *           id:
 *            type: string
 *            example: 1
 *           quantity:
 *            type: string
 *            example: 1
 *     CartUpdate:
 *      type: object
 *      properties:
 *       merge: 
 *        type: boolean
 *        example: true
 *       products:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *           id:
 *            type: string
 *            example: 1
 *           quantity:
 *            type: string
 *            example: 1
 *     CartDelete:
 *      allOf:
 *       - $ref: '#/components/schemas/Cart'
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
 * /carts:
 *  get:
 *   summary: Get all carts
 *   tags: [Cart]
 *   description: |
 *     Limit and skip products:
 *       - You can pass "limit" and "skip" params to limit and skip the results for pagination, and use limit=0 to get all items.
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
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Carts'
 *    500:
 *     description: error
 */
// get all carts
router.get('/', (req, res) => {
  res.send(getAllCarts({ ...req._options }));
});

/**
 * @swagger
 * /carts/user/{user_id}:
 *  get:
 *   summary: Get carts of a user
 *   description: |
 *     Limit and skip products:
 *       - You can pass "limit" and "skip" params to limit and skip the results for pagination, and use limit=0 to get all items.
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
 *   tags: [Cart]
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Carts'
 *    500:
 *     description: error
 */
// get cart by user
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  const { limit, skip } = req._options;

  res.send(getCartsByUserId({ userId, limit, skip }));
});

/**
 * @swagger
 * /carts/{cart_id}:
 *  get:
 *   summary: Get cart by id
 *   tags: [Cart]
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         merge:
 *          type: string
 *          example: true
 *        $ref: '#/components/schemas/Cart'
 *    500:
 *     description: error
 */
// get cart by id
router.get('/:id', (req, res) => {
  res.send(getCartById({ ...req.params }));
});

/**
 * @swagger
 * /carts/add:
 *  post:
 *   summary: Create a new cart
 *   description: |
 *     - Adding a new cart will not add it into the server.
 *     - It will simulate a POST request and will return the new created cart with a new id
 *     - **HINT :** You can provide a userId and array of products as objects, containing productId & quantity
 *     - **total** is calculated with quantity and **totalQuantity** is the quantity of items
 *   tags: [Cart]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CartAdd'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Cart'
 *    500:
 *     description : error
 */
// add new cart
router.post('/add', (req, res) => {
  res.send(addNewCart({ ...req.body }));
});

/**
 * @swagger
 * /carts/{cart_id}:
 *  put:
 *   summary: Update a cart
 *   description: |
 *     - Updating a cart will not update it into the server.
 *     - Pass "merge: true" to include old products when updating. This will include existing products in the cart
 *     - It will simulate a PUT/PATCH request and will return updated cart with modified data
 *     - **HINT :** You can provide a userId and array of products as objects, containing productId & quantity
 *     - **total** is calculated with quantity and **totalQuantity** is the quantity of items
 *   tags: [Cart]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CartUpdate'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Cart'
 *    500:
 *     description : error
 */
// update cart by id (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;

  res.send(updateCartById({ id, ...req.body }));
});

// update cart by id (PATCH)
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  res.send(updateCartById({ id, ...req.body }));
});

/**
 * @swagger
 * /carts/{cart_id}:
 *  delete:
 *   summary: Delete a cart
 *   description: |
 *     - Deleting a cart will not delete it into the server.
 *     - It will simulate a DELETE request and will return deleted cart with **isDeleted** & **deletedOn** keys 
 *   tags: [Cart]
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CartDelete'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Cart'
 *    500:
 *     description : error
 */
// delete cart
router.delete('/:id', (req, res) => {
  res.send(deleteCartById({ ...req.params }));
});

module.exports = router;