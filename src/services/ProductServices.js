const Product = require('../models/ProductsModel')

const createProduct = (newProduct) => {
    return new Promise( async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description } = newProduct
        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null ){
                resolve({
                    status: 'ERR',
                    message: 'Sản phẩm đã tồn tại'
                })
            }
            const newProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                countInStock, 
                rating, 
                description
            })
            if(newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const uplateProduct = (id, data) => {
    return new Promise( async (resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null ){
                resolve({
                    status: 'OK',
                    message: 'Sản phẩm  không tồn tại'
                })
            }
            const uplatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status:'OK',
                message: 'SUCCESS',
                data: uplatedProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise( async (resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            if(checkProduct === null ){
                resolve({
                    status: 'OK',
                    message: 'sản phẩm không tồn tại'
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status:'OK',
                message: 'DELETE Product SUCCESS',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct = (limit , page, sort, filter ) => {
    return new Promise( async (resolve, reject) => {
        try{
            const totalProduct = await Product.countDocuments()

            if(filter){
                const tmp = {}
                tmp[filter[0]] = filter[1]
                console.log(tmp)
                const allProductFilter = await Product.find({ [filter[0]]: { '$regex': filter[1] } })
                resolve({
                    status:'OK',
                    message: 'SUCCESS',
                    data: allProductFilter,
                    total: totalProduct,
                    pageCurrent: Number(page) + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            if(sort){
                const tmp = {}
                tmp[sort[1]] = sort[0]
                console.log(tmp)
                const allProductSort = await Product.find().limit(limit).skip(page*limit).sort(tmp)
                resolve({
                    status:'OK',
                    message: 'SUCCESS',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page) + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }

            console.log("sort", sort)
            const allProduct = await Product.find().limit(limit).skip(page*limit)
            resolve({
                status:'OK',
                message: 'SUCCESS',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page) + 1,
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise( async (resolve, reject) => {
        try{
            const product = await Product.findOne({
                _id: id
            })
            if(product === null ){
                resolve({
                    status: 'OK',
                    message: 'sản phẩm  không tồn tại'
                })
            }
            resolve({
                status:'OK',
                message: 'SUCCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    uplateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}