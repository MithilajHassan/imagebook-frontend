import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "react-toastify";
import DeleteConfirm from "./DeleteConfirm";
import ImageEdit from "./ImageEdit";
import { FaTrashCan } from "react-icons/fa6";
import { useDeleteImageMutation } from "@/slices/apiSlice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { deleteImage } from "@/slices/imagesSlice";

const ImageCard = ({ id, imagePath, title, }: { id: string; imagePath: string; title: string; }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const [deleteImageApi] = useDeleteImageMutation()
  const dispatch = useDispatch<AppDispatch>()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };


  const handleDelete = async (id: string) => {
    try {
      const res = await deleteImageApi(id).unwrap()
      if (res) {
        dispatch(deleteImage(id))
        toast.success('Image deleted successfully')
      }
    } catch (error) {
      toast.error('Failed to delete image')
    }
  }
  

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border border-gray-300 p-2 bg-white rounded-md cursor-grab"
    >
      <img
        src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/${imagePath}`}
        alt={`image-${id}`}
        className="w-36 h-36 object-cover"
      />
      <p className="font-bold">{title}</p>
      <div className="flex justify-end pt-1">
        <ImageEdit id={id} title={title} />
        <DeleteConfirm id={id} onConfirm={handleDelete}>
          <button className="border-2 rounded-md border-red-700 p-1 hover:bg-slate-100 text-red-700">
            <FaTrashCan />
          </button>
        </DeleteConfirm>
      </div>
    </div >
  )
}

export default ImageCard