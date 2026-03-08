import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  users: [
    {
      id: 1,
      name: 'Админ',
      email: 'abdualimshirahunov@gmail.com',
      password: '123',
      role: 'admin'
    },
    {
      id: 2,
      name: 'Абду-Алим',
      email: 'shirakhunov_al@iuca.kg',
      password: '123',
      role: 'user'
    }
  ],
  showAuth: false,
  isRegistering: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(u => u.email === email && u.password === password);
      if (user) {
        state.user = { ...user, password: undefined };
        state.isAuthenticated = true;
        state.showAuth = false;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    register: (state, action) => {
      const newUser = {
        id: state.users.length + 1,
        ...action.payload,
        role: 'user'
      };
      state.users.push(newUser);
      state.user = { ...newUser, password: undefined };
      state.isAuthenticated = true;
      state.showAuth = false;
    },
    toggleAuth: (state, action) => {
      state.showAuth = action.payload;
    },
    toggleRegisterMode: (state) => {
      state.isRegistering = !state.isRegistering;
    }
  }
});

export const { login, logout, register, toggleAuth, toggleRegisterMode } = authSlice.actions;
export default authSlice.reducer;
