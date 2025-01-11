import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const ImageCard = ({ id, imagePath, title, }: { id: string; imagePath: string; title: string; }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
    </div>
  )
}

export default ImageCard