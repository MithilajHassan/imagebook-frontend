import { useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
} from "@dnd-kit/sortable";
import { useGetImagesMutation, useUpdateImageOrderMutation } from "@/slices/apiSlice";
import ImageCard from "./ImageCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setImages } from "@/slices/imagesSlice";
import { IImage } from "@/types/types";

const ImagesList = () => {
  const { images } = useSelector((state: RootState) => state.images)
  const [getImagesData] = useGetImagesMutation()
  const [updateOrder] = useUpdateImageOrderMutation()
  const dispatch = useDispatch<AppDispatch>()

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 10 } }),
    useSensor(KeyboardSensor)
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
  const updateImagesOrder = async(data:IImage[])=>{
    try {
      const newData = data.map((img)=>{
        return {
          _id:img._id,
          order:img.order
        }
      })
      await updateOrder({images:newData}).unwrap()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return;

    const oldIndex = images.findIndex((img) => img._id == active.id)
    const newIndex = images.findIndex((img) => img._id == over.id)
    const updatedImages = arrayMove(images, oldIndex, newIndex).map((img, index) => ({
      ...img,
      order: index, 
    }))
    dispatch(setImages(updatedImages))
    updateImagesOrder(updatedImages)
  }


  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="bg-red-400 flex flex-wrap p-5 mt-5 space-x-2">
        <SortableContext items={images.map(img => img._id)} >
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




