const User = require('../models/UserModel')

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
            const createUser = await User.create({
                name, 
                email, 
                password, 
                confirmPassword, 
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

module.exports = {
    createUser
}