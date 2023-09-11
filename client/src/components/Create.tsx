import { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import Questionnaire from "./Questionnaire";
import Responses from "./Responses";
import { useRecoilValue } from "recoil";
import userAtom from "../state/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import formActions from "../actions/form.actions";
import taost from "react-hot-toast";
import Spinner from "./Spinner";

const Create = () => {
  const user = useRecoilValue(userAtom);
  const [searchParams, _] = useSearchParams();
  const [acceptingResponses, setAcceptingResponses] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateCreator = async (formId: string) => {
    setLoading(true);
    const res = await formActions.fetchValidCreator(user.userId, formId);
    if (!res.isCreator) {
      taost.error("Unauthorized user");
      navigate("/dashboard", {
        replace: true,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login", {
        replace: true,
      });
      return;
    }
    const fId = searchParams.get("formId");
    if (fId !== null) {
      validateCreator(fId!);
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="flex justify-center">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="mx-auto bg-[#EEF3FE] min-h-screen">
          <Tabs align="center" variant="unstyled">
            <TabList
              className="font-medium"
              height="12"
              color="black"
              bg="white"
            >
              <Tab fontSize="sm">Questions</Tab>
              <Tab fontSize="sm">Responses</Tab>
              <Tab fontSize="sm">Settings</Tab>
            </TabList>

            <TabIndicator mt="-1.5px" height="4px" bg="#4F46E5" rounded="md" />

            <TabPanels className="max-w-3xl">
              {/* Questions */}
              <TabPanel>
                <Questionnaire
                  acceptingResponses={acceptingResponses}
                  setAcceptingResponses={setAcceptingResponses}
                />
              </TabPanel>
              {/* Responses */}
              <TabPanel>
                <Responses
                  acceptingResponses={acceptingResponses}
                  setAcceptingResponses={setAcceptingResponses}
                />
              </TabPanel>
              {/* Settings */}
              <TabPanel>
                <p>Settings!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default Create;
