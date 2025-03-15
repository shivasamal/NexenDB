const pool = require("../DB/index");
const queries = require("../Queries/homequeries");
const logger = require('../logger');

var apiResponse = {
    data: Object,
    message: String,
    success: Boolean
}

/**
 * @swagger
 * components:
 *  schemas:
 *   Subscriber:
 *    type: object
 *    required:
 *     - email
 *     - sub_id
 *     - created_date
 *     - modified_date
 *    properties:
 *     sub_id:
 *      type: string
 *      description: Auto generated Id
 *      example: '1'
 *     email:
 *      type: string
 *      description: email of the Subscriber
 *      example: 'subscriber@gmail.com'
 *     created_date:
 *      type: date
 *      example: '2021-05-04'
 *     created_by:
 *      type: string
 *      example: 'Admin'
 *     modified_date:
 *      type: date
 *      example: '2021-05-04'
 *     modified_by:
 *      type: string
 *      example: 'Admin'
 *   ContactUs:
 *    type: object
 *    required:
 *     - contact_id
 *     - full_name
 *     - subject
 *     - email
 *     - created_date
 *     - modified_date
 *    properties:
 *     contact_id:
 *      type: string
 *      description: Auto generated Id
 *      example: '1'
 *     full_name:
 *      type: string
 *      description: email of the Subscriber
 *     subject:
 *      type: string
 *     location:
 *      type: string
 *     email:
 *      type: string
 *     mobile:
 *      type: string
 *     msg:
 *      type: string
 *     created_date:
 *      type: date
 *      example: '2021-05-04'
 *     created_by:
 *      type: string
 *      example: 'Admin'
 *     modified_date:
 *      type: date
 *      example: '2021-05-04'
 *     modified_by:
 *      type: string
 *      example: 'Admin'
 *   DonationTypes:
 *    type: object
 *    required:
 *     - donation_type_id
 *     - donation_type
 *     - created_date
 *     - modified_date
 *    properties:
 *     donation_id:
 *      type: string
 *      description: Auto generated Id
 *      example: '1'
 *     donation_type:
 *      type: string
 *      description: donation type of the user
 *     created_date:
 *      type: date
 *      example: '2021-05-04'
 *     created_by:
 *      type: string
 *      example: 'Admin'
 *     modified_date:
 *      type: date
 *      example: '2021-05-04'
 *     modified_by:
 *      type: string
 *      example: 'Admin'
 *   Donations:
 *    type: object
 *    required:
 *     - dntn_type
 *     - first_name
 *     - last_name
 *     - email_id
 *     - mobile
 *     - dntn_amt
 *     - created_date
 *     - modified_date
 *    properties:
 *     dntn_type:
 *      type: integer
 *      description: donation type id
 *      example: '1'
 *     first_name:
 *      type: string
 *      example: 'string'
 *     last_name:
 *      type: string
 *      example: 'string'
 *     email_id:
 *      type: string
 *      example: 'example@gmail.com'
 *     mobile:
 *      type: string
 *      example: '123456789'
 *     gothram:
 *      type: string
 *      example: 'string'
 *     dntn_amt:
 *      type: bigint
 *      example: '1000'
 *     is_display:
 *      type: boolean
 *      example: 'true'
 *     is_approved:
 *      type: boolean
 *      example: 'false'
 *     created_date:
 *      type: date
 *      example: '2021-05-04'
 *     created_by:
 *      type: string
 *      example: 'Admin'
 *     modified_date:
 *      type: date
 *      example: '2021-05-04'
 *     modified_by:
 *      type: string
 *      example: 'Admin'
 *   Astrology_vastu:
 *    type: object
 *    required:
 *     - av_id
 *     - full_name
 *     - service_type
 *     - addres
 *     - email
 *     - mobile
 *     - msg
 *     - created_date
 *     - modified_date
 *    properties:
 *     full_name:
 *      type: string
 *      example: 'string'
 *     service_type:
 *      type: string
 *      example: 'string'
 *     addres:
 *      type: string
 *      example: 'string'
 *     email:
 *      type: string
 *      example: 'example@gmail.com'
 *     mobile:
 *      type: string
 *      example: '123456789'
 *     msg:
 *      type: string
 *      example: 'string'
 *     created_date:
 *      type: date
 *      example: '2021-05-04'
 *     created_by:
 *      type: string
 *      example: 'Admin'
 *     modified_date:
 *      type: date
 *      example: '2021-05-04'
 *     modified_by:
 *      type: string
 *      example: 'Admin'
 *   Pilgrim_services:
 *    type: object
 *    required:
 *     - pilgrm_id
 *     - srvc_name
 *     - srvc_date
 *     - no_of_persons
 *     - mobile
 *     - email
 *     - created_date
 *     - modified_date
 *    properties:
 *     srvc_name:
 *      type: string
 *      example: 'string'
 *     srvc_date:
 *      type: date
 *      example: '2021-02-10'
 *     no_of_persons:
 *      type: string
 *      example: '0'
 *     mobile:
 *      type: string
 *      example: '123456789'
 *     email:
 *      type: string
 *      example: 'example@gmail.com'
 *     is_items_req:
 *      type: boolean
 *      example: 'false'
 *     created_date:
 *      type: date
 *      example: '2021-05-04'
 *     created_by:
 *      type: string
 *      example: 'User'
 *     modified_date:
 *      type: date
 *      example: '2021-05-04'
 *     modified_by:
 *      type: string
 *      example: 'Admin'
 */

