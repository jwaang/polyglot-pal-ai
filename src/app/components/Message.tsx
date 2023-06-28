import { DocumentData } from "firebase/firestore";
import { isObject } from "lodash";
import safeParse from "../../../lib/safeParse";
import { Tooltip } from "react-tooltip";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";

type Props = {
  message: DocumentData;
  messageId: string;
};

function Message({ message, messageId }: Props) {
  const { languageSelected } = message;
  const isChatGPT = message.user.name === "ChatGPT";
  const parsedMessage = safeParse(message.text);
  const { [languageSelected]: output, english } = parsedMessage;
  const isObj = isObject(parsedMessage);
  console.log();
  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#3362a8]"}`}>
      <div className="flex space-x-5 px-10 max-w-2xl mx-auto">
        {isChatGPT ? <CubeTransparentIcon className="h-8 w-8" /> : <img src={message.user.avatar} alt="" className="h-8 w-8" />}
        <a data-tooltip-id={messageId}>
          <p className="pt-1 text-sm">{isObj ? output : message.text}</p>
        </a>
      </div>
      {isObj && (
        <Tooltip id={`${messageId}`} clickable className="max-w-xs">
          {english}
        </Tooltip>
      )}
    </div>
  );
}

export default Message;
