const fs = require('fs');
const { errorHandlerPageNotFound } = require('./tourController');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, 'utf-8')
);

// GET ALL USERS
exports.allUsers = (req, res) => {
  const time = new Date().toISOString();
  res.status(200).json({
    status: 'success',
    time,
    userCount: users.length,
    data: {
      message: users
    }
  });
};
// GET A USER
exports.getUser = (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user._id === id);
  if (!user) return errorHandlerPageNotFound(res);
  // console.log(user);
  res.status(200).json({
    status: 'success',
    lenght: users.length,
    user
  });
};
// CREATE A NEW USER
exports.creatNewUser = (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  res.status(200).json({
    status: 'success',
    data: {
      message: 'success'
    }
  });
};
// UPDATE A USER
exports.updateUser = (req, res) => {
  const { name, email, role } = req.body;
  const { id } = req.params;
  const user = users.find(user => user._id === id);
  if (!user) return errorHandlerPageNotFound();
  const updatedUser = users.map(el => {
    console.log('************** el', el);
    if (el._id === id) {
      return { ...el, name, email, role };
    }
    return el;
  });
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(updatedUser),
    err => {
      if (err) return errorHandlerPageNotFound(res);
    }
  );

  res.status(200).json({
    status: 'Updated',
    data: { ...users[user], name, email, role }
  });
};
// DELETE A USER
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const filteredUsers = users.filter(user => user._id !== id);

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(filteredUsers),
    err => {
      if (err) return errorHandlerPageNotFound(res);
    }
  );

  res.status(200).json({
    status: 'user deleted',
    data: {
      message: { ...filteredUsers }
    }
  });
};
