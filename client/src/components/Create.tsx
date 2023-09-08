import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import Questionnaire from "./Questionnaire";

const Create = () => {
  return (
    <>
      <div className="mx-auto font-sans">
        <Tabs align="center" variant="unstyled">
          <TabList className="font-medium" height="12" color="black" bg="white">
            <Tab>Questions</Tab>
            <Tab>Responses</Tab>
            <Tab>Settings</Tab>
          </TabList>

          <TabIndicator mt="-1.5px" height="4px" bg="#4F46E5" rounded="md" />

          <TabPanels className="max-w-3xl">
            {/* Questions */}
            <TabPanel>
              <Questionnaire />
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
    </>
  );
};

export default Create;
