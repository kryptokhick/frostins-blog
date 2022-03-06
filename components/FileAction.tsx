import { ComponentType, FC, ReactNode } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import InlineCode from "./InlineCode";
import { Flex, Icon } from "@chakra-ui/react";
import {
  RiFileAddLine,
  RiFileEditLine,
  RiFileTransferLine,
  RiFileReduceLine,
} from "react-icons/ri";
import { formatFilePath } from "./utils";

interface FileActionProps {
  path: string;
  action: FileActionType;
  code?: string;
  label?: string;
}

type FileActionType = "open" | "add" | "update" | "delete";

const icons = {
  open: RiFileTransferLine,
  add: RiFileAddLine,
  delete: RiFileReduceLine,
  update: RiFileEditLine,
};

const FileAction: FC<FileActionProps> = ({
  path,
  action,
  code = "",
  label,
}) => {
  const { sandpack } = useSandpack();

  return (
    <InlineCode
      onClick={() => {
        if (action === "open") {
          sandpack.openFile(path);
        } else if (action === "add") {
          sandpack.updateFile(path, code);
          sandpack.openFile(path);
        } else if (action === "update") {
          sandpack.updateFile(path, code);
          sandpack.openFile(path);
        } else if (action === "delete") {
          sandpack.closeFile(path);
          sandpack.deleteFile(path);
        }
      }}
      cursor="pointer"
      bg="whiteAlpha.200"
      _hover={{
        bg: "whiteAlpha.300",
      }}
      color="orange.200"
      transition="all .2s"
      tabIndex={0}
    >
      <Icon alignSelf="center" fontSize="md" as={icons[action]} mr="1" />
      {label || formatFilePath(path)}
    </InlineCode>
  );
};

export default FileAction;
