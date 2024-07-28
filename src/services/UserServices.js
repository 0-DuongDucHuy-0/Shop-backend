const User = require('../models/UserModel')
const bcrypt = require("bcrypt")

const createUser = (newUser) => {
    const { name, email, password, confirmPassword, phone } = newUser
    return new Promise( async (resolve, reject) => {
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser !== null ){
                resolve({
                    status: 'OK',
                    message: 'Email đã tồn tại'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createUser = await User.create({
                name, 
                email, 
                password: hash, 
                phone
            })
            if(createUser) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    const { name, email, password, confirmPassword, phone } = userLogin
    return new Promise( async (resolve, reject) => {
        try{
            const checkUser = await User.findOne({
                email: email
            })
            if(checkUser === null ){
                resolve({
                    status: 'OK',
                    message: 'Người dùng không tồn tại'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            if(!comparePassword) {
                resolve({
                    status: 'OK',
                    message: 'Sai mật khẩu'
                })
            }
            resolve({
                status:'OK',
                message: 'SUCCESS',
                data: checkUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser
}