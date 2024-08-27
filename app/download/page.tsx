import Link from "next/link";

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
        <main className="text-white text-2xl grid grid-cols-s sm:grid-cols-3  p-24 gap-5">
            {dataEssenBook.map((i) => (
                <div className="overflow-hidden border-2 p-3 rounded-lg text-center" key={i.id}>
                    <Link href={i.bookPdf} download>
                        4000 Essential English Words Part {i.id}
                    </Link>
                </div>
            ))}
        </main>
    );
}

export default Download;
