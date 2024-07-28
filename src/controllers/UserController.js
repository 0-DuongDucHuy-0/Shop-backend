const UserService = require('../services/UserServices')

const createUser = async (req, res) => {
    try{
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)

        if(!name || !email || !password || !confirmPassword || !phone){
            return res.status(200).json({
                status: 'ERR',
                meassage: 'Thiếu thông tin đăng ký'
            })
        } else if(!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                meassage: 'Email khônh hợp lệ'
            })
        } else if(password != confirmPassword){
            return res.status(200).json({
                status: 'ERR',
                meassage: 'Xác nhận mật khẩu không hợp lệ'
            })
        }
        const result = await UserService.createUser(req.body)
        return res.status(200).json(result)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createUser
}