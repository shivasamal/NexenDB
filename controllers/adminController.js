const pool = require("../DB/index");
const queries = require("../Queries/adminqueries");
const jwt = require("jsonwebtoken");

var apiResponse = {
    data: Object,
    message: String,
    token: Object,
    success: Boolean,
    statusCode: Number
}

/**
 * @swagger
 * components:
 *  schemas:
 *   Admin:
 *    type: object
 *    required:
 *     - admin_id
 *     - first_name
 *     - last_name
 *     - mobile
 *     - email
 *     - pwd
 *     - created_date
 *     - modified_date
 *    properties:
 *     first_name:
 *      type: string
 *      description: first name of the admin
 *      example: 'Alasteir'
 *     last_name:
 *      type: string
 *      description: lastName of the admin
 *      example: 'Wingham'
 *     mobile:
 *      type: string
 *      description: mobile of the admin
 *      example: '9621478953'
 *     email:
 *      type: string
 *      description: mail id of the admin
 *      example: 'AlasteirWingham@gmail.com'
 *     pwd:
 *      type: string
 *      description: password of the admin
 *      example: 'xxxxxxxxxxx'
 *     created_date:
 *      type: date
 *      example: '2021-05-04'
 *     created_by:
 *      type: string
 *      example: 'Admin'
 *     modified_date:
 *      type: date
 *      example: '2021-05-04 22:07:39'
 *     modified_by:
 *      type: string
 *      example: 'Admin'
 */

/**
 * @swagger
 * definitions:
 *  Admin:
 *   type: object
 *   properties:
 *    first_name:
 *     type: string
 *     description: first name of the admin
 *     example: 'Alasteir'
 *    last_name:
 *     type: string
 *     description: lastName of the admin
 *     example: 'Wingham'
 *    mobile:
 *     type: string
 *     description: mobile of the admin
 *     example: '9621478953'
 *    email:
 *     type: string
 *     description: mail id of the admin
 *     example: 'AlasteirWingham@gmail.com'
 *    pwd:
 *     type: string
 *     description: password of the admin
 *     example: 'xxxxxxxxxxx'
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
 *    created_date:
 *     type: date
 *     example: '2021-01-01'
 *    created_by:
 *     type: string
 *     example: 'Admin'
 *    modified_date:
 *     type: date
 *     example: '2021-05-04'
 *    modified_by:
 *     type: string
 *     example: 'Admin'
 *  Events:
 *   type: object
 *   properties:
 *    event_type:
 *     type: integer
 *     description: event type id
 *     example: '1'
 *    description:
 *     type: string
 *     example: 'pooja'
 *    event_date:
 *     type: date
 *     example: '16-11-2021'
 *    event_name:
 *     type: string
 *     example: 'kunkuma puja'
 *    start_time:
 *     type: time
 *     example: '05:05:00'
 *    end_time:
 *     type: time
 *     example: '16:00:09'
 *    created_by:
 *     type: string
 *     example: 'Admin'
 *    modified_by:
 *     type: string
 *     example: 'Admin'
 *  EventTypes:
 *   type: object
 *   properties:
 *    event_type:
 *     type: string
 *     description: event type name
 *     example: 'Event Type'
 *    created_by:
 *     type: string
 *     example: 'Admin'
 *    modified_by:
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
 *  Admin_Login:
 *   type: object
 *   properties:
 *    email:
 *     type: string
 *     example: 'string'
 *    pwd:
 *     type: string
 *     example: 'string'
 *  Panchangam:
 *   type: object
 *   properties:
 *    tithi:
 *     type: string
 *     example: 'Tithi'
 *    nakshatra:
 *     type: string
 *     example: 'nakshatra'
 *    yoga:
 *     type: string
 *     example: 'yoga'
 *    yamagandam:
 *     type: string
 *     example: 'yamagandam'
 *    rahukalam:
 *     type: string
 *     example: 'rahukalam'
 *    varjyam:
 *     type: string
 *     example: 'varjyam'
 *    surodayam:
 *     type: string
 *     example: '05:05:00'
 *    suryastamam:
 *     type: string
 *     example: '05:05:00'
 *    panchangam_date:
 *     type: date
 *     example: '16-11-2021'
 *    created_by:
 *     type: string
 *     example: 'Admin'
 *    modified_by:
 *     type: string
 *     example: 'Admin'
 *  Service_At_Temple:
 *   type: object
 *   properties:
 *    type_of_service:
 *     type: string
 *     example: 'service'
 *    service_date:
 *     type: date
 *     example: ''
 *    pooja_description:
 *     type: string
 *     example: 'pooja......'
 *    amount:
 *     type: integer
 *     example: 10
 *    no_of_tickets:
 *     type: integer
 *     example: 5
 *    pooja_name:
 *     type: string
 *     example: 'pooja name'
 *    pooja_image:
 *     type: image
 *     example: ''
 */

