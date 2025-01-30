const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    productimage:{
        type:String,
        require:true
    },
    productname:{
        type:String,
        require:true
    },
    productprice:{
        type:String,
        require:true
    },
    productinfo:{
        type:String,
        require:true
    }
})

const cartitems = mongoose.model("Cartitems",cartSchema)

module.exports = cartitems