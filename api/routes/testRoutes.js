'use strict';
module.exports = function(app) {
  var test = require('../controllers/testControllers');


  // test Routes
  app.route('/tasks')
    .get(test.list_all_tasks)
    .post(test.create_a_task);


  app.route('/tasks/:taskId')
    .get(test.read_a_task)
    .put(test.update_a_task)
    .delete(test.delete_a_task);
};