/**
 * @swagger
 * /api/Admin/Authenticate:
 *  post:
 *   tags:
 *     - Admin
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Admin'
 *   responses:
 *    200:
 *     description: success
 */

exports.createAdmin = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            mobile,
            email,
            pwd
        } = req.body;
        console.log(req.body);
        const newAdmin = await pool.query(queries.createAdmin, [first_name, last_name, mobile, email, pwd]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = newAdmin.rows[0],
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
 * /api/Admin/login:
 *  post:
 *   tags:
 *    - Admin
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Admin_Login'
 *   responses:
 *    200:
 *     description: success
 */

exports.adminLoginCredentials = async (req, res) => {
    try {
        const {
            email,
            pwd
        } = req.body;
        const adminCredentials = await pool.query(queries.adminLoginCredentials, [email, pwd]);
        if (adminCredentials.rows[0] == null) {
            apiResponse.data = null;
            apiResponse.message = "Invalid Credentials";
            apiResponse.success = false;
        } else if (adminCredentials.rows[0] != null) {
            
            const user = {
                email: req.body.email,
                pwd: req.body.pwd
            };
            // jwt.sign({user},'secretkey',(err,token)=>{ config.secret
            //     res.json({token}); 86400
            // })
              //res.status(200).send({ auth: true, token: token,apiResponse: adminCredentials.rows[0], });
             var token =  jwt.sign({user}, 'secretkey',  {
                expiresIn: "900s" // expires in 15 min
            });
            res.status(200).send({ auth: true, token: token, data:adminCredentials.rows[0],message:"success",success:true});

            apiResponse.data = adminCredentials.rows[0],
                apiResponse.message = "success",
                apiResponse.token = token[0],
                apiResponse.success = true
        } else {
            apiResponse.data = null;
            apiResponse.message = err.detail;
            apiResponse.success = false;
        }
        res.json(apiResponse);
    } catch (err) {
        apiResponse.data = null,
            apiResponse.message = err.detail,
            apiResponse.statusCode = res.statusCode;
        return apiResponse; //res.status(500).send(err);
    }
}


/**
 * @swagger
 * /api/Admin/updateDonations/{donation_id}:
 *  put:
 *   tags:
 *    - Admin
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: donation_id
 *      schema:
 *       type: string
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Donations'
 *   responses:
 *    200:
 *     description: success
 *     content: 
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Donations'
 */

exports.updateDonation = async (req, res) => {
    try {
        const {
            donation_id
        } = req.params;
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
            modified_by
        } = req.body;
        const updateDonation = await pool.query(queries.updateDonation,
            [dntn_type, first_name, last_name, email_id, mobile, gothram, dntn_amt, is_display, is_approved, modified_by, donation_id]
        );
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = updateDonation.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse);
    }
}

/**
 * @swagger
 * /api/Admin/DeleteDonations/{donation_id}:
 *  delete:
 *   tags:
 *    - Admin
 *   parameters:
 *    - in: path
 *      name: donation_id
 *      schema:
 *       type: integer
 *      required: true
 *   responses:
 *    200:
 *     description: success
 */
exports.deleteDonation = async (req, res) => {
    try {
        const {
            donation_id
        } = req.params;
        const deleteTeam = await pool.query(queries.deleteDonation, [donation_id]);
        apiResponse.message = "Deleted Successfully",
            apiResponse.statusCode = res.statusCode,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.statusCode = res.statusCode,
            res.json(apiResponse);
        //console.error(err.message);
    }
}

/**
 * @swagger
 * /api/Admin/getAllEventTypes:
 *  get:
 *   tags:
 *    - Admin
 *   responses:
 *    200:
 *     description: success
 */

