import ExampleAnswer from "../exampleAnswer/ExampleAnswer";
import Messages from "../response/Messages";
import MissingElements from "../response/MissingElements";
import SuccessMessage from "../response/SuccessMessage";

interface Props {
	missingElements: Array<string>;
	messages: Array<{ type: String; message: String }>;
	hasChecked: boolean;
	section: string;
	question: string;
}

export default function CodeCheckResponse({ missingElements, messages, hasChecked, section, question }: Props) {
	return (
		<>
			<MissingElements missing={missingElements} />
			<Messages messages={messages} />

			{hasChecked && (missingElements?.length > 0 || messages?.length > 0) && <ExampleAnswer section={section} question={question} />}
			{hasChecked && missingElements?.length === 0 && messages?.length === 0 ? <SuccessMessage /> : null}
		</>
	);
}
