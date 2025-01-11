import { useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useGetImagesMutation } from "@/slices/apiSlice";
import ImageCard from "./ImageCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setImages } from "@/slices/imagesSlice";

const ImagesList = () => {
  const { images } = useSelector((state:RootState)=>state.images)
  const [getImagesData] = useGetImagesMutation()
  const dispatch = useDispatch<AppDispatch>()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    const getImages = async () => {
      try {
        const res = await getImagesData().unwrap()
        if (res.length > 0) {
          dispatch(setImages(res))
        }
      } catch (err) {
        console.error("Error fetching images:", err)
      }
    };
    getImages();
  }, [getImagesData])
  if (images.length == 0) {
    return <div><h3 className="text-center">No uploads</h3></div>
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return;

    const oldIndex = images.findIndex((img) => img._id == active.id)
    const newIndex = images.findIndex((img) => img._id == over.id)
    dispatch(setImages(arrayMove(images, oldIndex, newIndex)))
  }

  

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="bg-red-400 flex flex-wrap p-5 mt-5 space-x-2">
        <SortableContext items={images.map(img=>img._id)} >
          {
            images.map((image) => (
              <ImageCard
                key={image._id}
                id={image._id}
                title={image.title}
              imagePath={image.imagePath}
              />
            ))}
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default ImagesList




