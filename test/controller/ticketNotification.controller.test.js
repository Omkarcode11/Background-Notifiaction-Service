const { acceptNotification, getNotification, sendEmail } = require("../../controller/ticketNotification.controller");
const Notification = require("../../model/Notification");
const emailService = require("../../notifier/emailService");
const { mockReq, mockRes } = require("../interceptor");

let notificationObj = {
    ticketId: '1234',
    subject: "ticket Created",
    content: "you Ticket Created  and its status is open",
    recipientEmails: ['omkar@gmail.com', 'arya@gmail.com'],
    requester: "omkar",
    status: 'NOT_SEND'
}

let emailObj = {
    from: "omkarsonawaneomkar2@gmail.com",
    to: ['omkar@gmail.com', 'arya@gmail.com'],
    subject: 'Your Ticket Created Successfully',
    text: 'your Ticket Button not Working is Created Successfully',
}

let err = {
    err : 'internal error'
}


describe('Accept Notification', () => {

    it('should Accept Notification', async () => {
        let req = mockReq()
        let res = mockRes()
        req.body = notificationObj

        let spyCreate = jest.spyOn(Notification, 'create').mockImplementation(() => Promise.resolve(notificationObj))

        await acceptNotification(req, res)

        expect(spyCreate).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.json).toHaveBeenCalledWith({
            message: "Your Request Accepted",
            requestId: notificationObj.id,
            status: notificationObj.status
        })

    });

    it("should not Accept Notification", async () => {

        let req = mockReq()
        let res = mockRes()
        req.body = notificationObj

        let spyCreate = jest.spyOn(Notification, 'create').mockImplementation(() => Promise.resolve(null))

        await acceptNotification(req, res)

        expect(spyCreate).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith('Your Request is Not Accepted')


    })

    it("should throw error", async () => {

        let req = mockReq()
        let res = mockRes()
        req.body = notificationObj

        let spyCreate = jest.spyOn(Notification, 'create').mockImplementation(() => { throw new Error({ err: "Some thing is missing" }) })

        await acceptNotification(req, res)

        expect(spyCreate).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith({
            message: "Some internal error Occurred"
        })

    })
})

describe("get Notification", () => {
    it('should give Notification ', async () => {
        let req = mockReq()
        let res = mockRes()
        req.params.id = '1234'

        let spyFindById = jest.spyOn(Notification, 'findById').mockImplementation(() => Promise.resolve(notificationObj))

        await getNotification(req, res)

        expect(spyFindById).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(notificationObj)


    });
    it('should fail not find Notification ', async () => {
        let req = mockReq()
        let res = mockRes()
        req.params.id = '1234'

        let spyFindById = jest.spyOn(Notification, 'findById').mockImplementation(() => Promise.resolve(null))

        await getNotification(req, res)

        expect(spyFindById).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith('ticket not found')


    });
    it('should throw Err ', async () => {
        let req = mockReq()
        let res = mockRes()
        req.params.id = '1234'

        let spyFindById = jest.spyOn(Notification, 'findById').mockImplementation(() => { throw new Error('internal Error') })

        await getNotification(req, res)

        expect(spyFindById).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith('Internal Error')
    });
})


describe('send Email', () => {

    it('should send Email', async () => {
        let res = mockRes()
        let req = mockReq()
        req.params.id = '1234'
        let spyFindById = jest.spyOn(Notification, 'findById').mockImplementation(() => Promise.resolve(notificationObj))

        let spyEmailService = jest.spyOn(emailService, 'sendMail').mockImplementation(() => Promise.resolve("Email send Successfully"))

        await sendEmail(req,res)

        expect(spyFindById).toHaveBeenCalled()
        expect(spyEmailService).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith("Email send Successfully")

    });
    it('should not send Email because notification not found', async () => {
        let res = mockRes()
        let req = mockReq()
        req.params.id = '1234'
        let spyFindById = jest.spyOn(Notification, 'findById').mockImplementation(() => Promise.resolve(null))

        await sendEmail(req,res)

        expect(spyFindById).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.send).toHaveBeenCalledWith("Notification not Found")

            
    });
    it('should not send Email because notification status is not NOT_SEND', async () => {
        let res = mockRes()
        let req = mockReq()
        req.params.id = '1234'
        notificationObj.status = "SEND"
        let spyFindById = jest.spyOn(Notification, 'findById').mockImplementation(() => Promise.resolve(notificationObj))

        await sendEmail(req,res)

        expect(spyFindById).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith("Email Already send")
            
    });
    it('should throw error', async () => {
        let res = mockRes()
        let req = mockReq()
        req.params.id = '1234'
        let spyFindById = jest.spyOn(Notification, 'findById').mockImplementation(() => {throw new Error(err)})

        await sendEmail(req,res)

        expect(spyFindById).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith('internal Error')
        

    });
})