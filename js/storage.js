var KEY = 'ningluosi-progress';

function load() {
  var data = null;

  try {
    if (typeof wx !== 'undefined' && wx.getStorageSync) {
      data = wx.getStorageSync(KEY);
    }
  } catch (err) {
    data = null;
  }

  if (!data || typeof data !== 'object') {
    return { level: 1, clearedAll: false };
  }

  var level = parseInt(data.level, 10);
  if (!(level >= 1 && level <= 8)) {
    level = 1;
  }

  return {
    level: level,
    clearedAll: data.clearedAll === true
  };
}

function save(progress) {
  try {
    if (typeof wx !== 'undefined' && wx.setStorageSync) {
      wx.setStorageSync(KEY, {
        level: progress.level,
        clearedAll: progress.clearedAll === true
      });
    }
  } catch (err) {}
}

module.exports = {
  load: load,
  save: save
};
