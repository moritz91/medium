import React from "react";
import { TabList, Tabs, Tab, TabPanel } from "./tabs/Tabs";
import styled from "styled-components";
import { Box } from "rebass";

export function ProfileTabs() {
  return (
    <Tabs initialValue="posts">
      <TabList>
        <Tab name="posts">Posts</Tab>
        <Tab name="responses">Responses</Tab>
      </TabList>
      <TabPanel name="posts">
        <Box fontSize={4}>
          React.js is a JavaScript library used for building UI. It is
          maintained by <strong>Facebook</strong> and a community of individual
          developers and companies.
        </Box>
      </TabPanel>
      <TabPanel name="responses">
        <Box fontSize={4}>
          Vue.js is an open-source JavaScript framework for building user
          interfaces and single-page applications.
        </Box>
      </TabPanel>
    </Tabs>
  );
}
