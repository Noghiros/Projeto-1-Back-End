// controllers/groupController.js

const Group = require('../models/groupModel');
const fs = require('fs');

function logError(error) {
  fs.appendFile('error.log', `${new Date().toISOString()} - ${error}\n`, (err) => {
    if (err) console.error('Erro ao escrever no log:', err);
  });
}

module.exports = {
  async createGroup(name, members) {
    try {
      const group = new Group({ name, members });
      return await group.save();
    } catch (error) {
      logError(error);
      throw error;
    }
  },

  async listGroups() {
    try {
      return await Group.find().populate('members');
    } catch (error) {
      logError(error);
      throw error;
    }
  },

  async deleteGroup(groupId) {
    try {
      return await Group.findByIdAndDelete(groupId);
    } catch (error) {
      logError(error);
      throw error;
    }
  }
};
