const Cartitems= require('../Models/cartSchema')
exports.addCart = async (req,res)=>{
    console.log("Inside addCartController");
    const productimage = req.file.filename;
    console.log(productimage);
    const {productprice,productname,productinfo}=req.body;
    try{
        const existingProduct = await Cartitems.findOne({productname:productname});
        if(existingProduct){
            res.status(406).json("This product already exist")
        }
        else{
        const newProduct= new Cartitems({
            productprice:productprice,
            productimage:productimage,
            productname:productname,
            productinfo:productinfo
            

        })
        await newProduct.save();
        res.status(200).json("Product added successfully")
    }

    }catch(err){
        res.status(401).json("Unable to add product duw to:",err)
    }
}

exports.getProducts = async(req,res)=>{
    const searchKey = req.query.search;
    console.log(searchKey);
    const query ={
        productname:{
            //i = to remove case sensitivity
            $regex:searchKey,$options:'i'
        }
    }
    
    
    try{
        const mainProduct = await Cartitems.find(query);
        res.status(200).json(mainProduct)

    }catch(err){
        res.status(401).json("Request failed due to",err)
    }
}
