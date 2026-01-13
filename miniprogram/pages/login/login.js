// pages/login/login.js
const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    email: '',
    otpCode: '',
    otpSent: false,
    loading: false,
    isEmailValid: false
  },

  onLoad() {
    // Check if already logged in
    if (util.isLoggedIn()) {
      wx.switchTab({
        url: '/pages/home/home'
      });
    }
  },

  onEmailInput(e) {
    const email = e.detail.value;
    this.setData({
      email,
      isEmailValid: util.isValidEmail(email)
    });
  },

  onOtpInput(e) {
    this.setData({
      otpCode: e.detail.value
    });
  },

  async handleSendOtp() {
    const { email } = this.data;

    if (!util.isValidEmail(email)) {
      util.showError('Please enter a valid email');
      return;
    }

    this.setData({ loading: true });

    try {
      const result = await api.auth.sendOtp(email);

      if (result.sendOtp.success) {
        util.showSuccess('Verification code sent');
        this.setData({
          otpSent: true,
          loading: false
        });
      } else {
        util.showError(result.sendOtp.message);
        this.setData({ loading: false });
      }
    } catch (error) {
      util.showError(error.toString());
      this.setData({ loading: false });
    }
  },

  async handleVerifyOtp() {
    const { email, otpCode } = this.data;

    if (otpCode.length !== 6) {
      util.showError('Please enter 6-digit code');
      return;
    }

    this.setData({ loading: true });

    try {
      await api.auth.verifyOtp(email, otpCode);

      // OTP verified, now we need to get the driver token
      // Note: You might need to adjust your backend to return a token after OTP verification
      // For now, we'll store the email and assume they're authenticated
      wx.setStorageSync('email', email);
      wx.setStorageSync('token', 'temp-token'); // Replace with actual token from backend

      util.showSuccess('Login successful');

      setTimeout(() => {
        wx.switchTab({
          url: '/pages/home/home'
        });
      }, 1000);
    } catch (error) {
      util.showError(error.toString());
      this.setData({ loading: false });
    }
  },

  handleChangeEmail() {
    this.setData({
      otpSent: false,
      otpCode: '',
      loading: false
    });
  }
});
