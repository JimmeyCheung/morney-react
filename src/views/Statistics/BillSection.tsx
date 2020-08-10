import styled from 'styled-components';
import React from 'react';

const Wrapper = styled.section`
    display:flex;
    flex-direction:column;
    flex-shrink:1;
    height:100%;
    &>.title{
        padding:5px 10px;
        background:var(--bg-color);
        font-size:12px;
    }
    &>.bill{
        height:100%;
        margin:10px;
        border-top:1px solid var(--border-color);
    }
`;
const BillSection = () => {
    return (
        <Wrapper>
            <div className="title">支出排行榜</div>
            <ol className="bill">

            </ol>
        </Wrapper>
    )
}
export { BillSection };