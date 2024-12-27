/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { getAllWords } from "../actions/get-all-words"
import Link from "next/link";
import { PaginationCustom } from "~/components/pagination";

type AllWordPageProps = {
  searchParams: Promise<{ limit: string, page: string }>
}

export default async function AllWordsPage({ searchParams }: AllWordPageProps) {
  const limit = (await searchParams).limit
  const page = (await searchParams).page

  const allWordsResponse = await getAllWords(limit, page);

  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
      <h1 className="text-2xl text-center mb-5">Discover new words</h1>
      <div className="flex flex-col w-full max-w-sm">
        <ul className="list-disc mb-6 columns-2">
          {
            allWordsResponse?.results.map(item =>
              <Link key={item} href={`/word/${item}`}>
                <li className="hover:text-slate-600 hover:underline">{item}</li>
              </Link>
            )
          }
        </ul>
        <PaginationCustom
          page={page}
          limit={limit}
          totalPages={allWordsResponse?.totalPages!}
          hasNext={allWordsResponse?.hasNext!}
          hasPrev={allWordsResponse?.hasPrev!}
          path="allWords"
        />
      </div>
    </div>
  )
}