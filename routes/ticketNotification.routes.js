const notificationController = require('../controller/ticketNotification.controller')

module.exports = function (app){
    app.post('/notificationService/api/v1/notifications',notificationController.acceptNotification)
    app.get("/notificationService/api/v1/notifications/:id",notificationController.getNotification)
    app.get("/notificationService/api/v1/notifications/send/email/:id",notificationController.sendEmail)
}