import PropTypes from 'prop-types';
// @mui
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

BlogPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func,
  selectedOption: PropTypes.func,
};

export default function BlogPostsSort({ options, onSort, selectedOption }) {
  return (
    <TextField select size="small" value={selectedOption} onChange={onSort} sx={{ width: '10rem' }}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
