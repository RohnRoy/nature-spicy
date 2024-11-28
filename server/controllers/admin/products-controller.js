const { ImageUploadUtil } = require("../../helpers/cloudinary");




const handleImageUpload  = async(re, res)=>{
    try {
        const b64 = Buffer.from(req.file.Buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64" +b64;
        const result = await ImageUploadUtil(url);

        res.json({
            success : true,
            result
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : 'Error occured'
        })
        
        
    }
};

module.exports = {handleImageUpload}