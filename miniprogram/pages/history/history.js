// pages/history/history.js
const api = require('../../utils/api');
const util = require('../../utils/util');

Page({
  data: {
    history: [],
    loading: true
  },

  onLoad() {
    this.loadHistory();
  },

  onShow() {
    this.loadHistory();
  },

  onPullDownRefresh() {
    this.loadHistory().then(() => {
      wx.stopPullDownRefresh();
    });
  },

  async loadHistory() {
    this.setData({ loading: true });

    try {
      const result = await api.assignment.getHistory();
      const history = result.assignmentHistory || [];

      // Format dates and calculate duration
      const formattedHistory = history.map(item => {
        const startTime = new Date(item.startTime);
        const endTime = new Date(item.endTime);
        const durationMs = endTime - startTime;
        const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
        const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

        return {
          ...item,
          startTimeFormatted: util.formatDate(item.startTime),
          endTimeFormatted: util.formatDate(item.endTime),
          completedAtFormatted: item.completedAt ? util.formatDate(item.completedAt) : null,
          duration: `${durationHours}h ${durationMinutes}m`
        };
      });

      this.setData({
        history: formattedHistory,
        loading: false
      });
    } catch (error) {
      console.error('Failed to load history:', error);
      util.showError('Failed to load history');
      this.setData({ loading: false });
    }
  }
});
