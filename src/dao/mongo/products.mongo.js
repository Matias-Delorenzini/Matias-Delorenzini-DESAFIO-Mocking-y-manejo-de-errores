import ProductsModel from "../models/products.schema.js";

class Products {
    async put(id, boughtQuantity) {
        if (!id || !boughtQuantity) return {success: false, message: 'PRODUCT_UPDATE_MISSING_ARGUMENTS'};
        if (isNaN(boughtQuantity)) return { success: false, message: 'PRODUCT_UPDATE_INVALID_QUANTITY' };

        try {
            const updatedProduct = await ProductsModel.findOneAndUpdate(
                { _id: id },
                { $inc: { stock: -boughtQuantity } },
                { new: true }
            );

            if (!updatedProduct) {
                return { success: false, message: 'PRODUCT_NOT_FOUND' };
            }

            return { success: true, product: updatedProduct };
        } catch (error) {
            console.error('Error al actualizar el stock del producto:', error.message);
            return { success: false, message: 'PRODUCT_UPDATE_ERROR' };
        }
    }

    async getOne(id) {
        if (!id) return {success: false, message: 'PRODUCT_SEARCH_MISSING_ARGUMENTS'};
        try {
            const product = await ProductsModel.findById(id);
            if (!product) return {success: false, message: 'PRODUCT_NOT_FOUND'};
            return product;
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error.message);
            return {success: false, message: 'PRODUCT_SEARCH_ERROR'};
        }
    }

    async post( title, description, price, stock, category ) {
        if (!title || !description || !price || !stock || !category) return {success: false, message: 'PRODUCT_CREATE_MISSING_ARGUMENTS'};
        if (isNaN(stock) || isNaN(price)) return {success: false, message: 'PRODUCT_CREATE_INVALID_QUANTITY'}
        try {
            const newProduct = new ProductsModel({ title, description, price, stock, category });
            const savedProduct = await newProduct.save();
            return savedProduct;
        } catch (error) {
            console.error('Error al crear el producto:', error.message);
            return { success: false, message: 'PRODUCT_CREATE_ERROR' };;
        }
    }
}

export default Products;