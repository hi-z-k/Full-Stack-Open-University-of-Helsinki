import { Box, Button, TextField } from "@mui/material"
import { useUser } from "../store/user"
import useField from "../hooks/useField"
import { blogActions } from "../store/blogs"


const CommentForm = ({id})=>{
    const { user } = useUser()
    const comment = useField()
    const handleComment = async(e)=>{
      e.preventDefault()
      await blogActions.addComment(id, {content: comment.props.value})
      comment.actions.reset()
    }
    if(!user){
        return null
    }
    return (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            label="add a comment"
            {...comment.props}
            size="small"
          />
          <Button variant="contained" size="medium" onClick={handleComment}>
            ADD COMMENT
          </Button>
        </Box>
    )
}

export default CommentForm