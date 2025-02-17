import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.goit.global/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
  'auth/register',
  async (newUser, thunkAPI) => {
    try {
      console.log('Registering user with data:', newUser);
      const response = await axios.post('/users/signup', newUser);
      setAuthHeader(response.data.token);
      toast.success('Registration successful!');
      return response.data;
    } catch (error) {
      toast.error('Registration failed!');
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 11000
      ) {
        return thunkAPI.rejectWithValue('Email is already in use.');
      }
      console.error(
        'Registration error:',
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk('auth/login', async (creds, thunkAPI) => {
  try {
    const response = await axios.post('/users/login', creds);
    setAuthHeader(response.data.token);
    return response.data;
  } catch (error) {
    toast.error('Login failed!');
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    setAuthHeader('');
    toast.success('Logged out successfully!');
  } catch (error) {
    toast.error('Logout failed!');
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const reduxState = thunkAPI.getState();
    setAuthHeader(reduxState.auth.token);

    try {
      const response = await axios.get('/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null;
    },
  }
);
