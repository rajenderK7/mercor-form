import CenterWrapper from "./CenterWrapper";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";

const Create = () => {
  return (
    <div>
      <Tabs align="center" variant="unstyled">
        <TabList className="font-medium" color="black" fontFamily="sans-serif">
          <Tab>Questions</Tab>
          <Tab>Responses</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabIndicator mt="-1.5px" height="4px" bg="#4F46E5" rounded="md" />

        <TabPanels>
          {/* Questions */}
          <TabPanel>
            <p>Questions</p>
          </TabPanel>
          {/* Responses */}
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          {/* Settings */}
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Create;
