/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
// components
// mock
import { getLoggedInUserDetails, uploadBlogCoverService } from '../Services/ApiServices';
import { getBlogsDetailsService } from '../_mock/blog';
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSearch, BlogPostsSort } from '../sections/@dashboard/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [blogPost, setBlogPost] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const blogDetails = await getBlogsDetailsService();
        setBlogPost(blogDetails);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);

  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const usersDetails = await getLoggedInUserDetails();
        if (usersDetails) setLoggedInUser(usersDetails.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);

  const displayAddUser = loggedInUser.role === 1 || loggedInUser.role === 2 ? 'flex' : 'none';

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(false);
  };

  // const handleFileChange = (e) => {
  //   // Handle file changes here
  //   const selectedFile = e.target.files[0];
  //   // Do something with the selected file
  //   console.log(selectedFile);
  // };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0]; 

    if (selectedFile) {
      console.log('Selected file:', selectedFile);

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await uploadBlogCoverService(formData);

      console.log(response.data);

      // const alertMessage = response.status === 200 ? response.data.message : 'Upload failed! Try again';

      // alert(alertMessage);
    }
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | CB </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blogs
          </Typography>
          <Button
            style={{ display: displayAddUser }}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setOpen(true)}
          >
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={blogPost} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {blogPost.map((post, index) => (
            <BlogPostCard key={post.blogid} post={post} index={index} />
          ))}
        </Grid>
      </Container>

      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Write a Blog'}</DialogTitle>
        <DialogContent>
          <form action="#" method="post" encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" className="form-control" id="title" name="title" required="" />
            </div>
            <div className="form-group" style={{ margin: '10px 0' }}>
              <label htmlFor="image" style={{ width: '100%' }}>
                Cover:
              </label>
              <input
                type="file"
                className="form-control-file"
                id="image"
                name="image"
                accept="image/*"
                required=""
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows={4}
                required=""
                defaultValue={''}
              />
            </div>
            {/* <button type="submit" className="btn btn-primary">
              Submit
            </button> */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClick}>
            Post
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
