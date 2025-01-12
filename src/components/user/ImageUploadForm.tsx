import { FormEvent, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { useCreateImageMutation, useUpdateImageMutation } from "@/slices/apiSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addImage, editImage } from "@/slices/imagesSlice";

type Prope = {
  id?: string;
  editTitle?: string;
  closeForm?: React.Dispatch<React.SetStateAction<boolean>>
}

const ImageUploadForm = ({ id, editTitle, closeForm }: Prope) => {
  const [image, setImage] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [createImageData] = useCreateImageMutation()
  const [updateImageData] = useUpdateImageMutation()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (id && editTitle) {
      setTitle(editTitle)
    }
  },[])

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
      if (!id) toast.error("No image selected");
      return;
    }
    const data = new FormData();
    data.append("file", image)
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

    } catch (err: any) {
      toast.error(err.data.message || 'Error in upload image')
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (id && closeForm) {
      if (title) {
        if (image) {
          const url = await uploadImage()
          if (url) {
            const res = await updateImageData({ id, data: { imagePath: url, title } }).unwrap()
            if (res) {
              toast.success('Successfully updated')
              dispatch(editImage({id,updates:res.image}))
              setImage(null)
              setTitle('')
              closeForm(false)
            }
          } else {
            toast.error('Error in image upload')
          }

        }
        const res = await updateImageData({ id, data: { title } }).unwrap()
        if (res) {
          toast.success('Successfully updated')
          dispatch(editImage({id,updates:res.image}))
          setImage(null)
          setTitle('')
          closeForm(false)
        }
      } else {
        toast.error("Please enter a title.")
      }
    } else {
      if (image && title) {
        const url = await uploadImage()
        if (url) {
          const res = await createImageData({ imagePath: url, title }).unwrap()
          if (res) {
            toast.success('Successfully uploaded')
            setImage(null)
            setTitle('')
            dispatch(addImage(res.image))
          }
        } else {
          toast.error('No image path')
        }
      } else {
        toast.error("Please upload a file and enter a title.");
      }
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
          onKeyDown={(e) => e.stopPropagation()}
          className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none"
        />
        <Button type="submit" className="w-full" size={'lg'}>{id ? "Update" : "Upload"}</Button>
      </form>
    </div>
  );
};

export default ImageUploadForm;
