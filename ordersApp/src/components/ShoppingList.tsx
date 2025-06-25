import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import {
  ShoppingCart,
  Add,
  Remove,
  ArrowForward,
  Inventory
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loadCategories } from '../store/slices/categoriesSlice';
import { addItem } from '../store/slices/cartSlice';
import { CartItem } from '../types';

const ShoppingList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { categories, loading: categoriesLoading, error } = useAppSelector(state => state.categories);
  const { items: cartItems } = useAppSelector(state => state.cart);
  
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const handleAddToCart = () => {
    if (!selectedCategoryId || !productName.trim()) {
      alert('Please select a category and enter a product name');
      return;
    }

    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
    if (!selectedCategory) return;

    const newItem: CartItem = {
      id: `${selectedCategoryId}-${productName}-${Date.now()}`,
      name: productName.trim(),
      categoryId: selectedCategoryId,
      categoryName: selectedCategory.name,
      quantity,
    };

    dispatch(addItem(newItem));
    setProductName('');
    setQuantity(1);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #e8f5e8 100%)',
      py: 4 
    }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 80, 
              height: 80, 
              bgcolor: 'primary.light', 
              borderRadius: '50%',
              mb: 2
            }}
          >
            <Inventory sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Shopping List
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Select a category and add products to your shopping cart
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Shopping Form */}
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Stack spacing={3}>
            {/* Category Selection */}
            <FormControl fullWidth>
              <InputLabel>Select Category</InputLabel>
              <Select
                value={selectedCategoryId}
                label="Select Category"
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                disabled={categoriesLoading}
              >
                {categoriesLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Loading categories...
                  </MenuItem>
                ) : (
                  Array.isArray(categories) && categories.length && categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            {/* Product Name */}
            <TextField
              fullWidth
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name..."
              disabled={!selectedCategoryId}
            />

            {/* Quantity */}
            <Box>
              <Typography variant="body1" fontWeight="medium" mb={1}>
                Quantity
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <IconButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  color="primary"
                >
                  <Remove />
                </IconButton>
                <Chip 
                  label={quantity} 
                  color="primary" 
                  variant="outlined"
                  sx={{ minWidth: 60, fontWeight: 'bold' }}
                />
                <IconButton
                  onClick={() => setQuantity(quantity + 1)}
                  color="primary"
                >
                  <Add />
                </IconButton>
              </Box>
            </Box>

            {/* Add Button */}
            <Button
              variant="contained"
              size="large"
              onClick={handleAddToCart}
              disabled={!selectedCategoryId || !productName.trim()}
              sx={{ 
                py: 1.5,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #0288D1 90%)',
                }
              }}
            >
              Add Product to Cart
            </Button>
          </Stack>
        </Paper>

        {/* Cart Items */}
        {cartItems.length > 0 && (
          <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
            <Box display="flex" alignItems="center" mb={3}>
              <ShoppingCart sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h5" fontWeight="bold">
                Shopping Cart ({totalItems} items)
              </Typography>
            </Box>
            
            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Card key={item.id} variant="outlined" sx={{ bgcolor: 'grey.50' }}>
                  <CardContent sx={{ py: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="h6" fontWeight="medium">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.categoryName}
                        </Typography>
                      </Box>
                      <Chip 
                        label={`Qty: ${item.quantity}`}
                        color="primary"
                        variant="filled"
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Paper>
        )}

        {/* Continue Button */}
        {cartItems.length > 0 && (
          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/order-summary')}
              endIcon={<ArrowForward />}
              sx={{ 
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #388E3C 30%, #689F38 90%)',
                },
                boxShadow: 3
              }}
            >
              Continue to Order
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ShoppingList;