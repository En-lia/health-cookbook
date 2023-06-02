import React, { FC, useMemo, useCallback, useContext } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classes from './Filter.module.scss';
import HCAccordion from '../UI/Accordion/HCAccordion';
import HCChip from '../UI/Chip/HCChip';
import { useGetTags } from '../../service/tags/tagHooks';
import { TagType } from '../../service/tags/TagAPI';
import { Context } from '../App/App';
import HCLoader from '../UI/Loader/HCLoader';

const LoadingIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

const Filter: FC = () => {
    const { filter: { selectedTags, setSelectedTag } } = useContext(Context);
    const { isLoading: isTagsLoading, data: tags } = useGetTags({});

    const chooseFilterTag = useCallback((tag: TagType) => {
        setSelectedTag(tag.id);
    }, [setSelectedTag]);

    const filterBody = useMemo(() => {
        if (isTagsLoading) {
            return <div style={{ textAlign: 'center' }}><Spin indicator={LoadingIcon} /></div>;
        }

        return (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {tags?.map((tag) => (
                    <HCChip
                        key={tag.id}
                        onClick={chooseFilterTag}
                        data={tag}
                        active={Boolean(selectedTags?.[tag.id])}
                    >
                        {tag.label}
                    </HCChip>
                ))}
            </div>
        );
    }, [chooseFilterTag, isTagsLoading, selectedTags, tags]);

    const filterHeader = useMemo(() => {
        return (
            <div className={classes.filterPanelContent}>
                <div>Фильтр</div>
                <div
                    style={{ fontWeight: '100', fontSize: '14px' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTag(null);
                    }}
                >
                    Очистить фильтр
                </div>

            </div>
        );
    }, [setSelectedTag]);

    return (
        <div className={classes.filterPanel}>
            <HCAccordion title={filterHeader} body={filterBody} />
        </div>
    );
};

export default Filter;