const multer = require ('multer')
const storage = multer.diskStorage({})
const upload = multer({ storage : storage})


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Ensure 'uploads/' folder exists
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname);
//     }
//   });
  
//   const upload = multer({ storage: storage });
  
//   app.post('/api/profile/image', upload.single('file'), uploadImg);
  



module.exports = upload