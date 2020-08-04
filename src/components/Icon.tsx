import React from "react";
import styled from "styled-components";
import cs from "classnames";

type Props = {
  name?: string;
} & React.SVGAttributes<SVGElement>;
const SvgWrapper = styled.div`
  .icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
  }
`;

let importAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().forEach(requireContext);
try {
  importAll(require.context("icons", true, /\.svg$/));
} catch (error) {
  console.log(error);
}

const Icon = (props: Props) => {
  const { name, children, className, ...rest } = props;
  return (
    <SvgWrapper>
      <svg className={cs("icon", className)} {...rest}>
        {props.name && <use xlinkHref={"#" + props.name} />}
      </svg>
    </SvgWrapper>
  );
};
export default Icon;
