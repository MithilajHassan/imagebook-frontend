import { ReactElement, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button';

type Props = {
    id: string;
    onConfirm: (id: string) => void;
    children:ReactElement
}

export default function DeleteConfirm({ id, onConfirm, children }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const handleConfirm = () => {
        onConfirm(id)
        setIsOpen(false)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your image.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button className='bg-blue-600 hover:bg-blue-400' onClick={handleCancel}>Cancel</Button>
                    <Button className='bg-red-700 hover:bg-red-500' onClick={handleConfirm}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}