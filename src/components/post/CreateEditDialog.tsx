import { fetchCreatePost } from "@/api/post/create";
import { fetchEditPost } from "@/api/post/edit";
import { Post } from "@/constants/type/post";
import {
  Button,
  DialogActions,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useState } from "react";

export type payloadEditPost = {
  title?: string;
  body?: string;
};

export default function CreateEditDialogPost({
  isEdit,
  onClose,
  onSuccess,
  post,
}: {
  isEdit: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  post?: Post;
}) {
  const [payload, setPayload] = useState<payloadEditPost>({
    title: post?.title,
    body: post?.body,
  });

  const handleSubmit = async () => {
    try {
      isEdit
        ? await fetchEditPost(post?.id, payload)
        : await fetchCreatePost({ title: payload.title, body: payload.body });
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          placeholder="Title"
          className="my-[2px]"
          defaultValue={post?.title ?? ""}
          onChange={(e) => {
            setPayload((old) => ({ ...old, title: e.target.value }));
          }}
        />
        <TextareaAutosize
          id="body"
          aria-label=""
          placeholder="Body"
          className="my-[2px]"
          minRows={3}
          defaultValue={post?.body ?? ""}
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
