module.exports = {
    mockReq: () => {
        let req = {}
        req.body = jest.fn().mockReturnValue(req)
        req.params = jest.fn().mockReturnValue(req)
        req.headers = jest.fn().mockReturnValue(req)
        return req
    },
    mockRes: () => {
        let res = {}
        res.status = jest.fn().mockReturnValue(res)
        res.send = jest.fn().mockReturnValue(res)
        res.json = jest.fn().mockReturnValue(res)
        return res
    },
}
