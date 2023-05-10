const { User, Thought} = require('../models')

//(GET) all users function
module.exports = {
    async getUsers(req, res){
        try{
        const users = await User.find()
        res.json(users)
        }
        catch(err){
            res.status(500).json(err)
        }
    },

 //(GET) single user by id
    getSingleUser(req, res) {
     User.findOne({ _id: req.body._id })
        .select('-__v')
        .then(async (user) =>
            !user
                ? res.status(404).json({ message: 'No user found with that ID!' })
                : res.json({ user })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

 //(POST) create user    
    createUser(req, res) {
     User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
    },
  
 //(PUT) update user   
    async updateUser(req, res){
        try{
              const user = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true, runValidators: true}
            );
            if (!user) return res.status(404).json({message: 'No user with that ID'});
            res.json(user)
        }
        catch(err){
            res.status(500).json(err);
        }
    },

 //(DELETE) user
    updateUser({ params, body }, res) {
     User.findOneAndUpdate({ _id: params.id }, body, { new: true ,runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with that ID' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
    },

 //(POST) add new friend to user's friend  
    addFriend(req, res) {
     User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true } )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User found with that ID" })
          : res.json(user))
      .catch((err) => res.status(500).json(err));
  },

 //(DELETE) friend from user's friend list
    removeFriend(req, res) {
     User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendsId: req.params.friendsId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No users found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};