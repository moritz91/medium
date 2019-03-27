import React, { createContext, useState, useContext } from "react";
import styled from "styled-components";

const StyledTabList = styled.ul`
  margin-bottom: -1px;
  overflow-x: auto;
  white-space: nowrap;
  list-style-type: none;
  margin: 0;
  padding: 0;
  list-style: none;
  list-style-image: none;
  font-size: 1.6rem;
`;

const StyledTab = styled.li`
  padding-bottom: 8px;
  margin-right: 20px;
  display: inline-block;
  line-height: 40px;
  box-sizing: inherit;
  white-space: nowrap;
  list-style-type: none;
`;

const Link = styled.a.attrs(({ active }: any) => ({
  active
}))`
  cursor: pointer;
  color: ${props => props.active};
`;

export interface ContextProps {
  activeTab: string;
  changeTab: any;
}

const TabContext = createContext<ContextProps>({
  activeTab: "",
  changeTab: ""
});

function Tabs(props: any) {
  const { initialValue, children, ...restProps } = props;
  const [activeTab, changeTab] = useState(initialValue);
  const tabProviderValue = { activeTab, changeTab };

  return (
    <TabContext.Provider value={tabProviderValue}>
      <div {...restProps}>{children}</div>
    </TabContext.Provider>
  );
}

function TabList(props: any) {
  const { children, ...restProps } = props;

  return <StyledTabList {...restProps}>{children}</StyledTabList>;
}

function Tab(props: any) {
  const { name, children, ...restProps } = props;

  const tabContext = useContext(TabContext);

  const active = `${tabContext.activeTab === name ? "#fff" : "#999"}`;

  return (
    <StyledTab
      onClick={() => {
        tabContext.changeTab(name);
      }}
      {...restProps}
    >
      <Link active={active}>{children}</Link>
    </StyledTab>
  );
}

const TabPanel = (props: any): any => {
  const { name, children, ...restProps } = props;

  const tabContext = useContext(TabContext);

  return tabContext.activeTab === name && <div {...restProps}>{children}</div>;
};

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export { Tabs, TabList, Tab, TabPanel };
