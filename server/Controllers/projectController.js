const projects = require('../Models/projectSchema')
//add project
exports.addProject = async (req,res)=>{
    console.log("Inside add project");
    const userId = req.payload;
    console.log(userId);
    const image = req.file.filename;
    console.log(image);
    const {petname,pettype,breed,vaccinated,gender,spayed,age,info,username,address,phone,email}=req.body;
    try{
        const existingProject = await projects.findOne({petname: petname, userId: userId});
        if(existingProject){
            res.status(406).json("This submit form already exist")
        }
        else{
        const newDoner= new projects({
            petname:petname,
            pettype:pettype,
            breed:breed,
            vaccinated:vaccinated,
            gender:gender,
            spayed:spayed,
            age:age,
            info:info,
            username:username,
            address:address,
            phone:phone,
            email:email,
            image:image,
            userId:userId

        })
        await newDoner.save();
        res.status(200).json("Project added successfully")
    }

    }catch(err){
        res.status(401).json("Unable to add project duw to:",err)
    }
}

exports.getMainProject = async(req,res)=>{
    //getting value from query parameter
    const searchKey = req.query.search;
    console.log(searchKey);
    const query ={
        breed:{

            //regular expression
            //i = to remove case sensitivity
            $regex:searchKey,$options:'i'
        }
    }
    try{
        const mainProject = await projects.find(query);
        res.status(200).json(mainProject)

    }catch(err){
        res.status(401).json("Request failed due to",err)
    }
}

exports.getUserProject  = async (req,res)=>{
    const userId = req.payload
    try{
        const userProject = await projects.find({userId:userId});
        res.status(200).json(userProject)
    }catch(err){
        res.status(401).json("Request failed due to", err)
    }
}

exports.deleteUserProject = async(req,res)=>{
    const {id} = req.params
    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json("Project deleted successfully")
    }catch(err){
        res.status(401).json("delete failed", err)
    }
}