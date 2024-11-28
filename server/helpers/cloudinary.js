const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : 'dm609ehx4',
    api_key : '487689357793641',
    api_secret : 'LjGArjPqx2lYLLDFxMivR_LB7G8',
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