const router = require('express').Router();
const multer = require('multer');


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
    }
})

const upload = multer({ storage: multerStorage })

// Serve files from the 'uploads' directory


// Route to list uploaded files
// router.get('/files', (req, res) => {
//     const fs = require('fs');
//     const uploadDir = path.join(__dirname, 'uploads');

//     fs.readdir(uploadDir, (err, files) => {
//         if (err) {
//             return res.status(500).json({ error: 'Unable to fetch files' });
//         }
//         const fileUrls = files.map(file => `http://localhost:4444/uploads/${file}`);
//         res.status(200).json(fileUrls);
//     });
// });






// Route to add a single file
router.post('/single', upload.single('file'), (req, res) => {
    try {
        const file = req.file
        res.status(200).json(file)
    } catch (err) {
        if (err instanceof multer.MulterError) {
            res.status(400).json(err)
        }
        res.status(500).json({ error: 'Failed to upload file' })
    }

})


module.exports = router


