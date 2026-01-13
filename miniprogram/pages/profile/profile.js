// pages/profile/profile.js
const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    profile: {},
    avatarLetter: '',
    stats: {
      totalAssignments: 0,
      completedAssignments: 0,
      acceptanceRate: 0
    }
  },

  onLoad() {
    this.loadProfile();
    this.loadStats();
  },

  onShow() {
    this.loadProfile();
  },

  onPullDownRefresh() {
    Promise.all([this.loadProfile(), this.loadStats()]).then(() => {
      wx.stopPullDownRefresh();
    });
  },

  async loadProfile() {
    try {
      const result = await api.driver.getProfile();

      if (result.driverProfile) {
        const profile = result.driverProfile;
        const avatarLetter = profile.name ? profile.name.charAt(0).toUpperCase() : 'D';

        this.setData({
          profile,
          avatarLetter
        });

        wx.setStorageSync('userInfo', profile);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      util.showError('Failed to load profile');
    }
  },

  async loadStats() {
    try {
      // Load assignment history to calculate stats
      const result = await api.assignment.getHistory();
      const history = result.assignmentHistory || [];

      const totalAssignments = history.length;
      const completedAssignments = history.filter(
        item => item.status === 'completed'
      ).length;
      const acceptedAssignments = history.filter(
        item => item.response === 'accepted'
      ).length;
      const acceptanceRate = totalAssignments > 0
        ? Math.round((acceptedAssignments / totalAssignments) * 100)
        : 0;

      this.setData({
        stats: {
          totalAssignments,
          completedAssignments,
          acceptanceRate
        }
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  },

  handleEditProfile() {
    wx.showToast({
      title: 'Coming soon',
      icon: 'none'
    });
    // TODO: Navigate to edit profile page
  },

  handleManageAvailability() {
    wx.showToast({
      title: 'Coming soon',
      icon: 'none'
    });
    // TODO: Navigate to availability management page
  },

  handleNotificationSettings() {
    wx.showToast({
      title: 'Coming soon',
      icon: 'none'
    });
    // TODO: Navigate to notification settings page
  },

  handleLogout() {
    wx.showModal({
      title: 'Logout',
      content: 'Are you sure you want to logout?',
      success: (res) => {
        if (res.confirm) {
          util.logout();
        }
      }
    });
  }
});
