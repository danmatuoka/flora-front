import Link from "next/link";
import { PaginationCustom } from "~/components/pagination";
import { getFavorites } from "../actions/get-favorites";
import { ButtonUnmark } from "~/components/button-unmark";

type AllWordPageProps = {
  searchParams: Promise<{ limit: string, page: string }>
}

export default async function FavoritesPage({ searchParams }: AllWordPageProps) {
  const limit = (await searchParams).limit
  const page = (await searchParams).page

  const favoritesResponse = await getFavorites(limit);

  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
      <h1 className="text-2xl text-center mb-5">Favorites</h1>
      <div className="flex flex-col w-full max-w-sm">
        <div className="mb-6">
          {
            favoritesResponse?.results?.map(item =>
              <div className="flex justify-between border items-center border-slate-700 rounded p-2 hover:bg-slate-100" key={item.word}>
                <Link href={`/word/${item.word}`}>
                  <p className="hover:text-slate-600 hover:underline">{item.word}</p>
                </Link>
                <ButtonUnmark word={item.word} limit={limit} />
              </div>
            )
          }
        </div>
        <PaginationCustom
          page={page}
          limit={limit}
          totalPages={favoritesResponse.totalPages}
          hasNext={favoritesResponse.hasNext}
          hasPrev={favoritesResponse.hasPrev}
          path='favorites'
        />
      </div>
    </div>
  )
}