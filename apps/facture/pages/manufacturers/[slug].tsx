import { GetStaticPaths, GetStaticProps } from "next";

import { fetchData, findManufacturer, FindManufacturerQuery, findManufacturers, FindManufacturersQuery, Manufacturer } from "libs/graphql";

interface Props {
    manufacturer: FindManufacturerQuery["manufacturer"]["data"]["attributes"];
}

export default function Index({ manufacturer }: Props) {
    return <div>{JSON.stringify(manufacturer)}</div>;
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    const {
        manufacturers: { data },
    } = await fetchData<FindManufacturersQuery>(process.env.NEXT_PUBLIC_API_ENDPOINT, { query: findManufacturers }, process.env.NEXT_PUBLIC_STRAPI_API_KEY);

    const paths = data.map((manufacturer) => {
        return {
            params: {
                slug: manufacturer.id,
            },
        };
    });

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const {
        manufacturer: {
            data: { attributes },
        },
    } = await fetchData<FindManufacturerQuery>(
        process.env.NEXT_PUBLIC_API_ENDPOINT,
        { query: findManufacturer, variables: { id: params.slug } },
        process.env.NEXT_PUBLIC_STRAPI_API_KEY
    );

    return { props: { manufacturer: attributes } };
};
