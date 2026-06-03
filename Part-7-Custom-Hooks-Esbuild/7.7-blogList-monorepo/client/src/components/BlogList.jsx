import { Link } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import useBlogs from '../store/blogs';

const BlogList = () => {
  const { blogs } = useBlogs()
  if (!blogs || blogs.length === 0) {
    return <Typography>No blogs available</Typography>;
  }

  return (
    <List>
      {blogs.map((blog) => (
        <ListItem key={blog.id}>
          <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
            <ListItemText primary={blog.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default BlogList;