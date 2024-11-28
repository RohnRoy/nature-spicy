
import { Divide, FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setuploadedImageUrl,
  setImageLoadingState
}) {
    const inputRef = useRef(null)
    function handleImageFileChange(event){
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0]
        if(selectedFile) setImageFile(selectedFile);    
    }
    function handleDragOver(event){
        event.preventDefault()
    }
    function handleDrop(event){
        event.preventDefault()
        const droppedFile = event.dataTransfer.files?.[0];  
        if(droppedFile) setImageFile(droppedFile);
    }
    function handleRemoveImage(){
        setImageFile(null)
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }


    async function uploadImageToCloudinary(){
        setImageLoadingState(true)
        const data = new FormData();
        data.append('my_file', imageFile)
        const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data)
        console.log(response,'response');

        if(response?.data?.success) {
            setuploadedImageUrl(response.data.result.url)
            setImageLoadingState(false)
        }
    }
    useEffect(()=>{
        if(imageFile !== null) uploadImageToCloudinary()
    },[imageFile])
  return (
    <div className="w-full  mt-4  max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed rounded-lg p-4">
        <Input id="image-upload" type="file" className="hidden" 
        ref={inputRef} onChange={handleImageFileChange} />
        {
            !imageFile ?
            <Label htmlFor="image-upload" className="flex flex-col items-center justify-center h-32 cursor-pointer">
                <UploadCloudIcon className="w-5 h-5 text-muted-foreground mb-2"/>
                <span>Click to upload or Drag & Drop an image</span>

            </Label> : (
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <FileIcon  className="w-8 h-8 text-primary mr-2"/>
                </div>
                <p className="text-sm font-medium">{imageFile.name}</p>
                <Button variant ="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                    <XIcon className="w-4 h-4" />
                    <span className="sr-only">Remove File</span>
                </Button>
            </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;