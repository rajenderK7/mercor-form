import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { formatDate } from "../helpers/form";
import { DeleteIcon } from "./Icons";
import { Button } from "@chakra-ui/react";
import formActions from "../actions/form.actions";
import toast from "react-hot-toast";

interface MyFormProps {
  e: any;
  fetchMyForms: Function;
}

const MyFrom = ({ e, fetchMyForms }: MyFormProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteMyFormHandler = async () => {
    const res = await formActions.deleteMyForm(e._id, e.creatorId);
    if (res.message === "success") {
      toast.success("Form deleted successfully");
      fetchMyForms();
    } else {
      toast.success("Something went wrong");
    }
    onClose();
  };

  return (
    <div className="flex justify-between bg-slate-50 rounded-sm border border-gray-200 items-center hover:bg-slate-100 mb-3">
      <Link
        to={`/create?formId=${e._id}`}
        className="flex  lg:justify-between lg:items-center w-full p-2 flex-col lg:flex-row"
      >
        <p className="font-medium">{e.title}</p>
        <div className="flex text-xs lg:text-sm">
          <p className="mr-2">
            Last Opened: <span>{formatDate(e.updatedAt)}</span>
          </p>
        </div>
      </Link>
      <Button
        onClick={onOpen}
        color="red.500"
        rounded="lg:none"
        className="mr-2 lg:mr-0"
      >
        <DeleteIcon />

        <Modal
          isCentered
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Do you want to delete?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <h1 className="text-xl font-medium mb-3">{e.title}</h1>
              <p>You can't undo this action</p>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} variant="ghost">
                Cancel
              </Button>
              <Button colorScheme="red" onClick={deleteMyFormHandler}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Button>
    </div>
  );
};

export default MyFrom;
