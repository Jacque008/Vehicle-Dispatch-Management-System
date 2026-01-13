/**
 * API utility for GraphQL communication
 */

const app = getApp();

// GraphQL request helper
function graphqlRequest(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token');

    wx.request({
      url: app.globalData.apiUrl,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      data: {
        query,
        variables
      },
      success(res) {
        if (res.statusCode === 200) {
          if (res.data.errors) {
            reject(res.data.errors[0].message);
          } else {
            resolve(res.data.data);
          }
        } else {
          reject('Network error');
        }
      },
      fail(err) {
        reject(err.errMsg || 'Request failed');
      }
    });
  });
}

// Authentication APIs
const auth = {
  sendOtp(email) {
    const query = `
      mutation SendOtp($email: String!) {
        sendOtp(email: $email) {
          success
          message
        }
      }
    `;
    return graphqlRequest(query, { email });
  },

  verifyOtp(email, code) {
    const query = `
      mutation VerifyOtp($email: String!, $code: String!) {
        verifyOtp(email: $email, code: $code)
      }
    `;
    return graphqlRequest(query, { email, code });
  },

  getMe() {
    const query = `
      query Me {
        me
      }
    `;
    return graphqlRequest(query);
  }
};

// Driver APIs
const driver = {
  getProfile() {
    const query = `
      query GetDriverProfile {
        driverProfile {
          id
          email
          phone
          name
          status
          licenseNumber
        }
      }
    `;
    return graphqlRequest(query);
  },

  updateProfile(data) {
    const query = `
      mutation UpdateDriverProfile($data: UpdateDriverInput!) {
        updateDriver(data: $data) {
          id
          name
          phone
        }
      }
    `;
    return graphqlRequest(query, { data });
  }
};

// Assignment APIs
const assignment = {
  getAvailable() {
    const query = `
      query GetAvailableAssignments {
        availableAssignments {
          id
          title
          description
          startTime
          endTime
          status
        }
      }
    `;
    return graphqlRequest(query);
  },

  getMyAssignments() {
    const query = `
      query GetMyAssignments {
        myAssignments {
          id
          title
          description
          startTime
          endTime
          status
        }
      }
    `;
    return graphqlRequest(query);
  },

  respondToAssignment(assignmentId, response) {
    const query = `
      mutation RespondToAssignment($assignmentId: String!, $response: String!) {
        respondToAssignment(assignmentId: $assignmentId, response: $response) {
          id
          response
          respondedAt
        }
      }
    `;
    return graphqlRequest(query, { assignmentId, response });
  },

  getHistory() {
    const query = `
      query GetAssignmentHistory {
        assignmentHistory {
          id
          title
          description
          startTime
          endTime
          status
          response
          completedAt
        }
      }
    `;
    return graphqlRequest(query);
  }
};

// Availability APIs
const availability = {
  getSlots() {
    const query = `
      query GetAvailabilitySlots {
        myAvailability {
          id
          startTime
          endTime
        }
      }
    `;
    return graphqlRequest(query);
  },

  addSlot(startTime, endTime) {
    const query = `
      mutation AddAvailabilitySlot($startTime: DateTime!, $endTime: DateTime!) {
        addAvailabilitySlot(startTime: $startTime, endTime: $endTime) {
          id
          startTime
          endTime
        }
      }
    `;
    return graphqlRequest(query, { startTime, endTime });
  },

  removeSlot(slotId) {
    const query = `
      mutation RemoveAvailabilitySlot($slotId: String!) {
        removeAvailabilitySlot(slotId: $slotId)
      }
    `;
    return graphqlRequest(query, { slotId });
  }
};

module.exports = {
  auth,
  driver,
  assignment,
  availability
};
