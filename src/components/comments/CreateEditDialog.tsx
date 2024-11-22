import { fetchCreateComment } from "@/api/comments/create";
import { fetchEditComment } from "@/api/comments/edit";
import { Comment } from "@/constants/type/comment";
import { Post } from "@/constants/type/post";
import {
  Button,
  DialogActions,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function CreateEditDialogComment({
  post,
  onClose,
  onSuccess,
  isEdit,
  comment,
}: {
  onClose: () => void;
  onSuccess?: () => void;
  post?: Post;
  isEdit?: boolean;
  comment?: Comment;
}) {
  const [payload, setPayload] = useState<{ body?: string }>({});

  const handleSubmit = async () => {
    try {
      isEdit
        ? await fetchEditComment(comment?.id, payload)
        : await fetchCreateComment(post?.id, payload);
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <TextareaAutosize
          id="body"
          aria-label=""
          placeholder="Body"
          className="my-[2px]"
          minRows={3}
          defaultValue={comment?.body ?? ""}
          onChange={(e) => {
            setPayload((old) => ({ ...old, body: e.target.value }));
          }}
          style={{
            minWidth: "300px",
            border: "1px solid grey",
            borderRadius: "5px",
            background: "dark",
            padding: "8px 8px",
          }}
        ></TextareaAutosize>
      </Stack>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </>
  );
}
