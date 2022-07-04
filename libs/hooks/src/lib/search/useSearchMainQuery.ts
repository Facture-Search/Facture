import { useQuery } from "@apollo/client";
import { FindManufacturerCardQuery, FindManufacturerCardQueryVariables, SearchHitType } from "@facture/types";
import { findManufacturerCard, parseFindManufacturerCardQuery } from "@facture/graphql";
import { useEffect, useState } from "react";

export function useSearchMainQuery(pageSize: number) {
    const [data, setData] = useState<SearchHitType[]>([]);
    const [pageCount, setPageCount] = useState<number>(-1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data: rawData, fetchMore } = useQuery<FindManufacturerCardQuery, FindManufacturerCardQueryVariables>(findManufacturerCard, {
        variables: { pageSize, page: 1 },
    });

    const loadMore = () => setCurrentPage((page) => page + 1);

    useEffect(() => {
        if (rawData) {
            const parsed = parseFindManufacturerCardQuery(rawData);
            setData(parsed);

            const pageCount = rawData.manufacturers?.meta.pagination.pageCount;
            if (pageCount) setPageCount(pageCount);
        }
    }, [rawData]);

    useEffect(() => {
        if (currentPage > 1)
            fetchMore({ variables: { pageSize, page: currentPage } }).then(({ data }) => {
                const parsed = parseFindManufacturerCardQuery(data);
                if (parsed) setData((prev) => (prev ? [...prev, ...parsed] : parsed));
            });
    }, [currentPage, pageSize]);

    return {
        data,
        loadMore: currentPage < pageCount ? loadMore : null,
    };
}

export default useSearchMainQuery;