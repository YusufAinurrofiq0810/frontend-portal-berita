import { Comment } from "@/constants/type/comment";
import { User } from "@/constants/type/user";
import { Grid2 } from "@mui/material";

export default function BoxComment({
  comment,
  user,
}: {
  comment: Comment;
  user: User;
}) {
  return (
    <Grid2 container wrap="nowrap" spacing={2}>
      <Grid2 justifyContent="left">
        <h4 style={{ margin: 0, textAlign: "left" }}>
          user : {comment.user_id === user.id ? "Me" : comment.user?.name}
        </h4>
        <p style={{ textAlign: "left" }}>{comment.body}</p>
        <p style={{ textAlign: "left", color: "gray" }}>
          {new Date(comment?.created_at).toDateString()}{" "}
          {new Date(comment?.created_at).toTimeString()}
        </p>
      </Grid2>
    </Grid2>
  );
}
