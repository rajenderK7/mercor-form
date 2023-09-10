import { useEffect, useState } from "react";
import Question from "./Question";
import { AddIcon, LinkIcon, MailIcon, SendIcon } from "./Icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import formActions from "../actions/form.actions";
import { useRecoilValue } from "recoil";
import userAtom from "../state/auth";

const questionPlaceholder = {
  title: "",
  type: "radio",
  rules: { required: false },
  options: [],
};

interface T {
  _id?: string;
  title: string;
  type: string;
  rules: {
    required: boolean;
  };
  options?: string[];
}

const Questionnaire = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [questions, setQuestions] = useState<T[]>([questionPlaceholder]);
  const [emails, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formId, setFormId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSendMail = async () => {
    if (emails[emails.length - 1] === ";") {
      setEmails(emails.substring(0, emails.length - 1));
    }
    const res = await formActions.sendMail(emails, title, shareLink, subject);
    if (res.message === "success") {
      toast.success("Form invitations sent");
      setEmails("");
      onClose();
    } else {
      toast.error("Something went wrong");
    }
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, questionPlaceholder]);
  };

  const validForm = (formData: any) => {
    for (let i = 0; i < formData.fields.length; i++) {
      let q = formData.fields[i];
      if (!q.title || q.title.length === 0) {
        toast.error(`Question ${i + 1} is empty, please fill out`);
        return false;
      }
      if ((q.type === "select" || q.type === "radio") && q.options.length < 2) {
        toast.error(`Question ${i + 1} should have atleast 2 options`);
        return false;
      }
      return true;
    }
  };

  const saveForm = async () => {
    if (!title) {
      toast.error("Title is required");
      return;
    }
    const fields = questions.map((q) => {
      if (q.type === "select") {
        if (q.options && q.options[0] !== "Choose") {
          q.options.unshift("Choose");
        }
      }
      return {
        type: q.type,
        title: q.title,
        options: q.options,
        rules: {
          required: q.rules.required,
        },
      };
    });

    const formData = {
      creatorId: user.userId,
      title,
      desc,
      fields,
    };

    if (!validForm(formData)) {
      return;
    }

    if (!formId) {
      const fId = await formActions.createForm(formData);
      if (!fId) {
        toast.error("Please fill out the fields");
        return;
      }
      const params: URLSearchParams = new URLSearchParams();
      params.set("formId", fId);
      setSearchParams(params);
      setFormId(fId);
      onOpen();
    } else {
      await formActions.updateForm(formId, formData);
      onOpen();
    }
  };

  const fetchForm = async (formId: string) => {
    const data = await formActions.fetchForm(formId);
    setQuestions(data.form.fields);
    setTitle(data.form.title);
    setDesc(data.form.desc);
  };

  const init = async () => {
    const fId = searchParams.get("formId");
    setFormId(fId);
    if (fId) {
      setLoading(true);
      await fetchForm(fId);
      setLoading(false);
    }
  };

  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      navigate("/login", {
        replace: true,
      });
    }
    init();
  }, []);

  useEffect(() => {
    setShareLink(`${import.meta.env.VITE_CLIENT_URL}/form/${formId}`);
  }, [formId]);

  return (
    <>
      {loading && <p className="text-center">Loading..</p>}
      {!loading && (
        <div className="w-full font-sans">
          <div className="w-fit lg:w-auto mb-4 lg:mb-0 lg:fixed flex lg:flex-col space-x-5 lg:space-x-0 lg:space-y-3 lg:items-center right-[13%] top-[50%] bg-white p-3 rounded-md border border-gray-300">
            <Button
              size="sm"
              className="hover:text-[#4F46E5] w-full"
              onClick={addQuestion}
            >
              <AddIcon />
              Add question
            </Button>
            <>
              <Button
                size="sm"
                className="hover:text-[#4F46E5] w-full"
                onClick={saveForm}
              >
                <SendIcon />
                Share form
              </Button>

              <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent className="font-sans">
                  <ModalHeader>Send form</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody paddingTop={0}>
                    <p className="text-sm">Share via</p>
                    <Tabs
                      index={selectedIndex}
                      onChange={(index) => setSelectedIndex(index)}
                      className="text-black"
                    >
                      <TabList color="black" className="font-medium">
                        <Tab marginRight={4}>
                          <MailIcon />
                        </Tab>
                        <Tab>
                          <LinkIcon />
                        </Tab>
                      </TabList>

                      <TabPanels>
                        <TabPanel paddingX={0}>
                          <div>
                            <p className="font-medium text-sm">Email</p>
                            <label
                              htmlFor="emails"
                              className="block my-2 text-xs text-gray-900"
                            >
                              To
                            </label>
                            <input
                              type="text"
                              id="emails"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder="Use ';' to separate multiple emails"
                              required
                              value={emails}
                              onChange={(e) => setEmails(e.target.value)}
                            />
                            <label
                              htmlFor="subject"
                              className="block my-2 text-xs text-gray-900"
                            >
                              To
                            </label>
                            <input
                              type="text"
                              id="subject"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              placeholder="Subject"
                              required
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                            />
                          </div>
                        </TabPanel>
                        <TabPanel className="text-sm">
                          <p className="font-medium">Link</p>
                          <p className="py-1 border-b selection:bg-[#4F46E5] selection:text-white border-gray-300">
                            {shareLink}
                          </p>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </ModalBody>
                  <ModalFooter>
                    <Button mr={2} onClick={onClose} variant="ghost">
                      Close
                    </Button>
                    {selectedIndex == 0 ? (
                      <Button
                        onClick={handleSendMail}
                        color="#4F46E5"
                        variant="outline"
                      >
                        Send
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(shareLink);
                          toast.success("Share link copied to clipboard");
                        }}
                        color="#4F46E5"
                        variant="outline"
                      >
                        Copy
                      </Button>
                    )}
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          </div>
          <div className="flex flex-col bg-white border border-gray-300 border-t-8 border-t-[#4F46E5] text-start rounded-md shadow-sm mb-4 p-3 lg:p-6">
            <input
              name="title"
              type="text"
              className="text-3xl font-medium mercor-color outline-none  border-b-gray-300 py-1 border-b-2 focus:border-b-[#4F46E5]"
              placeholder="Untitled form"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
            <input
              name="desc"
              type="text"
              className="mt-3 mb-2 text-sm font-medium text-gray-600 outline-none border-b-gray-300 py-1 border-b-2 focus:border-b-[#4F46E5]"
              placeholder="Form description"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          {questions.map((question, idx) => {
            return (
              <div key={idx}>
                <Question
                  key={idx}
                  questionData={question}
                  onUpdate={(updatedData: any) => {
                    const updatedQuestions: any[] = [...questions];
                    updatedQuestions[idx] = updatedData;
                    setQuestions(updatedQuestions);
                  }}
                  onDelete={() => {
                    setQuestions((prev) => prev.filter((_, i) => i !== idx));
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Questionnaire;