exports.readAllEventTypes = async (req, res) => {
    try {
        const events = await pool.query(queries.readAllEventTypes);
        apiResponse.message = "success",
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = events.rows,
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
 * /api/Admin/AddEventType:
 *  post:
 *   tags:
 *     - Admin
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/EventTypes'
 *   responses:
 *    200:
 *     description: success
 */

exports.createEventType = async (req, res) => {
    try {
        const {
            event_type, created_by, modified_by
        } = req.body;
        console.log(req.body);

        const newEventType = await pool.query(queries.createEventType,[event_type, created_by, modified_by]);

        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = newEventType.rows[0],
            res.json(apiResponse);
    } catch (err) {

        apiResponse.message = err.detail,
            apiResponse.success = false,
            apiResponse.data = null;
        return res.status(500).send(err);
        // res.json(apiResponse); 
    }
}

/**
 * @swagger
 * /api/Admin/UpdateEventType/{event_type_id}:
 *  put:
 *   tags:
 *    - Admin
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: event_type_id
 *      schema:
 *       type: string
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/EventTypes'
 *   responses:
 *    200:
 *     description: success
 *     content: 
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/EventTypes'
 */

 exports.updateEventType = async (req, res) => {
    try {
        const {
            event_type_id
        } = req.params;
        const {
            event_type,
            created_by,
            modified_by
        } = req.body;
        const updateEventType = await pool.query(queries.updateEventType,
            [event_type, created_by, modified_by, event_type_id]
        );
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = updateEventType.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse);
    }
}

/**
 * @swagger
 * /api/Admin/DeleteEventType/{event_type_id}:
 *  delete:
 *   tags:
 *    - Admin
 *   parameters:
 *    - in: path
 *      name: event_type_id
 *      schema:
 *       type: integer
 *      required: true
 *   responses:
 *    200:
 *     description: success
 */
exports.deleteEventType = async (req, res) => {
    try {
        const {
            event_type_id
        } = req.params;
        const deleteEventType = await pool.query(queries.deleteEventType, [event_type_id]);
        apiResponse.message = "Deleted Successfully",
            apiResponse.success = true,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false,
            res.json(apiResponse);
        //console.error(err.message);
    }
}

/**
 * @swagger
 * /api/Admin/AddEvent:
 *  post:
 *   tags:
 *    - Admin
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Events'
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */

exports.createEvent = async (req, res) => {
    try {
        const {
            event_type,
            description,
            event_date,
            event_name,
            start_time,
            end_time,
            created_by,
            modified_by
        } = req.body;
        const newEvent = await pool.query(
            queries.createEvent,
            [event_type, description, event_date, event_name, start_time, end_time, created_by, modified_by]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = newEvent.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err.detail,
            apiResponse.success = false,
            apiResponse.data = null;
        return res.status(500).send(err);
        // res.json(apiResponse); 
    }
}

/**
 * @swagger
 * /api/Admin/getAllEvents:
 *  get:
 *   tags:
 *    - Admin
 *   responses:
 *    200:
 *     description: success
 */

exports.getAllEvents = async (req, res) => {
    try {
        const events = await pool.query(queries.getAllEvents);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = events.rows,
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
 * /api/Admin/updateEvents/{event_id}:
 *  put:
 *   tags:
 *    - Admin
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: event_id
 *      schema:
 *       type: string
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Events'
 *   responses:
 *    200:
 *     description: success
 *     content: 
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Events'
 */

exports.updateEvent = async (req, res) => {
    try {
        const {
            event_id
        } = req.params;
        const {
            evnt_type,
            description,
            event_date,
            event_name,
            start_time,
            end_time,
            created_date,
            created_by,
            modified_date,
            modified_by
        } = req.body;
        const updateDonation = await pool.query(queries.updateEvent,
            [evnt_type, description, event_date, event_name, start_time, end_time, created_date, created_by, modified_date, modified_by, event_id]
        );
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = updateDonation.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false,
            apiResponse.data = null;
        res.json(apiResponse);
    }
}

/**
 * @swagger
 * /api/Admin/DeleteEvent/{event_id}:
 *  delete:
 *   tags:
 *    - Admin
 *   parameters:
 *    - in: path
 *      name: event_id
 *      schema:
 *       type: integer
 *      required: true
 *   responses:
 *    200:
 *     description: success
 */
exports.deleteEvent = async (req, res) => {
    try {
        const {
            event_id
        } = req.params;
        const deleteTeam = await pool.query(queries.deleteEvent, [event_id]);
        apiResponse.message = "Deleted Successfully",
            apiResponse.success = true,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false,
            res.json(apiResponse);
        //console.error(err.message);
    }
}

/**
 * @swagger
 * /api/Admin/getAllAstrologyVastuServices:
 *  get:
 *   tags:
 *    - Admin
 *   responses:
 *    200:
 *     description: success
 */

exports.getAllAVServices = async (req, res) => {
    try {
        const avServices = await pool.query(queries.getAllAVServices);
        apiResponse.message = "success",
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = avServices.rows,
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
 * /api/Admin/updateAVServices/{av_id}:
 *  put:
 *   tags:
 *    - Admin
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: av_id
 *      schema:
 *       type: string
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Astrology_vastu'
 *   responses:
 *    200:
 *     description: success
 *     content: 
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Astrology_vastu'
 */

exports.updateAVService = async (req, res) => {
    try {
        const {
            av_id
        } = req.params;
        const {
            full_name,
            service_type,
            addres,
            email,
            mobile,
            msg,
            created_date,
            created_by,
            modified_date,
            modified_by
        } = req.body;
        const updateAVService = await pool.query(queries.updateAVService,
            [full_name, service_type, addres, email, mobile, msg, created_date, created_by, modified_date, modified_by, av_id]
        );
        apiResponse.message = "success",
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = updateAVService.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = null;
        res.json(apiResponse);
    }
}

/**
 * @swagger
 * /api/Admin/DeleteAVService/{av_id}:
 *  delete:
 *   tags:
 *    - Admin
 *   parameters:
 *    - in: path
 *      name: event_id
 *      schema:
 *       type: integer
 *      required: true
 *   responses:
 *    200:
 *     description: success
 */
exports.deleteAVService = async (req, res) => {
    try {
        const {
            av_id
        } = req.params;
        const deleteAVService = await pool.query(queries.deleteAVService, [av_id]);
        apiResponse.message = "Deleted Successfully",
            apiResponse.statusCode = res.statusCode,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.statusCode = res.statusCode,
            res.json(apiResponse);
    }
}

/**
 * @swagger
 * /api/Admin/getAllUsers:
 *  get:
 *   tags:
 *    - Admin
 *   responses:
 *    200:
 *     description: success
 */

exports.getAllUsers = async (req, res) => {
    try {
        const users = await pool.query(queries.getAllUsers);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = users.rows,
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
 * /api/Admin/DeleteUser/{user_id}:
 *  delete:
 *   tags:
 *    - Admin
 *   parameters:
 *    - in: path
 *      name: user_id
 *      schema:
 *       type: integer
 *      required: true
 *   responses:
 *    200:
 *     description: success
 */
exports.deleteUser = async (req, res) => {
    try {
        const {
            user_id
        } = req.params;
        let data = {};
        const deleteUser = await pool.query(queries.deleteUser, [user_id]);
        data = deleteUser.rowCount;
        if (data != 0) {
            apiResponse.message = "Deleted Successfully",
                apiResponse.success = true;
            apiResponse.data = [];
        } else {
            apiResponse.data = [];
            apiResponse.message = "No user with this id",
                apiResponse.success = false;
        }
        res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false;
        res.json(500).json(error);
    }
}

/**
 * @swagger
 * /api/Admin/getAllPanchangam:
 *  get:
 *   tags:
 *    - Admin
 *   responses:
 *    200:
 *     description: success
 */

 exports.getAllPanchangam = async (req, res) => {
    try {
        const panchangam = await pool.query(queries.getAllPanchangam);
        apiResponse.message = "success",
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = panchangam.rows,
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
 * /api/Admin/AddPanchangam:
 *  post:
 *   tags:
 *     - Admin
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Panchangam'
 *   responses:
 *    200:
 *     description: success
 */

exports.createPanchangam = async (req, res) => {
    try {
        const {
            tithi,nakshatra,yoga,yamagandam,rahukalam,varjyam,surodayam,suryastamam,panchangam_date, created_by, modified_by
        } = req.body;
        const newPanchangam = await pool.query(queries.createPanchangam,[tithi,nakshatra,yoga,yamagandam,rahukalam,varjyam,surodayam,suryastamam,panchangam_date, created_by, modified_by]);
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = newPanchangam.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err.detail,
            apiResponse.success = false,
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = null;
        return res.status(500).send(err);
        // res.json(apiResponse); 
    }
}

/**
 * @swagger
 * /api/Admin/UpdatePanchangam/{panchangam_id}:
 *  put:
 *   tags:
 *    - Admin
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: panchangam_id
 *      schema:
 *       type: string
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Panchangam'
 *   responses:
 *    200:
 *     description: success
 *     content: 
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Panchangam'
 */

 exports.updatePanchangam = async (req, res) => {
    try {
        const {
            panchangam_id
        } = req.params;
        const {
            tithi,nakshatra,yoga,yamagandam,rahukalam,varjyam,surodayam,suryastamam,panchangam_date,created_by, modified_by
        } = req.body;
        const updatePanchangam = await pool.query(queries.updatePanchangam,
            [tithi,nakshatra,yoga,yamagandam,rahukalam,varjyam,surodayam,suryastamam,panchangam_date,created_by, modified_by, panchangam_id]
        );
        apiResponse.message = "success",
            apiResponse.success = true,
            apiResponse.data = updatePanchangam.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false,
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = null;
        res.json(apiResponse);
    }
}

/**
 * @swagger
 * /api/Admin/DeletePanchangam/{panchangam_id}:
 *  delete:
 *   tags:
 *    - Admin
 *   parameters:
 *    - in: path
 *      name: panchangam_id
 *      schema:
 *       type: integer
 *      required: true
 *   responses:
 *    200:
 *     description: success
 */
exports.deletePanchangam = async (req, res) => {
    try {
        const {
            panchangam_id
        } = req.params;
        const deletePanchangam = await pool.query(queries.deletePanchangam, [panchangam_id]);
        apiResponse.message = "Deleted Successfully",
            apiResponse.success = true,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false,
            apiResponse.statusCode = res.statusCode,
            res.json(apiResponse);
        //console.error(err.message);
    }
}

/**
 * @swagger
 * /api/Admin/getAllServicesAtTemple:
 *  get:
 *   tags:
 *    - Admin
 *   responses:
 *    200:
 *     description: success
 */

 exports.getAllServicesAtTemple = async (req, res) => {
    try {
        const servicesAtTemple = await pool.query(queries.getAllServicesAtTemple);
        apiResponse.message = "success",
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = servicesAtTemple.rows,
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
 * /api/Admin/AddServicesAtTemple:
 *  post:
 *   tags:
 *     - Admin
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Service_At_Temple'
 *   responses:
 *    200:
 *     description: success
 */

exports.createServicesAtTemple = async (req, res) => {
    try {
        const {
            type_of_service,service_date,pooja_description,amount,no_of_tickets,pooja_name,pooja_image
        } = req.body;
        const newServiceAtTemple = await pool.query(queries.createServicesAtTemple,[type_of_service,service_date,pooja_description,amount,no_of_tickets,pooja_name,pooja_image]);
        apiResponse.message = "success",
        apiResponse.statusCode = res.statusCode,
            apiResponse.success = true,
            apiResponse.data = newServiceAtTemple.rows[0],
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err.detail,
            apiResponse.success = false,
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = null;
        return res.status(500).send(err);
        // res.json(apiResponse); 
    }
}

/**
 * @swagger
 * /api/Admin/UpdateServicesAtTemple/{service_at_temple_id}:
 *  put:
 *   tags:
 *    - Admin
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: service_at_temple_id
 *      schema:
 *       type: string
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Service_At_Temple'
 *   responses:
 *    200:
 *     description: success
 *     content: 
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Service_At_Temple'
 */

 exports.updateServicesAtTemple = async (req, res) => {
    try {
        const {
            service_at_temple_id
        } = req.params;
        const {
            type_of_service,service_date,pooja_description,amount,no_of_tickets,pooja_name,pooja_image
        } = req.body;
        const updateServicesAtTemple = await pool.query(queries.updateServicesAtTemple,
            [type_of_service,service_date,pooja_description,amount,no_of_tickets,pooja_name,pooja_image, service_at_temple_id]
        );
        apiResponse.data = updateServicesAtTemple.rows[0],
        apiResponse.message = "success",
            apiResponse.success = true,
        apiResponse.statusCode = res.statusCode,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false,
            apiResponse.statusCode = res.statusCode,
            apiResponse.data = null;
        res.json(apiResponse);
    }
}

/**
 * @swagger
 * /api/Admin/DeleteServicesAtTemple/{service_at_temple_id}:
 *  delete:
 *   tags:
 *    - Admin
 *   parameters:
 *    - in: path
 *      name: service_at_temple_id
 *      schema:
 *       type: integer
 *      required: true
 *   responses:
 *    200:
 *     description: success
 */
exports.deleteServicesAtTemple = async (req, res) => {
    try {
        const {
            service_at_temple_id
        } = req.params;
        const deleteServicesAtTemple = await pool.query(queries.deleteServicesAtTemple, [service_at_temple_id]);
        apiResponse.message = "Deleted Successfully",
        apiResponse.statusCode = res.statusCode,
            apiResponse.success = true,
            res.json(apiResponse);
    } catch (err) {
        apiResponse.message = err,
            apiResponse.success = false,
            apiResponse.statusCode = res.statusCode,
            res.json(apiResponse);
    }
}