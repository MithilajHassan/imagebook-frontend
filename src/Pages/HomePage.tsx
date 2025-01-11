import Header from "@/components/user/Header"
import ImageUploadForm from "@/components/user/ImageUploadForm"
import ImagesList from "@/components/user/ListImages"


export default function HomePage() {

    return (
        <>
            <Header />
            <div className="mt-16 p-2">
                <ImageUploadForm />
                <ImagesList />
            </div>
        </>
    )
}