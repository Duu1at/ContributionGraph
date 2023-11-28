import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gitApi = createApi({
    reducerPath: 'gitApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dpg.gg/test/calendar.json' }),
    endpoints: (builder) => ({
        getCalendar: builder.query({
            query: () => 'calendar.json', // Укажите путь к вашему файлу JSON
        }),
    }),
});

export const { useGetCalendarQuery } = gitApi;
