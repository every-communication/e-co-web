import { type ComponentProps, type ReactNode } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

interface Props extends Omit<ComponentProps<"input">, "onDrop"> {
	children: ReactNode;
	options: DropzoneOptions;
}

const Dropzone: React.FC<Props> = ({ children, className, options, ...props }) => {
	const { getRootProps, getInputProps } = useDropzone(options);

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} {...props} />
			{children}
		</div>
	);
};

export default Dropzone;
