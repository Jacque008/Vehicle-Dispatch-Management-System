/**
 * Utility functions
 */

// Format date to readable string
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  const hour = d.getHours().toString().padStart(2, '0');
  const minute = d.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}`;
};

// Format time only
const formatTime = (date) => {
  const d = new Date(date);
  const hour = d.getHours().toString().padStart(2, '0');
  const minute = d.getMinutes().toString().padStart(2, '0');

  return `${hour}:${minute}`;
};

// Show success toast
const showSuccess = (title) => {
  wx.showToast({
    title,
    icon: 'success',
    duration: 2000
  });
};

// Show error toast
const showError = (title) => {
  wx.showToast({
    title,
    icon: 'none',
    duration: 2000
  });
};

// Show loading
const showLoading = (title = 'Loading...') => {
  wx.showLoading({
    title,
    mask: true
  });
};

// Hide loading
const hideLoading = () => {
  wx.hideLoading();
};

// Validate email
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Check if user is logged in
const isLoggedIn = () => {
  const token = wx.getStorageSync('token');
  return !!token;
};

// Logout
const logout = () => {
  wx.removeStorageSync('token');
  wx.removeStorageSync('userInfo');

  const app = getApp();
  app.globalData.token = null;
  app.globalData.userInfo = null;

  wx.reLaunch({
    url: '/pages/login/login'
  });
};

module.exports = {
  formatDate,
  formatTime,
  showSuccess,
  showError,
  showLoading,
  hideLoading,
  isValidEmail,
  isLoggedIn,
  logout
};
