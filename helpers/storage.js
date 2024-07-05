
const multer = require("multer");

const diskStorage = multer.diskStorage(
    {
      destination: (req, file, cb) => {
         cb(null, 'images');
  },
  filename:(req, file, cb)=>{
    console.log(file.mimetype)
    const mimetype=file.mimetype.split('/');
    console.log(mimetype)
    const filetype=mimetype[1];
    const filename=file.originalname + '.' + filetype;
    console.log(filename)
    cb(null,filename)
  }
});

const filefilters=(req, file, cb)=>{
    const allowedMimetypes=["image/png","image/jpg","image/jpeg"];
    allowedMimetypes.includes(file.mimetype)?cb(null,true) : cb(null,false)
};

const storage=multer({
    storage:diskStorage,
    fileFilter:filefilters
}).single("image")

module.exports=storage