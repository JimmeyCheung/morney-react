import React from 'react';
import styled from 'styled-components';

type Props = {
    name?: string
}
const SvgWrapper = styled.div`
    .icon{
        width:1em;
        height:1em;
        fill:currentColor;
    }
`;

let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try { importAll(require.context('icons', true, /\.svg$/)); } catch (error) { console.log(error); }

const Icon = (props: Props) => {
    return (
        <SvgWrapper>
            <svg className="icon">
                {props.name && <use xlinkHref={'#' + props.name} />}
            </svg>
        </SvgWrapper>
    );
}
export default Icon;