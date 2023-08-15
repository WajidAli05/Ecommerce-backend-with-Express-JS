const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true , "Product name can not be empty!"] , 
    trim : true
  },
  description: {
    type: String,
    required: [true , "Description can not be empty!"] , 
  },
  price: {
    type: Number,
    required: [true , "Price can not be empty!"] , 
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },

  user_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "newUser" , 
    required : true
  } , 
//   imageUrl: {
//     type: String,
//     required: true
//   },
  createdAt: {
    type: Date,
    default: Date.now
  }
} , 
{
    Timestamps : true
});

module.exports = mongoose.model('Products', productSchema);
