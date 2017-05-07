const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice', { logging: false });

const User = db.define('user', {
  first: {
    type: Sequelize.STRING,
    allowNull: false
  },
  last: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 18
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  bio: {
    type: Sequelize.TEXT
  }
}, {
  getterMethods: {
    fullName: function(){
      return this.first + " " + this.last;
    }
  },
  instanceMethods: {
    haveBirthday: function(){
      this.age = this.age + 1;
      return User.findOne({
        where: {
          first: 'DB'
        }
      })
    .then(function (foundUser) {
      console.log(foundUser.age)
      foundUser.age = 43;
      return foundUser.save()
    });
    }
  }
});

module.exports = User;
