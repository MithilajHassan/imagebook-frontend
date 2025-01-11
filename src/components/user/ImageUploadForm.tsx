import { FormEvent, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { useCreateImageMutation } from "@/slices/apiSlice";

const ImageUploadForm = () => {
  const [image, setImage] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [createImageData] = useCreateImageMutation() 

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0])
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  })

  const uploadImage = async () => {
    if (!image) {
      toast.error("No image selected");
      return;
    }
    const data = new FormData();
    data.append("file", image);
    data.append(
      "upload_preset",
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string
    )
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME as string)
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json()

      return res.public_id
      
    } catch (err:any) {
      toast.error(err.data.message||'Error in upload image')
    }
  }

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    if (image && title) {
      const url = await uploadImage()
      if(url){
        const res = await createImageData({imagePath:url,title}).unwrap()
          if(res){
            toast.success('Successfully uploaded')
            setImage(null)
            setTitle('')
          } 
      }else{
        toast.error('No image path')
      }
    } else {
      toast.error("Please upload a file and enter a title.");
    }
  };

  return (
    <div className=" mx-auto text-center">
      <div
        {...getRootProps()}
        className="border-2 border-dashed bg-white border-gray-300 p-6 rounded-lg cursor-pointer mb-1 hover:border-blue-500"
      >
        <input {...getInputProps()} />
        {image ? (
          <p className="text-sm font-medium">{image.name}</p>
        ) : (
          <p className="text-sm text-gray-500">
            Drag & drop an image here, or click to select
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <Button type="submit" className="w-full" size={'lg'}>Upload</Button>
      </form>
    </div>
  );
};

export default ImageUploadForm;
