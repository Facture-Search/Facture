import algoliasearch from "algoliasearch/lite";

interface Props {
    appId: string;
    algoliaApiKey: string;
    indexName: string;
    children: any;
}

export function AlgoliaProvider({ appId, algoliaApiKey, indexName, children }: Props) {
    const searchClient = algoliasearch(appId, algoliaApiKey);

    return { children };
}

export default AlgoliaProvider;