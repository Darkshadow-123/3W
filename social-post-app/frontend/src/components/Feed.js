import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import CreatePost from './CreatePost';
import Post from './Post';
import { postsAPI } from '../services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAll();
      setPosts(response.data);
      setError('');
    } catch (error) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map((post) => (post._id === updatedPost._id ? updatedPost : post)));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth={600} mx="auto" sx={{ p: 2 }}>
      <CreatePost onPostCreated={handlePostCreated} />
      {error && <Alert severity="error">{error}</Alert>}
      {posts.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ mt: 4 }}>
          No posts yet. Be the first to create one!
        </Typography>
      ) : (
        posts.map((post) => (
          <Post key={post._id} post={post} onPostUpdated={handlePostUpdated} />
        ))
      )}
    </Box>
  );
};

export default Feed;
