import { Post } from "@/constants/type/post";
import { User } from "@/constants/type/user";
import { Box, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";

export default function OnePost({ post, user }: { post: Post; user?: User }) {
  const router = useRouter();

  return (
    <Container className="h-full w-[90%] mt-[100px]">
      <Button
        variant="contained"
        onClick={() => {
          router.replace("/");
        }}
        className="mb-2"
      >
        Back to All Post
      </Button>
      <Box border={"1px solid grey"} borderRadius={"5px"} className="p-[10px]">
        <h2>{post.title}</h2>
        <h6>Author : {post.user?.id === user?.id ? "Me" : post.user?.name}</h6>
        <p>{post.body}</p>
        <p>Created at : {new Date(post!.created_at || 0).toDateString()}</p>
      </Box>
    </Container>
  );
}
