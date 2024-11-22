import { fetchProfile } from "@/api/auth/profile";
import { fetchGetAllPost } from "@/api/post/get-all";
import { Post } from "@/constants/type/post";
import { Box, Button, IconButton, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import image1 from "@asset/news.svg";
import { User } from "@/constants/type/user";
import { useRouter } from "next/navigation";
import CustomDialog from "../dialog/Dialog";
import CreateEditDialogPost from "./CreateEditDialog";
import { fetchDeletePost } from "@/api/post/delete";
import { PaginateAllPost } from "@/constants/response/post/paginate-all-post.response";
import CustomAlert from "../alert";

export default function ListPost() {
  const [allPost, setAllPost] = useState<Post[]>([]);
  const [paginate, setPaginate] = useState<PaginateAllPost | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasUser, setHasUser] = useState(false);
  const [dataUser, setDataUser] = useState<User>({});
  const [isOpenEdit, setIsOpenEdit] = useState<Post | undefined>(undefined);
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false);
  const [isOpenDelete, setIsOpenDelete] = useState<Post | undefined>(undefined);
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetchGetAllPost({ page: paginate?.current_page })
      .then((data) => {
        if (data.result!.total >= 1) setAllPost(data.result!.data);
        setPaginate(data.result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });

    fetchProfile()
      .then((data) => {
        if (data.status === "SUCCESS") {
          setHasUser(true);
          setDataUser(data.result!.profile);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isOpenEdit, isOpenCreate, isOpenDelete, paginate?.current_page]);

  const handleDetailPost = async (id: number) => {
    router.push(`/detail-post/${id}`);
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetchDeletePost(isOpenDelete?.id);
      setIsOpenDelete(undefined);
      setAlertMessage("Success delete post");
      setIsOpenAlert(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaginate = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    try {
      const response = await fetchGetAllPost({ page: value });
      setPaginate(response.result);
      console.log(response.result);
    } catch (error) {
      throw error;
    }
  };

  if (isLoading)
    return (
      <div className="h-full flex justify-center items-center pt-[100px]">
        <MoonLoader loading={isLoading} color="#1650b3" />
      </div>
    );

  return (
    <>
      <Box className="flex justify-between mt-20 ml-5">
        {hasUser && (
          <Button
            variant="contained"
            onClick={() => {
              setIsOpenCreate(true);
            }}
          >
            Create new post
          </Button>
        )}
        {Boolean(paginate) && (
          <Pagination
            count={paginate?.last_page}
            page={paginate?.current_page}
            sx={{
              position: "relative",
              width: "auto",
              height: "auto",
              translate: "0 0",
              bgcolor: "white",
              borderRadius: "5px",
              mr: "20px",
            }}
            onChange={handlePaginate}
          ></Pagination>
        )}
      </Box>
      {!allPost.length && (
        <Box display={"flex"} justifyContent={"center"}>
          <Typography>Belum ada Post</Typography>
        </Box>
      )}
      {allPost.length > 0 &&
        allPost.map((post: Post, index: number) => (
          <section className={(index + 1) % 2 === 0 ? "shaded" : ""}>
            <img src={image1.src} />
            <div
              onClick={() => {
                handleDetailPost(post.id);
              }}
              style={{ cursor: "pointer" }}
            >
              <h2 style={{ cursor: "pointer" }}>{post.title}</h2>
              <p>
                created at : {new Date(post!.created_at || 0).toDateString()}
              </p>
              <p>{post.body}</p>
              <p>
                author :{" "}
                {hasUser && post.author_id === dataUser?.id
                  ? "Me"
                  : post.user?.name}
              </p>
            </div>
            {hasUser && dataUser?.id === post.author_id ? (
              <div className="flex">
                <IconButton
                  aria-label="edit"
                  color="secondary"
                  onClick={() => {
                    setIsOpenEdit(post);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => {
                    setIsOpenDelete(post);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : (
              ""
            )}
          </section>
        ))}
      <CustomDialog
        open={Boolean(isOpenEdit)}
        title={Boolean(isOpenEdit) ? `Edit Post ${isOpenEdit?.title}` : "Edit"}
        desc=""
        onClose={() => {
          setIsOpenEdit(undefined);
        }}
        withButtons={false}
      >
        <CreateEditDialogPost
          onClose={() => {
            setIsOpenEdit(undefined);
          }}
          onSuccess={() => {
            setAlertMessage("Success edit post");
            setIsOpenAlert(true);
          }}
          post={isOpenEdit}
          isEdit={true}
        ></CreateEditDialogPost>
      </CustomDialog>
      <CustomDialog
        open={isOpenCreate}
        title="Create new Post"
        desc="You will create new post"
        onClose={() => {
          setIsOpenCreate(false);
        }}
        withButtons={false}
      >
        <CreateEditDialogPost
          onClose={() => {
            setIsOpenCreate(false);
          }}
          onSuccess={() => {
            setAlertMessage("Success create post");
            setIsOpenAlert(true);
          }}
          isEdit={false}
        ></CreateEditDialogPost>
      </CustomDialog>
      <CustomDialog
        open={Boolean(isOpenDelete)}
        title={
          Boolean(isOpenDelete)
            ? `Delete Post : ${isOpenDelete?.title}`
            : "Delete"
        }
        desc="You will delete this post permanently"
        onClose={() => {
          setIsOpenDelete(undefined);
        }}
        action={handleDeletePost}
        withButtons={true}
      ></CustomDialog>
      <CustomAlert
        open={isOpenAlert}
        message={alertMessage}
        onClose={() => setIsOpenAlert(false)}
        severity="success"
      ></CustomAlert>
    </>
  );
}