/**
 * @swagger
 * definitions:
 *  Subscriber:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'subscriber@gmail.com'
 *  ContactUs:
 *   type: object
 *   properties:
 *    full_name:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'    
 *    subject:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'    
 *    location:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'    
 *    email:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'
 *    mobile:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'
 *    msg:
 *     type: string
 *     description: email of the Subscriber
 *     example: 'string'
 *  DonationTypes:
 *   type: object
 *   properties:
 *    donation_type:
 *     type: string
 *     description: Type of Donation
 *     example: 'Food'    
 *    created_date:
 *     type: date
 *     example: '2021-05-04'
 *    created_by:
 *     type: string
 *     example: 'Admin'
 *    modified_date:
 *     type: date
 *     example: '2021-05-04'
 *    modified_by:
 *     type: string
 *     example: 'Admin'
 *  Donations:
 *   type: object
 *   properties:
 *    dntn_type:
 *     type: integer
 *     description: donation type id
 *     example: '1'
 *    first_name:
 *     type: string
 *     example: 'string'
 *    last_name:
 *     type: string
 *     example: 'string'
 *    email_id:
 *     type: string
 *     example: 'example@gmail.com'
 *    mobile:
 *     type: string
 *     example: '123456789'
 *    gothram:
 *     type: string
 *     example: 'string'
 *    dntn_amt:
 *     type: bigint
 *     example: '1000'
 *    is_display:
 *     type: boolean
 *     example: 'true'
 *    is_approved:
 *     type: boolean
 *     example: 'false'
 *    created_by:
 *     type: string
 *     example: 'Admin'
 *  Astrology_vastu:
 *   type: object
 *   properties:
 *    full_name:
 *     type: string
 *     example: 'string'
 *    service_type:
 *     type: string
 *     example: 'string'
 *    addres:
 *     type: string
 *     example: 'string'
 *    email:
 *     type: string
 *     example: 'example@gmail.com'
 *    mobile:
 *     type: string
 *     example: '123456789'
 *    msg:
 *     type: string
 *     example: 'string'
 *    created_by:
 *     type: string
 *     example: 'Admin'
 *    modified_by:
 *     type: string
 *     example: 'Admin'
 *  Pilgrim_services:
 *   type: object
 *   properties:
 *    srvc_name:
 *     type: string
 *     example: 'string'
 *    srvc_date:
 *     type: date
 *     example: '2021-01-11'
 *    no_of_persons:
 *     type: string
 *     example: '0'
 *    mobile:
 *     type: string
 *     example: '123456789'
 *    email:
 *     type: string
 *     example: 'example@gmail.com'
 *    is_items_req:
 *     type: boolean
 *     example: 'false'
 *    created_date:
 *     type: date
 *     example: '2021-05-04'
 *    created_by:
 *     type: string
 *     example: 'Admin'
 *    modified_date:
 *     type: date
 *     example: '2021-05-04'
 *    modified_by:
 *     type: string
 *     example: 'Admin'
 */

/**
 * @swagger
 * /api/Home/AddSubscriber:
 *  post:
 *   tags:
 *     - Home
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Subscriber'
 *   responses:
 *    200:
 *     description: success
 *     examples:
 *      application/json:
 *        schema:
 *         $ref: '#/definitions/Subscriber'
 */

exports.createSubscriber = async (req, res) => {
    try {
        const {
            email
        } = req.body;
        const newSubscriber = await pool.query(
            queries.createSubscriber,
            [email]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = newSubscriber.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = "Email already Exits",
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse);
    }
};

/**
 * @swagger
 * /api/Home/getAllSubscribers:
 *  get:
 *   tags:
 *     - Home
 *   responses:
 *    200:
 *     description: success
 */

exports.readAllSubscribers = async (req, res) => {
    try {
        const subscribers = await pool.query(queries.readAllSubscribers);
        apiResponse.message = "success",
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = subscribers.rows,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.data = null,
            apiResponse.message = err,
            apiResponse.statusCode = res.statusCode;
        return apiResponse; //res.status(500).send(err);
    }
}

/**
 * @swagger
 * /api/Home/health:
 *  get:
 *   tags:
 *     - Home
 *   responses:
 *    200:
 *     description: success
 */

exports.checkHealth = async (req, res) => {
    res.status(200).send({
        message: "working..."
    });
}


/**
 * @swagger
 * /api/Home/AddContactUs:
 *  post:
 *   tags:
 *    - Home
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ContactUs'
 *   responses:
 *    200:
 *     description: success
 *     examples:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ContactUs'
 */

