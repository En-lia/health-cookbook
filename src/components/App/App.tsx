import React, { FC, createContext, useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import AppRouter from '../AppRouter/AppRouter';
import { GlobalHistory } from '../../router/GlobalHistory';
import UserStore from '../../store/UserStore';

export const Context = createContext(null);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // при переключ с вкл на вкладку не идет перезапрос
            staleTime: 60 * 1000, // время актуальности кэша
        },
    },
});

export const $UserStore = new UserStore();

export type SelectedTagType = {
    [key: number]: boolean,
};

const App: FC = observer(() => {
    const [selectedTags, setSelectedTags] = useState<SelectedTagType | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const setSelectedTag = useCallback((tagId:number) => {
        if (!tagId) return setSelectedTags(null);

        let copySelectedTags = { ...selectedTags };

        if (copySelectedTags[tagId]) {
            delete copySelectedTags[tagId];
        } else {
            copySelectedTags[tagId] = true;
        }

        if (!Object.keys(copySelectedTags).length) copySelectedTags = null;

        setSelectedTags(copySelectedTags);
    }, [selectedTags]);

    return (
        <Context.Provider
            value={{
                user: $UserStore,
                filter: {
                    selectedTags,
                    setSelectedTag,
                    page,
                    setPage,
                    limit,
                    setLimit,
                },
            }}
        >
            {/* <React.StrictMode> */}
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <ScrollToTop />
                    <GlobalHistory />
                    <AppRouter />
                </BrowserRouter>
            </QueryClientProvider>
            {/* </React.StrictMode> */}
        </Context.Provider>

    );
});

export default App;