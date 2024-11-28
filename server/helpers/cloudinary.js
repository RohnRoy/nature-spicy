const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : '',//Cloudinary API NAME
    api_key : '',//Cloudinary API Key
    api_secret : '',//Cloudinary API Secret Key
});

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file){
    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto'
    })

    return result;
}

const upload = multer({storage})

module.exports = {upload,ImageUploadUtil};
