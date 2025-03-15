const {
    readAllSubscribers,
    createSubscriber,
    createContacts,
    checkHealth
} = require("../controllers/homeController");

const {
    createAdmin,
    adminLoginCredentials,
    getAllUsers,
    deleteUser,
} = require("../controllers/adminController");

const {
    userLoginCredentials,
    createUser,
    updateUser,
    getUserById
} = require("../controllers/userController");

const userRoutes = require("../Models/routes");

const verifyToken = require("../token");

module.exports = app => {
    app.get('/api/Home/getAllSubscribers', readAllSubscribers);
    app.post('/api/Admin/Authenticate', createAdmin);
    app.post('/api/Home/AddSubscriber', createSubscriber);
    app.post('/api/Home/AddContactUs', createContacts);
    app.get('/api/Home/health', checkHealth);

    app.post('/api/Admin/login', adminLoginCredentials);
    app.post('/api/User/Authenticate', createUser);
    app.post('/api/User/login', userLoginCredentials);

    app.get('/api/Admin/getAllUsers', verifyToken, getAllUsers);
    app.delete('/api/Admin/DeleteUser/:user_id', verifyToken, deleteUser);
    app.put('/api/User/updateUser/:user_id', updateUser);
    app.get('/api/User/getUserById/:user_id', getUserById);

    app.use('/api/users', userRoutes);
}