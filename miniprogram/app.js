// App entry point
App({
  globalData: {
    userInfo: null,
    token: null,
    apiUrl: 'http://localhost:3000/graphql' // Change this for production
  },

  onLaunch() {
    console.log('Vehicle Dispatch Mini Program launched');

    // Check if user is already logged in
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');

    if (token && userInfo) {
      this.globalData.token = token;
      this.globalData.userInfo = userInfo;
    } else {
      // Redirect to login
      wx.reLaunch({
        url: '/pages/login/login'
      });
    }
  },

  onShow() {
    console.log('App shown');
  },

  onHide() {
    console.log('App hidden');
  }
});
