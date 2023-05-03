import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//header including api key
const cryptoNewsHeader = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_API_KEY
}

const baseUrl = process.env.REACT_APP_CRYPTO_NEWS_BASEURL
const createRequest = (url) => ({
    url,
    headers: cryptoNewsHeader
})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNews',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {
    useGetCryptoNewsQuery
} = cryptoNewsApi