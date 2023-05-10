const { User, Thought} = require('../models')

//(GET) all thoughts
module.exports = {
    async getThoughts(req, res){
        try{
        const thoughts = await Thought.find();
        res.json(thoughts);
        } catch(err){
            res.status(500).json(err);
        }
    },
    //(GET) single thought by id
    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.id });
          !thought
            ? res.status(404).json({ message: "No thought with that ID" })
            : res.json(thought);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

    //(POST)create new thought
    createThought(req, res) {
        Thought.create(req.body)
          .then(({ _id }) => {
            return User.findOneAndUpdate( { _id: req.body.userId }, { $push: { thoughts: _id } }, { new: true } );
          })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No User found with this ID!" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

    //(PUT) update thought by id
    async updateThought(req, res){
        try{
            const thought = await Thought.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new: true, runValidators: true}
            );
            if (!thought) return res.status(404).json({message: 'No thought found with that ID'});
            res.json(thought)
        }
        catch(err){
            res.status(500).json(err);
        }
    },

    //post thought by id
    async postReaction(req, res){
        try{
            const thought = await Thought.findOne({_id: req.params.id});
            if (!thought) return res.status(400).json({message: 'No thought found with that ID'});

            await Thought.findByIdAndUpdate(thought._id, {
                $push: {reactions: req.body}
            })
            res.json(req.body);
        }
        catch(err){
            res.status(500).json(err);
        }
    },


    //(REMOVE) delete thought by id
    async deleteThought(req, res){
        try{
            const thought = await Thought.findOneAndRemove({_id: req.params.id})
            if (!thought) return res.status(400).json({message: 'No thought found with that ID'})
            res.json({message: 'Thought deleted'})
        }
        catch(err){
            res.status(500).json(err);
        }
    },
};