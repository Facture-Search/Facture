import { SearchHit } from "@facture/types";
import { parseAlgoliaSearchHits } from "@facture/graphql";
import algoliasearch from "algoliasearch";
import { useEffect, useState } from "react";

export function useSearchMainSearch(algoliaAppId: string, algoliaApiKey: string, algoliaIndexName: string, pageSize: number) {
    const searchClient = algoliasearch(algoliaAppId, algoliaApiKey);
    const index = searchClient.initIndex(algoliaIndexName);

    const [query, setQuery] = useState<string>("");
    const [data, setData] = useState<SearchHit[] | null>(null);
    const [pageCount, setPageCount] = useState<number>(-1);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const loadMore = () => setCurrentPage((page) => page + 1);

    useEffect(() => {
        if (query === "") setData(null);
        else
            index.search(query, { hitsPerPage: pageSize, page: 0 }).then((data) => {
                setPageCount(data.nbPages);
                setData(parseAlgoliaSearchHits(data.hits));
            });

        setCurrentPage(0);
    }, [query, pageSize]);

    useEffect(() => {
        if (currentPage > 0)
            index.search(query, { hitsPerPage: pageSize, page: currentPage }).then((data) =>
                setData((prev) => {
                    const parsed = parseAlgoliaSearchHits(data.hits);
                    return prev ? [...prev, ...parsed] : parsed;
                })
            );
    }, [currentPage]);

    return {
        data,
        loadMore: currentPage < pageCount - 1 ? loadMore : null,
        query,
        setQuery,
    };
}

export default useSearchMainSearch;