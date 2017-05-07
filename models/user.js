const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice');

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
    haveBirthday: function(user){
      //return a promise, means this needs to be a ".then"
      // return this.set('age',this.age + 1)
      // this.save();
      this.age = this.age + 1;
      return User.sync()
      .then(function(age){
        console.log("new age: "),
        console.log("some error")
      })
      //the promise resolves to the user's new age
      //save the user's new age
    }
  }
// ...AND HERE
});

module.exports = User;
