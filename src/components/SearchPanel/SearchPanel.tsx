import React, { FC, useMemo, useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import HCInputSelect from '../UI/InputSelect/HCInputSelect';
import classes from './SearchPanel.module.scss';
import { RECIPE_ROUTE } from '../../utils/const';
import NoFoundPlaceholder from '../Placeholders/NoFoundPlaceholder/NoFoundPlaceholder';
import { useGetRecipes } from '../../service/recipes/recipeHooks';
import HCLoader from '../UI/Loader/HCLoader';

const searchIcon = (
    <FontAwesomeIcon
        icon={faMagnifyingGlass}
        size="sm"
        className={classes.headerSearchInputIcon}
    />
);

const SearchPanel:FC = () => {
    const [searchValue, setSearchValue] = useState('');

    const { isLoading: isRecipesLoading, data: recipes, refetch } = useGetRecipes(
        { enabled: false },
        { searchQuery: searchValue });

    const searchChangeHandler = useCallback((value: string, e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(value);
    }, []);

    const debounceRefetch = useMemo(() => {
        return debounce(refetch, 150);
    }, [refetch]);

    useEffect(() => {
        if (searchValue) {
            debounceRefetch();
        }
    }, [debounceRefetch, searchValue]);

    const searchResultsPopperContent = useMemo(() => {
        return (
            <div className={classes.searchPanelResults}>
                {
                    recipes?.data.map((res) => (
                        <Link
                            className={classes.searchPanelResultItem}
                            key={res.id}
                            to={`${RECIPE_ROUTE}/${res.id}`}
                            onClick={() => setSearchValue('')}
                        >
                            <div className={classes.searchPanelResultText}>{res.title}</div>
                        </Link>
                    ))
                }
            </div>
        );
    }, [recipes?.data]);

    const notFoundPopperContent = useMemo(() => {
        return (
            <div className={classes.searchPanelNotFoundPlaceholder}>
                <NoFoundPlaceholder />
            </div>
        );
    }, []);

    const popperContent = useMemo(() => {
        if (isRecipesLoading) return <div style={{ height: '200px' }}><HCLoader /></div>;

        if (recipes?.data.length > 0) {
            return searchResultsPopperContent;
        }
        return notFoundPopperContent;
    }, [isRecipesLoading, notFoundPopperContent, recipes?.data.length, searchResultsPopperContent]);

    return (
        <div className={classes.searchPanel}>
            <HCInputSelect
                inputProps={{
                    value: searchValue,
                    onChange: searchChangeHandler,
                    placeholder: 'Поиск',
                    clearable: true,
                    prependContent: searchIcon,
                    className: classes.searchPanelInput,
                }}
                onChange={searchChangeHandler}
                popperContent={popperContent}
            />
        </div>
    );
};

export default SearchPanel;