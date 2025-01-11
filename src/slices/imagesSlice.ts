import { IImage } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageState {
  images: IImage[];
}

const initialState: ImageState = {
  images: [], 
}

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {

    addImage: (state, action: PayloadAction<IImage>) => {
      state.images.push(action.payload);
    },

    setImages: (state, action: PayloadAction<IImage[]>) => {
      state.images = action.payload;
    },

    editImage: (state, action: PayloadAction<{ id: string; updates: Partial<IImage> }>) => {
      const { id, updates } = action.payload;
      const image = state.images.find((img) => img._id === id);
      if (image) {
        Object.assign(image, updates) 
      }
    },

    deleteImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((img) => img._id !== action.payload);
    },
  },
});

export const { addImage, setImages, editImage, deleteImage } = imageSlice.actions;

export default imageSlice.reducer;
