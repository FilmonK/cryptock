import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//header including api key
const cryptoApiHeader = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_API_KEY
}

const baseUrl = process.env.REACT_APP_CRYPTO_API_BASEURL

const createRequest = (url) => ({
    url,
    headers: cryptoApiHeader
})

//reducer to make api call to get crypto information
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetail: builder.query({
            query: (uuid) => createRequest(`/coin/${uuid}`)
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId,  timeperiod }) => createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
        }),
        getCryptoHistory2: builder.query({
            query: ({ coin2Id , timeperiod2 }) => createRequest(`/coin/${coin2Id}/history?timePeriod=${timeperiod2}`)
        }),
        getCryptoHistory3: builder.query({
            query: ({coin3Id, timeperiod3 }) => createRequest(`/coin/${coin3Id}/history?timePeriod=${timeperiod3}`)
        }),
        getCryptoHistory4: builder.query({
            query: ({ coin4Id, timeperiod4 }) => createRequest(`/coin/${coin4Id}/history?timePeriod=${timeperiod4}`)
        })
    
    })
})

export const {
    useGetCryptosQuery,
    useGetCryptoDetailQuery,
    useGetCryptoHistoryQuery,
    useGetCryptoHistory2Query,
    useGetCryptoHistory3Query, 
    useGetCryptoHistory4Query
} = cryptoApi

