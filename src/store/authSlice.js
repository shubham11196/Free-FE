import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios

const API_BASE_URL = `${'https://admin-backend-fjzy.onrender.com'}/api`;
// const API_BASE_URL = `${'http://localhost:5000'}/api`;

const initialState = {
  user: {
    role:null,
    email: ""
  },
  token:'',
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for logging in
export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    console.log('https://admin-backend-fjzy.onrender.com','base url her');
      const response = await axios.post(`${API_BASE_URL}/users/login`, data);
    if (response.status === 201) {
        const payload = response.data;
      return payload;
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, data);
        console.log(response, 'respone from register');
      if (response.status === 201) {
          const payload = response.data;
        return payload;
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });

// Async thunk for logging out
export const logout = createAsyncThunk('authentication/logout', async (_, thunkAPI) => {
  try {

        const response = await axios.post(`${API_BASE_URL}/users/logout`);

    if (response.status === 200) {
        // localStorage.clear();
        return true;
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserDetails: (state, action)=> {
        state.isAuthenticated = true;
        state.user = action.payload.userlogin;
        state.token = action.payload.token;
        localStorage.setItem('email', state.user.email);
        localStorage.setItem('role', state.user.role);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        authenticationSlice.caseReducers.saveUserDetails(state, action);
        
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(register.pending, (state) => { //register related thunk reducers
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.userlogin;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {  // logout related actions
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default authenticationSlice.reducer;
export const { saveUserDetails } = authenticationSlice.actions;
