import React, { useState } from 'react'
import styled from 'styled-components';
const Wrapper = styled.section`
    &>.tabs{
        display:flex;
        align-items:center;
        justify-content:space-between;
        height:38px;
        padding-top:5px;
        background-color:var(--bg-color);
        overflow:hidden;
        &>.tab{
            position:relative;
            display:flex;
            width:33.333%;
            height:100%;
            align-items:center;
            justify-content:center;
            border-bottom:1px solid var(--border-color);

            &.selected{
                background:#fff;
                border-radius:4px;
                border:1px solid var(--border-color);
                border-bottom:none;
            }
        }
    }
`;
const tabs = [
    { text: "周", value: 1, selected: true },
    { text: "月", value: 2 },
    { text: "年", value: 3 }
];
const TabsSection: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const getClass = (index: number) => {
        return `tab ${index === selectedIndex ? "selected" : ""}`
    }
    return (
        <Wrapper>
            <div className="tabs">
                {tabs.map((tab, index) => {
                    return <div className={getClass(index)} onClick={() => { setSelectedIndex(index) }} key={index}>{tab.text}</div>
                })}
            </div>
        </Wrapper>
    )
}
export { TabsSection }