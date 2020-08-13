import styled from 'styled-components';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecords } from 'hooks/useRecords';
import { useTags } from 'hooks/useTags';
import Icon from 'components/Icon';

const Wrapper = styled.section`
    >header{
        display:flex;
        height:50px;
        align-items:center;
        justify-content:center;
        background:var(--skin-color);
        font-size:20px;
        .icon{
            width:24px;
            height:24px;
        }
    }
`;
const RecordDetail = () => {
    let id = parseInt(useParams<{ id: string }>().id);
    const { records } = useRecords();
    const { findTag } = useTags();
    const record = records.find(v => v.id === id);
    const tag = findTag(record?.tagIds[0] || -1)
    return (<Wrapper>
        <header>
            <Icon className="icon" name={tag?.icon} />
            {tag?.name}
        </header>
    </Wrapper>);

}

export { RecordDetail };