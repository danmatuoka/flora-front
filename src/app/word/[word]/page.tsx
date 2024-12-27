import { Word } from "~/components/word";
import { SearchBar } from "~/components/search-bar";
import { getFavorites } from "~/app/actions/get-favorites";
import { searchWord } from "~/app/actions/search-word";

type WordPageProps = {
  params: Promise<{ word: string }>
}

export default async function WordPage({ params }: WordPageProps) {
  const word = (await params).word

  const wordResponse = await searchWord(word)

  const favoriteResponse = await getFavorites();

  const isFavoritedWord = favoriteResponse.results.some(item => item.word === word);

  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
      <h1 className="text-xl font-bold mb-10">{word}</h1>
      <SearchBar />

      {wordResponse[0].word && <Word word={wordResponse[0]} isFavorite={isFavoritedWord} />}
    </div>
  )
}