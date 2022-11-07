const category = require('../model/category')

//Voew all categories
const Index=async(req,res)=>{
  const cat = await category.find({}).sort({'createdAt':1})
  console.log(cat)
  return res.send({data:cat})
}

//Create category
const Create=async (req,res)=>{
  const cat = await category.create({
    title: req.body.title,
    description: req.body.description
  })
  if (!cat){
     return res.status(500).send({message:"Failed to create!"})
  }
  console.log(cat)
  return res.status(200).send({message:"Category created!"})
}

//Remove category
const Remove=async(req,res)=>{
  const cat = await category.deleteOne({_id:req.params.id})
  
  if(!cat){
      return res.status(500).send({message:"Delete failed!"})
  } 
  return res.status(200).send()
}

module.exports = {Index,Create,Remove}