exports.createContacts = async (req, res) => {
    try {
        const {
            full_name,
            subject,
            location,
            email,
            mobile,
            msg
        } = req.body;
        const contacts = await pool.query(
            queries.createContacts,
            [full_name, subject, location, email, mobile, msg]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = contacts.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err.detail,
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse); //return res.status(500).send(err);
    }
}

/**
 * @swagger
 * /api/Home/getAllDonationTypes:
 *  get:
 *   tags:
 *     - Home
 *   responses:
 *    200:
 *     description: success
 */

exports.readAllDonationTypes = async (req, res) => {
    try {
        logger.info('readAllDonationTypes');
        logger.info(queries.readAllDonationTypes);
        const donationTypes = await pool.query(queries.readAllDonationTypes);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = donationTypes.rows,
            res.json(apiResponse);

    } catch (err) {
        apiResponse.data = null,
            apiResponse.message = err.message,
            apiResponse.success = false;
        logger.error(apiResponse);
        return apiResponse; //res.status(500).send(err);
    }
}

/**
 * @swagger
 * /api/Home/AddDonations:
 *  post:
 *   tags:
 *    - Home
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Donations'
 *   responses:
 *    200:
 *     description: success
 *     examples:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Donations'
 */

exports.addDonations = async (req, res) => {
    try {
        const {
            dntn_type,
            first_name,
            last_name,
            email_id,
            mobile,
            gothram,
            dntn_amt,
            is_display,
            is_approved,
            created_by
        } = req.body;
        const newDonations = await pool.query(
            queries.addDonations,
            [dntn_type, first_name, last_name, email_id, mobile, gothram, dntn_amt, is_display, is_approved, created_by]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = newDonations.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse); //return res.status(500).send(err);
    }
}

/**
 * @swagger
 * /api/Home/getAllDonations:
 *  get:
 *   tags:
 *    - Home
 *   responses:
 *    200:
 *     description: success
 */

exports.readAllDonations = async (req, res) => {
    try {
        const donations = await pool.query(queries.readAllDonations);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = donations.rows,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.data = null,
            apiResponse.message = err,
            apiResponse.success = false;
        return apiResponse; //res.status(500).send(err);
    }
}

/**
 * @swagger
 * /api/Home/AddAstrologyVastuServices:
 *  post:
 *   tags:
 *    - Home
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Astrology_vastu'
 *   responses:
 *    200:
 *     description: success
 *     examples:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Astrology_vastu'
 */

exports.createAVService = async (req, res) => {
    try {
        const {
            full_name,
            service_type,
            addres,
            email,
            mobile,
            msg,
            created_by,
            modified_by
        } = req.body;
        const AsrlgyVstuSer = await pool.query(
            queries.createAVService,
            [full_name, service_type, addres, email, mobile, msg, created_by, modified_by]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = AsrlgyVstuSer.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err.detail,
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse); //return res.status(500).send(err);
    }
}

/**
 * @swagger
 * /api/Home/AddPiligrimService:
 *  post:
 *   tags:
 *    - Home
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Pilgrim_services'
 *   responses:
 *    200:
 *     description: success
 *     examples:
 *      application/json:
 *        schema:
 *         $ref: '#/definitions/Pilgrim_services'
 */

exports.createPilgrimService = async (req, res) => {
    try {
        const {
            srvc_name,
            srvc_date,
            no_of_persons,
            mobile,
            email,
            is_items_req,
            created_by,
            modified_by
        } = req.body;
        const newPilgrimService = await pool.query(
            queries.createPilgrimService,
            [srvc_name, srvc_date, no_of_persons, mobile, email, is_items_req, created_by, modified_by]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = newPilgrimService.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err.detail,
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse);
    }
};

/**
 * @swagger
 * /api/Home/getAllPilgrmSrvcs:
 *  get:
 *   tags:
 *    - Home
 *   responses:
 *    200:
 *     description: success
 */

exports.getAllPilgrmSrvcs = async (req, res) => {
    try {
        const pilgrmSrvcs = await pool.query(queries.getAllPilgrmSrvcs);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = pilgrmSrvcs.rows,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.data = null,
            apiResponse.message = err,
            apiResponse.success = true;
        return apiResponse; //res.status(500).send(err);
    }
}

/**
 * @swagger
 * /api/Home/updatePilgrmServices/{pilgrm_id}:
 *  put:
 *   tags:
 *    - Home
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: pilgrm_id
 *      schema:
 *       type: string
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Pilgrim_services'
 *   responses:
 *    200:
 *     description: success
 *     content: 
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Pilgrim_services'
 */

exports.updatePilgrmService = async (req, res) => {
    try {
        const {
            pilgrm_id
        } = req.params;
        const {
            srvc_name,
            srvc_date,
            no_of_persons,
            mobile,
            email,
            is_items_req,
            created_date,
            created_by,
            modified_by
        } = req.body;
        const updatePilgrimService = await pool.query(queries.updatePilgrmService,
            [srvc_name, srvc_date, no_of_persons, mobile, email, is_items_req, created_date, created_by, modified_by, pilgrm_id]
        );
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = updatePilgrimService.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse);
    }
}