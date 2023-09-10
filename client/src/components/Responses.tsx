import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Button,
} from "@chakra-ui/react";
import Summary from "./Summary";
import formActions from "../actions/form.actions";
import ResponseQuestions from "./ResponseQuestions";
import { MySwitch } from "./Icons";

export interface IFormResponse {
  userId: string;
  formId: string;
  formData: {
    [field: string]: string;
  };
}

interface Q {
  [q: string]: string[];
}

interface ResponsesProps {
  acceptingResponses: boolean;
  setAcceptingResponses: Function;
}

const Responses = ({
  acceptingResponses,
  setAcceptingResponses,
}: ResponsesProps) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nResponses, setNResponses] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [summary, setSummary] = useState<Q>({});
  const [searchParams, _] = useSearchParams();
  const [formId, setFormId] = useState<string | null>(null);

  const fetchFormQuestions = async (formId: string) => {
    const data = await formActions.fetchFormQuestions(formId!);
    const types = data.types.map((t: any) => t.type);
    setQuestions(data.types);
    setTypes(types);
  };

  const acceptingResponsesHandler = async (e: any) => {
    setAcceptingResponses(e.target.checked);
    await formActions.updateAcceptance(formId!, e.target.checked);
  };

  const fetchResponses = async (formId: string) => {
    setLoading(true);
    const data = await formActions.fetchResponses(formId!);
    setNResponses(data.length);
    const responses: Q = {};

    data.forEach((response: IFormResponse) => {
      Object.keys(response.formData).forEach((q) => {
        if (q in responses) {
          responses[q].push(response.formData[q]);
        } else {
          responses[q] = [response.formData[q]];
        }
      });
    });

    setSummary(responses);
    setLoading(false);
  };

  useEffect(() => {
    const fId = searchParams.get("formId");
    if (fId) {
      setFormId(fId);
      fetchFormQuestions(fId!);
      fetchResponses(fId!);
    }
  }, [searchParams]);
  return (
    <>
      {!formId && (
        <p className="text-center">Create a form to view responses</p>
      )}
      {loading && <p>Loading...</p>}
      {formId && !loading && (
        <div className="w-full font-sans">
          <div className=" font-medium">
            <div className="flex items-center justify-between text-start px-3 py-3 w-full bg-white shadow-md rounded-t-md">
              <p className="text-2xl ">{nResponses} Responses</p>
              <Button
                color="#4F46E5"
                onClick={() => fetchResponses(formId)}
                className="hover:cursor-pointer font-semibold"
              >
                Refresh
              </Button>
            </div>
            <div className="flex justify-end bg-white items-center shadow-md">
              <p className="text-end text-sm pr-2">Accepting responses</p>
              <label className="relative inline-flex items-center cursor-pointer my-2">
                <input
                  name="acceptingResponses"
                  type="checkbox"
                  value="acceptingResponses"
                  // checked={x}
                  checked={acceptingResponses}
                  // onChange={(e) => {
                  //   // setX(e.target.checked);
                  //   setAcceptingResponses(e.target.checked);
                  //   console.log(e.target.checked);

                  //   // console.log(acceptingResponses);
                  // }}
                  onChange={acceptingResponsesHandler}
                  className="sr-only peer"
                />
                <MySwitch text="" />
              </label>
            </div>
            <Tabs align="center" variant="unstyled" border="2">
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
                <Tab>Question</Tab>
              </TabList>

              <TabIndicator
                mt="-1.5px"
                height="4px"
                bg="#4F46E5"
                rounded="md"
              />

              <TabPanels className="w-full">
                {/* Summary */}
                <TabPanel>
                  <Summary types={types} summary={summary} />
                </TabPanel>
                {/* Question */}
                <TabPanel>
                  <ResponseQuestions questions={questions} />
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
