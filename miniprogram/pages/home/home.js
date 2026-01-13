// pages/home/home.js
const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    driverName: '',
    driverStatus: '',
    availableAssignments: [],
    loading: true
  },

  onLoad() {
    this.checkLogin();
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  onPullDownRefresh() {
    this.loadData().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  checkLogin() {
    if (!util.isLoggedIn()) {
      wx.reLaunch({
        url: '/pages/login/login'
      });
    }
  },

  async loadData() {
    this.setData({ loading: true });

    try {
      // Load driver profile
      const profile = await api.driver.getProfile();
      if (profile.driverProfile) {
        this.setData({
          driverName: profile.driverProfile.name,
          driverStatus: profile.driverProfile.status
        });

        wx.setStorageSync('userInfo', profile.driverProfile);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }

    try {
      // Load available assignments
      const result = await api.assignment.getAvailable();
      const assignments = result.availableAssignments || [];

      // Format dates
      const formattedAssignments = assignments.map(item => ({
        ...item,
        startTimeFormatted: util.formatDate(item.startTime),
        endTimeFormatted: util.formatDate(item.endTime)
      }));

      this.setData({
        availableAssignments: formattedAssignments,
        loading: false
      });
    } catch (error) {
      console.error('Failed to load assignments:', error);
      util.showError('Failed to load assignments');
      this.setData({ loading: false });
    }
  },

  async handleAccept(e) {
    const id = e.currentTarget.dataset.id;

    wx.showModal({
      title: 'Accept Assignment',
      content: 'Do you want to accept this assignment?',
      success: async (res) => {
        if (res.confirm) {
          util.showLoading('Accepting...');

          try {
            await api.assignment.respondToAssignment(id, 'accepted');
            util.hideLoading();
            util.showSuccess('Assignment accepted');
            this.loadData();
          } catch (error) {
            util.hideLoading();
            util.showError(error.toString());
          }
        }
      }
    });
  },

  async handleDecline(e) {
    const id = e.currentTarget.dataset.id;

    wx.showModal({
      title: 'Decline Assignment',
      content: 'Do you want to decline this assignment?',
      success: async (res) => {
        if (res.confirm) {
          util.showLoading('Declining...');

          try {
            await api.assignment.respondToAssignment(id, 'declined');
            util.hideLoading();
            util.showSuccess('Assignment declined');
            this.loadData();
          } catch (error) {
            util.hideLoading();
            util.showError(error.toString());
          }
        }
      }
    });
  },

  onAssignmentTap(e) {
    const id = e.currentTarget.dataset.id;
    console.log('Assignment tapped:', id);
    // Could navigate to detail page if needed
  },

  goToAssignments() {
    wx.switchTab({
      url: '/pages/assignments/assignments'
    });
  },

  goToHistory() {
    wx.switchTab({
      url: '/pages/history/history'
    });
  }
});
