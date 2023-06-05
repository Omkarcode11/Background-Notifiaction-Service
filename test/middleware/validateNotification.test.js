const { validateNotification, validateNotificationId } = require("../../middlewares/validateNotification");
const { mockReq, mockRes, mockNext } = require("../interceptor");


let notificationObj = {
    ticketId: "594ced02ed345b2b049222c5",
    subject: "ticket Create",
    content: "you ticket regard not working button is created",
    recipientEmails: "omkar@gmail.com",
    requester: 'omkar'
}
describe('validateNotification ', () => {

    it('should pass validateNotification', async () => {
        let req = mockReq()
        let res = mockRes()
        let next = mockNext()
        req.body = Object.assign({},notificationObj)

        await validateNotification(req, res, next)

        expect(next).toHaveBeenCalled()


    });

    it('should not validateNotification due not pass proper TicketId', async () => {
        let req = mockReq()
        let res = mockRes()
        let next = mockNext()

        await validateNotification(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith('Provide ticket Id')


    });

    it('should not validateNotification due not pass proper subject', async () => {
        let req = mockReq()
        let res = mockRes()
        let next = mockNext()
        let obj = Object.assign({}, notificationObj)
        obj.subject = ''
        req.body = obj

        await validateNotification(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith('Provide subject must be greater than 5 char')



    });

    it('should not validateNotification due not pass proper content', async () => {

        let req = mockReq()
        let res = mockRes()
        let next = mockNext()
        let obj = Object.assign({}, notificationObj)
        obj.content = ''
        req.body = obj

        await validateNotification(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith('Provide content must be greater than 5 char')

    });

    it('should not validateNotification due not pass proper recipientEmails', async () => {
        let req = mockReq()
        let res = mockRes()
        let next = mockNext()
        let obj = Object.assign({}, notificationObj)
        obj.recipientEmails = ''
        req.body = obj

        await validateNotification(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith('Provide recipientEmails')

    });

    it('should not validateNotification due not pass proper requester', async () => {

        let req = mockReq()
        let res = mockRes()
        let next = mockNext()
        let obj = Object.assign({}, notificationObj)
        obj.requester = ''
        req.body = obj

        await validateNotification(req, res, next)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.send).toHaveBeenCalledWith("Provide requester")

    });



});

describe('validateNotification Id ', () => { 
     it('should pass id ', async () => {
        let req = mockReq()
        let res = mockRes()
        let next = mockNext()

        req.params.id = "594ced02ed345b2b049222c5"

        await validateNotificationId(req,res,next)

        expect(next).toHaveBeenCalled()
        
     });
     it('should not pass id ', async () => {
       let req = mockReq()
       let res = mockRes()
       let next = mockNext()
       
       req.params.id = "ed02ed345b2b049222c5"

       await validateNotificationId(req,res,next)

       expect(res.status).toHaveBeenCalledWith(400)
       expect(res.send).toHaveBeenCalledWith('Invalid notification Id')

        
     });
 })