// const mongoose = require('mongoose');
// const authSchema = require('./auth.model');

// authSchema.statics = {
//   create: function (data) {
//     return new Promise((resolve, reject) => {
//       const user = new this(data);
//       user.save()
//         .then(result => resolve(result))
//         .catch(error => reject(error));
//     });
//   },
//   login: function (query, cb) {
//     this.find(query, cb);
//   },
// };

// const authModel = mongoose.model('Users', authSchema);
// module.exports = authModel;


