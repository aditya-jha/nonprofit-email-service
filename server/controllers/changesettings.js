'use strict'
const _ = require('lodash');
const Settings = require('../db/models/index').Settings;


module.exports =  function(req, res) {
  const settingsToChange = _.pickBy(req.body);

  // Exit if there are no settings to change
  if (_.isEmpty(settingsToChange)) {
    return;
  }
  
  // Should eventually refactor this to use findOneAndSave
  Settings.findOne({}, {}, (err, settings) => {
    if (err) throw err;

    // Create default settings if none exist
    if (!settings) {
      settings = Settings(settingsToChange);
    } else {
      _.keys(settingsToChange).forEach((setting) => {
        settings[setting] = settingsToChange[setting]
      });
    }

    settings.save((err) => {
      if (err) throw err;
      res.json({})
    });
  })
}
