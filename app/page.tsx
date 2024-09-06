import Image from "next/image";
import essential1 from "@/src/images/essentiall1.png"
import essential2 from "@/src/images/essential2.png"
import essential3 from "@/src/images/essentiall3.png"
import essential4 from "@/src/images/essential4.png"
import essential5 from "@/src/images/essential5.png"
import essential6 from "@/src/images/essential6.png"
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
const dataEssen = [
  {
    id: 1, image: essential1
  },
  {
    id: 2, image: essential2
  },
  {
    id: 3, image: essential3
  },
  {
    id: 4, image: essential4
  },
  {
    id: 5, image: essential5
  },
  {
    id: 6, image: essential6
  },
]

export default function Home() {
  return (
    <main className=" w-[90%] text-white text-2xl grid grid-cols-1 sm:grid-cols-3 mx-auto p-24 gap-5">
      {
        dataEssen.map((i) => (
          <Card className=" overflow-hidden mx-auto shadow-2xl" key={i.id}>
            <Link href={`/essential/${i.id}`}>
              <Image className=" object-cover" src={i.image} alt={`Essential Part ${i.id}`} />
            </Link>
          </Card>
        ))
      }
    </main>
  );
}
