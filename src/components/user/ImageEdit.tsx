import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import ImageUploadForm from './ImageUploadForm'
import { FaEdit } from "react-icons/fa"
import { useState } from 'react'

type Props = {
    id: string;
    title: string;
}

export default function ImageEdit({ id, title }: Props) {
    const [isOpen,setIsOpen] = useState<boolean>(false)
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="border-2 rounded-md border-blue-800 p-1 hover:bg-slate-100 mr-2 text-blue-800">
                <FaEdit />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Image</DialogTitle>
                    <DialogDescription>
                        Make changes to your Image here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <ImageUploadForm id={id} editTitle={title} closeForm={setIsOpen} />
                </div>
            </DialogContent>
        </Dialog>
    )
}