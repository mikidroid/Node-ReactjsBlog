const multer = require('multer')
const mainPath = require('path')

const upload = (path) => {
 
   const disk = multer.diskStorage({
       destination:_root+'/backend/files/'+path,
       
       filename:(req,file,cb)=>{
         const _filename = path+'-'+new Date().getTime()+mainPath.extname(file.originalname)
         cb(null,_filename)
       },
   })
   
   return multer({storage:disk})
  
}

module.exports = upload