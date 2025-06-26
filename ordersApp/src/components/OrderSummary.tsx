import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  CircularProgress,
  Stack,
  Divider,
  Fade
} from '@mui/material';
import {
  ArrowBack,
  ShoppingBag,
  Person,
  LocationOn,
  Email,
  CheckCircle,
  Error,
  Home
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { submitOrderThunk, clearOrderResponse, clearCart } from '../store/slices/cartSlice';
import { CustomerDetails } from '../types';

const OrderSummary: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { items: cartItems, submitting, orderResponse } = useAppSelector(state => state.cart);
  
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    address: '',
    email: '',
  });
  
  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});

  useEffect(() => {
    if (cartItems.length === 0 && !orderResponse) {
      navigate('/');
    }
  }, [cartItems.length, navigate, orderResponse]);

  useEffect(() => {
    return () => {
      dispatch(clearOrderResponse());
    };
  }, [dispatch]);

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerDetails> = {};
    
    if (!customerDetails.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!customerDetails.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!customerDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    dispatch(submitOrderThunk({
      customer: customerDetails,
      items: cartItems,
    }));
  };

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleNewOrder = () => {
    dispatch(clearOrderResponse());
    dispatch(clearCart());
    navigate('/');
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Show order result if order has been submitted
  if (orderResponse) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #e8f5e8 100%)',
        py: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container maxWidth="sm">
          <Fade in={true} timeout={800}>
            <Paper elevation={6} sx={{ p: 6, borderRadius: 4, textAlign: 'center' }}>
              <Box mb={4}>
                {orderResponse.success ? (
                  <CheckCircle sx={{ fontSize: 100, color: 'success.main', mb: 2 }} />
                ) : (
                  <Error sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
                )}
              </Box>
              
              <Typography variant="h3" fontWeight="bold" gutterBottom color={
                orderResponse.success ? 'success.main' : 'error.main'
              }>
                {orderResponse.success ? 'Order Confirmed!' : 'Order Failed'}
              </Typography>
              
              <Typography variant="h6" color="text.secondary" mb={3}>
                {orderResponse.message}
              </Typography>
              
              <Button
                variant="contained"
                onClick={handleNewOrder}
                startIcon={<Home />}
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2 30%, #0288D1 90%)',
                  },
                  boxShadow: 3
                }}
              >
                Start New Order
              </Button>
            </Paper>
          </Fade>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 50%, #e8f5e8 100%)',
      py: 4 
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Box 
            sx={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 80, 
              height: 80, 
              bgcolor: 'success.light', 
              borderRadius: '50%',
              mb: 2
            }}
          >
            <ShoppingBag sx={{ fontSize: 40, color: 'success.main' }} />
          </Box>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Order Summary
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Confirm your details and complete your order
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Customer Details Form */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Order Details
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={customerDetails.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Address"
                    value={customerDetails.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    error={!!errors.address}
                    helperText={errors.address}
                    required
                    multiline
                    rows={2}
                    InputProps={{
                      startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }} />
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />

                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/')}
                      startIcon={<ArrowBack />}
                      sx={{ flex: 1 }}
                    >
                      Back
                    </Button>
                    
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={submitting}
                      sx={{ 
                        flex: 1,
                        background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #388E3C 30%, #689F38 90%)',
                        }
                      }}
                    >
                      {submitting ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                          Submitting...
                        </>
                      ) : (
                        'Confirm Order'
                      )}
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Order Items */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Order Items ({totalItems})
              </Typography>
              
              <Stack spacing={2}>
                {cartItems.map((item) => (
                  <Card key={item.categoryId + item.name} variant="outlined" sx={{ bgcolor: 'grey.50' }}>
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
                          color="success"
                          variant="filled"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
              
              <Divider sx={{ my: 3 }} />
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Total Items:
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  {totalItems}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OrderSummary;