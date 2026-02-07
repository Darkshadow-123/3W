import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { AddPhotoAlternate } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !image) return;

    setLoading(true);
    try {
      const response = await postsAPI.create({ text, image });
      onPostCreated(response.data);
      setText('');
      setImage('');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <AddPhotoAlternate sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || (!text && !image)}
          >
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CreatePost;
