import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import Summary from "./Summary";

const Responses = () => {
  const [searchParams, _] = useSearchParams();
  const [formId, setFormId] = useState<string | null>(null);
  useEffect(() => {
    setFormId(searchParams.get("formId"));
  }, []);
  return (
    <>
      {!formId && <p className="text-center">Loading..</p>}
      {formId && (
        <div className="w-full font-sans">
          <div className=" font-medium">
            <p className="text-2xl text-start px-3 pt-3 w-full bg-white shadow-md rounded-t-md">
              3 responses
            </p>
            <Tabs tabIndex={0} align="center" variant="unstyled" border="2">
              <TabList
                justifyContent="space-evenly"
                width="full"
                className="font-medium"
                height="12"
                color="black"
                bg="white"
                fontSize="sm"
                roundedBottom="md"
                shadow="md"
              >
                <Tab>Summary</Tab>
                <Tab>Responses</Tab>
                <Tab>Settings</Tab>
              </TabList>

              <TabIndicator
                mt="-1.5px"
                height="4px"
                bg="#4F46E5"
                rounded="md"
              />

              <TabPanels className="w-full">
                {/* Questions */}
                <TabPanel>
                  <Summary formId={formId} />
                </TabPanel>
                {/* Responses */}
                <TabPanel>
                  <p>skdfjklsd</p>
                </TabPanel>
                {/* Settings */}
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default Responses;
