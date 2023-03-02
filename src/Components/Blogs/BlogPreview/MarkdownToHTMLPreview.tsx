import { useEffect, useState } from "react";
import styles from "./MarkdownToHTMLPreview.module.css";
import { Remarkable } from "remarkable";

type Props = {
	content: string;
};
const md = new Remarkable();
const MarkdownToHTMLPreview = ({ content }: Props) => {
	const [htmlPreview, setHtmlPreview] = useState<string>(
		md.render("## Dummy Blog Content")
	);
	useEffect(() => {
		if (content !== "") {
			setHtmlPreview(md.render(content));
		} else {
			setHtmlPreview(
				md.render(
					"## Dummy Blog Content\n\n- task1\n- task 2\n#### Fake Image\n![fakeImage](https://fakeimg.pl/120x108/282828/eae0d0/?retina=1&text=dummy%20image)"
				)
			);
		}
	}, [content]);
	return (
		<div
			dangerouslySetInnerHTML={{ __html: htmlPreview }}
			className={styles.div}></div>
	);
};

export default MarkdownToHTMLPreview;
