const {
    readAllSubscribers,
    createSubscriber,
    readAllDonationTypes,
    createContacts,
    addDonations,
    readAllDonations,
    createAVService,
    getAllPilgrmSrvcs,
    updatePilgrmService,
    createPilgrimService,
    checkHealth
} = require("../controllers/homeController");

const {
    createAdmin,
    updateDonation,
    deleteDonation,
    readAllEventTypes,
    createEventType,
    updateEventType,
    deleteEventType,
    createEvent,
    getAllEvents,
    updateEvent,
    deleteEvent,
    getAllAVServices,
    updateAVService,
    deleteAVService,
    adminLoginCredentials,
    getAllUsers,
    deleteUser,
    getAllPanchangam,
    createPanchangam,
    updatePanchangam,
    deletePanchangam,
    getAllServicesAtTemple,
    createServicesAtTemple,
    updateServicesAtTemple,
    deleteServicesAtTemple
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
    app.get('/api/Home/getAllDonationTypes', readAllDonationTypes);
    app.post('/api/Admin/Authenticate', createAdmin);
    app.post('/api/Home/AddSubscriber', createSubscriber);
    app.post('/api/Home/AddContactUs', createContacts);
    app.post('/api/Home/AddDonations', addDonations);
    app.get('/api/Home/getAllDonations', readAllDonations);
    app.get('/api/Home/health', checkHealth);

    app.put('/api/Admin/updateDonations/:donation_id', verifyToken, updateDonation);
    app.delete('/api/Admin/DeleteDonations/:donation_id', verifyToken, deleteDonation);

    app.get('/api/Admin/getAllEventTypes', readAllEventTypes);
    app.post('/api/Admin/AddEventType', createEventType);
    app.put('/api/Admin/UpdateEventType/:event_type_id', updateEventType);
    app.delete('/api/Admin/DeleteEventType/:event_type_id', deleteEventType);

    app.post('/api/Admin/AddEvent', verifyToken, createEvent);
    app.get('/api/Admin/getAllEvents', verifyToken, getAllEvents);
    app.put('/api/Admin/updateEvents/:event_id', verifyToken, updateEvent);
    app.delete('/api/Admin/DeleteEvent/:event_id', verifyToken, deleteEvent);

    app.post('/api/Home/AddAstrologyVastuServices', createAVService);
    app.get('/api/Admin/getAllAstrologyVastuServices', verifyToken, getAllAVServices);
    app.put('/api/Admin/updateAVServices/:av_id', verifyToken, updateAVService);
    app.delete('/api/Admin/DeleteAVService/:av_id', verifyToken, deleteAVService);

    app.post('/api/Home/AddPiligrimService', createPilgrimService);
    app.get('/api/Home/getAllPilgrmSrvcs', getAllPilgrmSrvcs);
    app.put('/api/Home/updatePilgrmServices/:pilgrm_id', updatePilgrmService);

    app.post('/api/Admin/login', adminLoginCredentials);
    app.post('/api/User/Authenticate', createUser);
    app.post('/api/User/login', userLoginCredentials);

    app.get('/api/Admin/getAllUsers', verifyToken, getAllUsers);
    app.delete('/api/Admin/DeleteUser/:user_id', verifyToken, deleteUser);
    app.put('/api/User/updateUser/:user_id', updateUser);
    app.get('/api/User/getUserById/:user_id', getUserById);

    app.get('/api/Admin/getAllPanchangam', getAllPanchangam);
    app.post('/api/Admin/AddPanchangam', createPanchangam);
    app.put('/api/Admin/UpdatePanchangam/:panchangam_id', updatePanchangam);
    app.delete('/api/Admin/DeletePanchangam/:panchangam_id', deletePanchangam);

    app.get('/api/Admin/getAllServicesAtTemple', getAllServicesAtTemple);
    app.post('/api/Admin/AddServicesAtTemple', createServicesAtTemple);
    app.put('/api/Admin/UpdateServicesAtTemple/:service_at_temple_id', updateServicesAtTemple);
    app.delete('/api/Admin/DeleteServicesAtTemple/:service_at_temple_id', deleteServicesAtTemple);

    app.use('/api/users', userRoutes);
}