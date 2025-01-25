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
// components
// mock
import { addBlogService, getAccountDetails, uploadBlogCoverService } from '../Services/ApiServices';
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
  const [blogInfo, setBlogInfo] = useState({ title: '', cover: '', content: '' });

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

  const [accountInfo, setAccountInfo] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAccountDetails();
        setAccountInfo(response.data);
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    }

    fetchData();
  }, []);
  console.log(accountInfo);

  const displayAddUser = accountInfo.role === 1 || accountInfo.role === 2 ? 'flex' : 'none';

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    setBlogInfo({ ...blogInfo, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const requestBody = {
        authorName: accountInfo.name,
        authorPhoto: accountInfo.dpurl,
        title: blogInfo.title,
        cover: blogInfo.cover,
        content: blogInfo.content,
      };
      const response = await addBlogService(requestBody);

      const alertMessage = response.status === 200 ? 'Successfully added!' : 'Process failed! Try again';
      alert(alertMessage);
    } catch (error) {
      console.error('Error posting blog:', error);
      alert('Process failed! Try again');
    } finally {
      setOpen(false);
    }
  };

  const handleFileChange = async (event) => {
    try {
      const selectedFile = event.target.files?.[0];

      if (!selectedFile) {
        console.error('No file selected.');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await uploadBlogCoverService(formData);

      const key = 'cover';
      const value = response?.data?.value || '';
      console.log(value);

      setBlogInfo({ ...blogInfo, [key]: value });
    } catch (error) {
      console.error('Error uploading file:', error);
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

      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{'Write a Blog'}</DialogTitle>
        <DialogContent>
          <form action="#" method="post" encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                required=""
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group" style={{ margin: '10px 0' }}>
              <label htmlFor="image" style={{ width: '100%' }}>
                Cover:
              </label>
              <input
                type="file"
                className="form-control-file"
                id="image"
                name="cover"
                onChange={(e) => handleFileChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                className="form-control"
                id="description"
                name="content"
                rows={4}
                required=""
                defaultValue={''}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
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
