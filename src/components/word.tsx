'use client'

import { type Meaning, type WordApiResponse } from "~/types/word-type";
import { Button } from "./ui/button";
import { bookmark } from "~/app/actions/bookmark";
import { useState } from "react";

type WordProps = {
	word: WordApiResponse,
	isFavorite: boolean,
}

export function Word({ word, isFavorite }: WordProps) {
	const [favorited, setFavorited] = useState(isFavorite);

	const handleBookmark = async () => {
		const res = await bookmark(word.word, 'POST')

		if (res.id) {
			setFavorited(true)
		}
	}

	const handleUnmark = async () => {
		const res = await bookmark(word.word, 'DELETE')

		if (res.id) {
			setFavorited(false)
		}
	}

	return (
		<section className="flex flex-col my-11">
			<div className="flex place-content-between items-center">
				<div className="flex flex-col gap-1">
					<h1 className={`text-4xl first-letter:uppercase`}>
						{word.word}
					</h1>
					<p>{word.phonetic}</p>
				</div>
				{
					favorited ?
						<Button onClick={handleUnmark} variant={"ghost"}>Unmark!</Button>
						:
						<Button onClick={handleBookmark} variant={"outline"}>Bookmark!</Button>
				}
			</div>
			<div className="flex flex-col">
				<Meanings
					meanings={word.meanings}
				/>
			</div>
			<div>
				<div className="flex flex-col my-4 border-t py-2">
					<p>
						Origin{" "}
					</p>
					<a href={word.sourceUrls}>
						<p>
							{word.sourceUrls}
						</p>
					</a>
				</div>
			</div>
		</section>
	);
}

function Meanings({ meanings }: { meanings: Meaning[] }) {
	return (
		<>
			{meanings.map((meaning: Meaning, index: number) => {
				const { partOfSpeech, synonyms, antonyms } = meaning;
				return (
					<div key={index}>
						<div className="flex gap-4 items-center my-4">
							<h3>
								{partOfSpeech}
							</h3>
							<div className="flex-1 border-b h-1 " />
						</div>
						<Definition definitions={meaning.definitions} />
						<div className="flex flex-col gap-2 mt-4">
							{synonyms && antonyms &&
								<>
									<Nonyms
										nonyms={synonyms}
										label={"Synonyms "}
									/>
									<Nonyms
										nonyms={antonyms}
										label={"Antonyms "}
									/>
								</>
							}
						</div>
					</div>
				);
			})}
		</>
	);
}

type Definitions = Pick<Meaning, 'definitions'>
type DefinitionItem = Meaning['definitions'][0];

function Definition({ definitions }: Definitions) {
	return (
		<div className="flex flex-col gap-2">
			<p>Meaning </p>
			<div className="flex flex-col gap-1">
				{definitions.map((item: DefinitionItem, index: number) => (
					<ul
						key={index}
						className="flex flex-col  list-disc list-outside pl-4"
					>
						<li key={index}>
							<h3>
								{item.definition}
							</h3>

							{item.example && (
								<div className="ml-4">
									<p>
										Example:{" "}
									</p>
									<p>
										{item.example}
									</p>
								</div>
							)}
						</li>
					</ul>
				))}
			</div>
		</div>
	);
}

function Nonyms({ nonyms, label }: { nonyms: string[], label: string }) {
	return (
		nonyms &&
		nonyms.length > 0 && (
			<div className="flex items-start gap-2">
				<p>
					{label}
				</p>
				<div className="flex flex-wrap gap-2 ">
					{nonyms.map((item: string) => (
						<p key={item}>
							{item}
						</p>
					))}
				</div>
			</div>
		)
	);
}