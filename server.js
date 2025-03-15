const express = require('express');
const app = express();
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const jwt = require('jsonwebtoken');
const logger = require('./logger');
const folderPath = './uploads/';
const fs = require('fs');

app.use(express.json());
app.use(cors());

const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/upload', upload.single('file'), (req, res, next) => {
    try {
        return res.status(201).json({
            statusCode:200,
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});

 app.use('/images',express.static('uploads'));  
// app.use(bodyParser.json({limit:'50mb'}));
// app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:1000000}));
fs.readdirSync(folderPath).forEach(file => {
    data = file;
    console.log(file);
  })
app.get('/images', (req, res) => {
    res.status(200).send({data})});

var corsOptions = {
    origin: 'http://example.com',
    optionSuccessStatus: 200
}

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SLNST API',
            version: '1.0.0',
            description: 'SLNST Management Api',
        },
        // servers: [{
        //     url: "http://localhost:5000"
        // }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
    },
    apis: ["./controllers/*js"]
}

const mountRoutes = require('./Routes');
mountRoutes(app)

const PORT = process.env.PORT || 5000;
const swaggerDocs = swaggerJsDoc(swaggerOptions);

logger.info('---------Start page ---------');
//hidding swagger by default. change production to true for swagger
production = true;

if (production == false) {
    console.log('prod');
} else {
    console.log('dev');
    app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
    app.listen(PORT, () => console.log(`Listening on port - ${PORT}`));
}
