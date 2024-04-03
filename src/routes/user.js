const router = require('express').Router();
const { getCartsByUserId } = require('../controllers/cart');
const { getPostsByUserId } = require('../controllers/post');
const { getTodosByUserId } = require('../controllers/todo');
const {
  getAllUsers,
  getUserById,
  searchUsers,
  addNewUser,
  updateUserById,
  deleteUserById,
  filterUsers,
} = require('../controllers/user');
const authUser = require('../middleware/auth');
const { verifyUserHandler } = require('../helpers');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The user API
 * components:
 *   schemas:
 *     Users:
 *      type: object
 *      properties:
 *       users:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/User'
 *       total:
 *        type: number
 *        example: 1
 *       skip:
 *        type: number
 *        example: 0
 *       limit:
 *        type: number
 *        example: 1     
 *     User:
 *      type: object
 *      properties:
 *       id:
 *        type: number
 *        example: 1
 *       firstName:
 *        type: string
 *        example: Terry
 *       lastName:
 *        type: string
 *        example: Medhurst
 *       maidenName:
 *        type: string
 *        example: Smitham
 *       age:
 *        type: number
 *        example: 50
 *       gender:
 *        type: string
 *        example: male
 *       email:
 *        type: string
 *        example: atuny0@sohu.com
 *       phone:
 *        type: string
 *        example: +63 791 675 8914
 *       username:
 *        type: string
 *        example: atuny0
 *       password:
 *        type: string
 *        example: 9uQFF1Lh
 *       birthDate:
 *        type: string
 *        example: "2000-12-25"
 *       image:
 *        type: string
 *        example: https://robohash.org/hicveldicta.png?size=50x50&set=set1
 *       bloodGroup:
 *        type: string
 *        example: "A−"
 *       height:
 *        type: number
 *        example: 189
 *       weight:
 *        type: number
 *        example: 75.4
 *       eyeColor:
 *        type: string
 *        example: Green
 *       hair:
 *        type: object
 *        properties:
 *         color:
 *          type: string
 *          example: Black
 *         type:
 *          type: string
 *          example: Strands
 *       domain:
 *        type: string
 *        example: slashdot.org
 *       ip:
 *        type: string
 *        example: 117.29.86.254
 *       address:
 *        type: object
 *        $ref: '#/components/schemas/UserAddressDetails'
 *       macAddress:
 *        type: string
 *        example: "13:69:BA:56:A3:74"
 *       university:
 *        type: string
 *        example: Capitol University
 *       bank:
 *        type: object
 *        $ref: '#/components/schemas/UserBankDetails'
 *       company:
 *        type: object
 *        $ref: '#/components/schemas/UserCompanyDetails'
 *       ein:
 *        type: string
 *        example: "20-9487066"
 *       ssn:
 *        type: string
 *        example: "661-64-2976"
 *       userAgent:
 *        type: string
 *        example: "Mozilla/5.0 ..."
 *     UserAddressDetails:
 *      type: object
 *      properties:
 *       address:
 *        type: string
 *        example: 1745 T Street Southeast
 *       city:
 *        type: string
 *        example: Washington
 *       coordinates:
 *        type: object
 *        properties:
 *         lat:
 *          type: string
 *          example: "38.867033"
 *         lng:
 *          type: string
 *          example: "-76.979235"
 *       postalCode:
 *        type: string
 *        example: 20020
 *       state:
 *        type: string
 *        example: DC
 *     UserBankDetails:
 *      type: object
 *      properties:
 *       cardExpire: 
 *        type: string
 *        example: "06/22"
 *       cardNumber: 
 *        type: string
 *        example: 50380955204220685
 *       cardType: 
 *        type: string
 *        example: maestro
 *       currency: 
 *        type: string
 *        example: Peso
 *       iban: 
 *        type: string
 *        example: NO17 0695 2754 967
 *     UserCompanyDetails:
 *      type: object
 *      properties:
 *       address:
 *        type: object
 *        properties:
 *         address:
 *          type: string
 *          example: 629 Debbie Drive
 *         city:
 *          type: string
 *          example: Nashville
 *         coordinates:
 *          type: object
 *          properties:
 *           lat:
 *            type: string
 *            example: "36.208114"
 *           lng:
 *            type: string
 *            example: "-86.58621199999999"
 *         postalCode:
 *          type: string
 *          example: 37076
 *         state:
 *          type: string
 *          example: TN
 *       department:
 *        type: string
 *        example: Marketing
 *       name:
 *        type: string
 *        example: "Blanda-O'Keefe"
 *       title:
 *        type: string
 *        example: Help Desk Operator
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
 * /users:
 *  get:
 *   summary: Get all users
 *   tags: [User]
 *   description: |
 *     Limit and skip users:
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
 *      example: firstName,hair
 *      schema:
 *       type: string
 *      required: false
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Users'
 *    500:
 *     description: error
 */
