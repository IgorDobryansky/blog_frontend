import { CommentType } from "@/types/types";


export default function Comment({comment}: {comment: CommentType}) {
  return (
    <div>{comment.text}</div>
  )
}
