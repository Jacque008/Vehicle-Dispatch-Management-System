// pages/assignments/assignments.js
const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    activeTab: 'available',
    assignments: [],
    loading: true
  },

  onLoad() {
    this.loadAssignments();
  },

  onShow() {
    this.loadAssignments();
  },

  onPullDownRefresh() {
    this.loadAssignments().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ activeTab: tab });
    this.loadAssignments();
  },

  async loadAssignments() {
    this.setData({ loading: true });

    try {
      const { activeTab } = this.data;
      let result;

      if (activeTab === 'available') {
        result = await api.assignment.getAvailable();
        var assignments = result.availableAssignments || [];
      } else {
        result = await api.assignment.getMyAssignments();
        var assignments = result.myAssignments || [];
      }

      // Format dates
      const formattedAssignments = assignments.map(item => ({
        ...item,
        startTimeFormatted: util.formatDate(item.startTime),
        endTimeFormatted: util.formatDate(item.endTime)
      }));

      this.setData({
        assignments: formattedAssignments,
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
            this.loadAssignments();
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
            this.loadAssignments();
          } catch (error) {
            util.hideLoading();
            util.showError(error.toString());
          }
        }
      }
    });
  }
});