// get all users
router.get('/', (req, res) => {
  res.send(getAllUsers({ ...req._options }));
});

/**
 * @swagger
 * /users/me:
 *  get:
 *   summary: Get current auth user
 *   tags: [User]
 *   parameters:
 *    - in: header
 *      name: Authorization
 *      example: Bearer YOUR_TOKEN_HERE
 *      schema:
 *       type: string
 *      required: true
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Carts'
 *    403:
 *      description: forbidden
 *      content:
 *       application/json:
 *        example: |
 *          {
 *            "message": "Authentication Problem"
 *          }
 *    500:
 *     description: error
 */
router.get('/me', authUser, (req, res) => {
  res.send(req.user);
});

/**
 * @swagger
 * /users/search:
 *  get:
 *   summary: Search users
 *   tags: [User]
 *   description: |
 *     Limit and skip users:
 *       - You can pass "limit" and "skip" params to limit and skip the results for pagination, and use limit=0 to get all items.
 *       - You can pass "select" as query params with comma-separated values to select specific data.
 *   parameters:
 *    - in: query
 *      name: q
 *      example: Terry
 *      schema:
 *       type: string
 *      required: false
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
 *      example: firstName,hair
 *      schema:
 *       type: string
 *      required: false
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Users'
 *    500:
 *     description: error
 */
// search users
router.get('/search', (req, res) => {
  res.send(searchUsers({ ...req._options }));
});

// filter users
router.get('/filter', (req, res) => {
  res.send(filterUsers({ ...req._options }));
});

/**
 * @swagger
 * /users/{user_id}:
 *  get:
 *   summary: Get user by id
 *   tags: [User]
 *   description: |
 *     - You can pass "select" as query params with comma-separated values to select specific data.
 *   parameters:
 *    - in: path
 *      name: user_id
 *      example: 1
 *      schema:
 *       type: integer
 *      required: true
 *    - in: query
 *      name: select
 *      example: domain,ip
 *      schema:
 *       type: string
 *      required: false
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/User'
 *    500:
 *     description: error
 */
// get user by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const { select } = req._options;

  res.send(getUserById({ id, select }));
});

/**
 * @swagger
 * /users/{user_id}/carts:
 *  get:
 *   summary: Get user's carts by user id
 *   tags: [User]
 *   description: |
 *     Limit and skip products:
 *       - You can pass "limit" and "skip" params to limit and skip the results for pagination, and use limit=0 to get all items.
 *   parameters:
 *    - in: path
 *      name: user_id
 *      example: 1
 *      schema:
 *       type: integer
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
// get carts by userId
router.get('/:userId/carts', (req, res) => {
  const { userId } = req.params;
  const { limit, skip } = req._options;

  verifyUserHandler(userId);

  res.send(getCartsByUserId({ userId, limit, skip }));
});


// get posts by userId
router.get('/:userId/posts', (req, res) => {
  const { userId } = req.params;
  const { limit, skip, select } = req._options;

  verifyUserHandler(userId);

  res.send(getPostsByUserId({ userId, limit, skip, select }));
});

// get products by userId
// * products are independent from users

// get todos by userId
router.get('/:userId/todos', (req, res) => {
  const { userId } = req.params;
  const { limit, skip, select } = req._options;

  verifyUserHandler(userId);

  res.send(getTodosByUserId({ userId, limit, skip, select }));
});

// add new user
router.post('/add', (req, res) => {
  res.send(addNewUser({ ...req.body }));
});

// update user by id (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;

  res.send(updateUserById({ id, ...req.body }));
});

// update user by id (PATCH)
router.patch('/:id', (req, res) => {
  const { id } = req.params;

  res.send(updateUserById({ id, ...req.body }));
});

// delete user by id
router.delete('/:id', (req, res) => {
  res.send(deleteUserById({ ...req.params }));
});

module.exports = router;