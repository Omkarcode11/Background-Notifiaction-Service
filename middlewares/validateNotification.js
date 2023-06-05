let mongoose = require('mongoose')
let objectId = mongoose.Types.ObjectId

exports.validateNotification = (req, res, next) => {
    if (!req.body.ticketId || !objectId.isValid(req.body.ticketId))
        return res.status(400).send("Provide ticket Id")
    else if (!req.body.subject || req.body.subject <= 5)
        return res.status(400).send("Provide subject must be greater than 5 char")
    else if (!req.body.content || req.body.content <= 5)
        return res.status(400).send("Provide content must be greater than 5 char")
    else if (!req.body.recipientEmails)
        return res.status(400).send("Provide recipientEmails")
    else if (!req.body.requester)
        return res.status(400).send("Provide requester")
    else {
        next()
    }
}



exports.validateNotificationId = (req, res, next) => {
    if (objectId.isValid(req.params.id)) {
        next()
    }
    return res.status(400).send("Invalid notification Id")
}