import { Post } from "@/constants/type/post";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import BoxComment from "./BoxComment";
import { fetchCommentsByPost } from "@/api/comments/get-all-by-post";
import { Comment } from "@/constants/type/comment";
import AddIcon from "@mui/icons-material/Add";
import CustomDialog from "../dialog/Dialog";
import CreateEditDialogComment from "./CreateEditDialog";
import CachedIcon from "@mui/icons-material/Cached";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "@/constants/type/user";
import { fetchDeleteComment } from "@/api/comments/delete";
import CustomAlert from "../alert";

export default function Comments({ post, user }: { post: Post; user: User }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenCreate, setIsOpenCreate] = useState<Post | undefined>(undefined);
  const [isOpenEdit, setIsOpenEdit] = useState<Comment | undefined>(undefined);
  const [isOpenDelete, setIsOpenDelete] = useState<Comment | undefined>(
    undefined
  );
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  useEffect(() => {
    if (post.id)
      fetchCommentsByPost(post.id)
        .then((data) => {
          setComments(data.result?.comment ?? []);
        })
        .catch((error) => {})
        .finally(() => setIsLoading(false));
  }, [isOpenCreate, isLoading, isOpenEdit, isOpenDelete]);

  const handleDeleteComment = async () => {
    try {
      await fetchDeleteComment(isOpenDelete);
      setIsOpenDelete(undefined);
      setAlertMessage("Success delete comment");
      setIsAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="h-full w-[90%] pt-5">
      <CustomAlert
        open={isAlert}
        severity="success"
        message={alertMessage}
        onClose={() => setIsAlert(false)}
      ></CustomAlert>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"}>
          <h2>Comments ({comments.length})</h2>
          <IconButton onClick={() => setIsLoading(true)}>
            <CachedIcon />
          </IconButton>
        </Stack>
        <Button
          onClick={() => setIsOpenCreate(post)}
          variant="contained"
          color="primary"
          endIcon={<AddIcon />}
        >
          Tambah Komen
        </Button>
      </Stack>
      <Divider variant="fullWidth" sx={{ mb: "20px" }} />
      {isLoading && <CircularProgress color="info" />}
      {!isLoading && comments.length === 0 && <h4>No comments yet</h4>}
      {!isLoading &&
        comments.length > 0 &&
        comments.map((comment: Comment) => (
          <>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <BoxComment comment={comment} user={user}></BoxComment>
              {comment.user_id === user.id ? (
                <Stack direction={"row"}>
                  <IconButton
                    aria-label="edit"
                    color="secondary"
                    onClick={() => setIsOpenEdit(comment)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => setIsOpenDelete(comment)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              ) : null}
            </Stack>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
          </>
        ))}
      <CustomDialog
        open={Boolean(isOpenCreate)}
        title={`Create new comment`}
        desc={
          Boolean(isOpenCreate)
            ? `You will comment on post ${isOpenCreate?.title}`
            : ""
        }
        onClose={() => setIsOpenCreate(undefined)}
        withButtons={false}
      >
        <CreateEditDialogComment
          onClose={() => {
            setIsOpenCreate(undefined);
          }}
          onSuccess={() => {
            setAlertMessage("Success add comment");
            setIsAlert(true);
          }}
          isEdit={false}
          post={post}
        ></CreateEditDialogComment>
      </CustomDialog>
      <CustomDialog
        open={Boolean(isOpenEdit)}
        title={`Edit comment`}
        desc="You will edit comment"
        onClose={() => setIsOpenEdit(undefined)}
        withButtons={false}
      >
        <CreateEditDialogComment
          onClose={() => {
            setIsOpenEdit(undefined);
          }}
          onSuccess={() => {
            setAlertMessage("Success edit comment");
            setIsAlert(true);
          }}
          isEdit={true}
          post={post}
          comment={isOpenEdit}
        ></CreateEditDialogComment>
      </CustomDialog>
      <CustomDialog
        open={Boolean(isOpenDelete)}
        title={`Delete comment !`}
        desc="You will delete comment permanently"
        onClose={() => setIsOpenDelete(undefined)}
        action={handleDeleteComment}
        withButtons={true}
      ></CustomDialog>
    </Container>
  );
}
