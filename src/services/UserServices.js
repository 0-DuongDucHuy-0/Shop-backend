const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require('./JwtServices')

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
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status:'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e)
        }
    })
}

const uplateUser = (id, data) => {
    return new Promise( async (resolve, reject) => {
        try{
            console.log('id', id)
            console.log('data', data)
            const checkUser = await User.findOne({
                _id: id
            })
            console.log('checkUser', checkUser)
            if(checkUser === null ){
                resolve({
                    status: 'OK',
                    message: 'Người dùng không tồn tại'
                })
            }
            const uplateUser = await User.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status:'OK',
                message: 'SUCCESS',
                data: uplateUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    uplateUser
}