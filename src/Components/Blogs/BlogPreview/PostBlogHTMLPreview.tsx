import styles from "./PostBlogHTMLPreview.module.css";

type Props = {
	content: string;
};

const PostBlogHTMLPreview = ({ content }: Props) => {
	return (
		<div
			dangerouslySetInnerHTML={{ __html: content }}
			className={styles.div}></div>
	);
};

export default PostBlogHTMLPreview;
