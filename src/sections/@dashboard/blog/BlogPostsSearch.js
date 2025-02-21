import PropTypes from 'prop-types';

// @mui
import { Autocomplete, InputAdornment, Popper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

BlogPostsSearch.propTypes = {
  posts: PropTypes.array.isRequired,
  onSearchPost: PropTypes.func.isRequired,
};

export default function BlogPostsSearch({ posts, onSearchPost }) {
  return (
    <Autocomplete
      sx={{ width: 280, marginRight: '1rem' }}
      autoHighlight
      popupIcon={null}
      PopperComponent={StyledPopper}
      options={posts}
      getOptionLabel={(post) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(event, newValue) => onSearchPost(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search post..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
