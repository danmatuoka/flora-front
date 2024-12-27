import { SearchBar } from "~/components/search-bar";
import Link from "next/link";
import { getHistory } from "../actions/get-history";


export default async function HomePage() {
  const historyData = await getHistory('5');

  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
      <h1 className="text-xl font-bold mb-10">Dictionary API</h1>
      <SearchBar />

      <div className="mt-4">
        <p className="font-bold">Recent words</p>
        <ul className="list-disc">
          {historyData?.results?.length > 0 && historyData.results.map((item) => {
            return (
              <Link key={item.word} href={`/word/${item.word}`}>
                <li className="hover:text-slate-600 hover:underline">{item.word}</li>
              </Link>
            )
          })}
        </ul>
      </div>
    </div>
  )
}