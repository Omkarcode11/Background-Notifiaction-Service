const notificationController = require('../controller/ticketNotification.controller')
const { validateNotification, validateNotificationId } = require('../middlewares/validateNotification')

module.exports = function (app) {
    app.post('/notificationService/api/v1/notifications', validateNotification, notificationController.acceptNotification)
    app.get("/notificationService/api/v1/notifications/:id", notificationController.getNotification)
    app.post("/notificationService/api/v1/notifications/send/email", notificationController.sendEmail)
}