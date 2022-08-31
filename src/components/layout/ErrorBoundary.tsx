import { Component, ErrorInfo, ReactNode } from "react";
import { Container, Alert, AlertIcon, AlertTitle, Box } from "@chakra-ui/react";
import * as gtag from "../../lib/gtag";

interface Props {
	displayMessage?: string;
	eventAction?: string;
	eventCategory?: string;
	eventLabel?: string;
	children: ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		const { eventAction, eventCategory, eventLabel } = this.props;
		gtag.event({
			action: eventAction ?? "error",
			category: eventCategory ?? "general",
			label: eventLabel ?? errorInfo.toString(),
			value: error.message,
		});
	}

	render() {
		if (this.state.hasError) {
			return (
				<Box mt={3} width="100%" data-testid="error-boundary">
					<Alert status="error">
						<AlertIcon />
						<AlertTitle>{this.props.displayMessage ?? "Something went wrong."}</AlertTitle>
					</Alert>
				</Box>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
