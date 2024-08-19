import Link from "next/link";

const dataEssenBook = [
    { id: 1, bookPdf: '/pdf/essentialBook1.pdf' },
    { id: 2, bookPdf: '/pdf/essentialBook2.pdf' },
    { id: 3, bookPdf: '/pdf/essentialBook3.pdf' },
    { id: 4, bookPdf: '/pdf/essentialBook4.pdf' },
    { id: 5, bookPdf: '/pdf/essentialBook5.pdf' },
    { id: 6, bookPdf: '/pdf/essentialBook6.pdf' },
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
