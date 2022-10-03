export type CommentType = {
	_id: string;
	message: string;
	by: {
		_id: string;
		name: string;
	};
	date: Date;
};

export type PostCommentPayload = {
	message: string;
	_id: string; // this will be the blog id of the blog on which comment has to be posted.
};
