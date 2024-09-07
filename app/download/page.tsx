import Link from "next/link";
import { Button } from "@/components/ui/button"


const dataEssenBook = [
    { id: 1, bookPdf: 'https://t.me/malikaeducationofficiall/31' },
    { id: 2, bookPdf: 'https://t.me/malikaeducationofficiall/39' },
    { id: 3, bookPdf: 'https://t.me/malikaeducationofficiall/46' },
    { id: 4, bookPdf: 'https://t.me/malikaeducationofficiall/65' },
    { id: 5, bookPdf: 'https://t.me/malikaeducationofficiall/68' },
    { id: 6, bookPdf: 'https://t.me/malikaeducationofficiall/85' },
];

const Download = () => {
    return (
        <main className=" text-xl  grid grid-cols-s sm:grid-cols-3 p-16 gap-3">
            {dataEssenBook.map((i) => (
                <Button className=" h-full overflow-hidden hover:bg-customPink hover:text-white hover:border-customPink border-2 p-4 rounded-lg text-center" key={i.id}>
                    <Link href={i.bookPdf} download>
                        4000 Essential English Words Part {i.id}
                    </Link>
                </Button>
            ))}
        </main>
    );
}

export default Download;
