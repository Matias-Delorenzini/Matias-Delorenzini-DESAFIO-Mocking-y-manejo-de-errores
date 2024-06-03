import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = "products";
const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        index: true
    },
    stock: {
        type: Number,
        required: true,
        index: true
    },
    category: {
        type: String,
        required: true,
        index: true
    }

});

ProductsSchema.plugin(mongoosePaginate);
const ProductsModel = mongoose.model(productsCollection,ProductsSchema);
export default ProductsModel;