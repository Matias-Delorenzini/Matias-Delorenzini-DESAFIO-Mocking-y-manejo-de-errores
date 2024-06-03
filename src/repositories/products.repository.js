export default class ProductsRepository {
    constructor (dao){
        this.dao = dao;
    }

    updateStock = async (id, boughtQuantity) => {
        let result = await this.dao.put(id, boughtQuantity);
        return result;
    }

    getProductById = async (id) => {
        let result =await this.dao.getOne(id)
        return result
    }

    createProduct = async (title, description, price, stock, category) => {
        let result = await this.dao.post(title, description, price, stock, category)
        return result
    }
}