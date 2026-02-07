import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
  Collapse,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Comment,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../services/api';

const Post = ({ post, onPostUpdated }) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    try {
      const response = await postsAPI.like(post._id);
      onPostUpdated(response.data);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setLoading(true);
    try {
      const response = await postsAPI.comment(post._id, { text: commentText });
      onPostUpdated(response.data);
      setCommentText('');
    } catch (error) {
      console.error('Error commenting on post:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLiked = user && post.likes.includes(user.username);

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {post.username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={post.username}
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      <CardContent>
        {post.text && (
          <Typography variant="body1" paragraph>
            {post.text}
          </Typography>
        )}
        {post.image && (
          <Box
            component="img"
            src={post.image}
            alt="Post image"
            sx={{
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLike} color={isLiked ? 'error' : 'default'}>
          {isLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}
        </Typography>
        <IconButton onClick={() => setShowComments(!showComments)}>
          <Comment />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
        </Typography>
      </CardActions>
      <Collapse in={showComments}>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            {post.comments.map((comment, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Typography variant="subtitle2" color="primary">
                  {comment.username}
                </Typography>
                <Typography variant="body2">{comment.text}</Typography>
              </Box>
            ))}
          </Box>
          <Box component="form" onSubmit={handleComment} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={loading || !commentText.trim()}
            >
              Comment
            </Button>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
