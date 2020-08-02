import React from 'react';

let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try { importAll(require.context('icons', true, /\.svg$/)); } catch (error) { console.log(error); }

type Prop = {
    name: string
}
const Icon = (prop: Prop) => {
    return (
        <svg className="icon">
            <use xlinkHref={'#' + prop.name} />
        </svg>
    );
}
export default Icon;