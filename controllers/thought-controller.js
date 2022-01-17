const { user, thought } = require('../models');

const thoughtController = {
    getAllThougths(req, res) {
        thought.find({})
        .then(dbthought => res.json(dbthought))
        .catch(err => {
            res.status(400).json(err)
        })
    },

    getThoughtById({ params }, res) {
        thought.findOne({_id: params.id})
        .then(dbthought=> {
            if(!dbthought){
                res.status(404).json({ message: 'No thought found with ID.' })
                return;
            }
            res.json(dbthought)
        })
        .catch(err => res.status(404).json(err));
    },

    createThought({ body }, res) {
        thought.create(body)
        .then(({_id}) => {
            return user.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id }}, { new: true });
        })
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
    },

    updateThought({ params, body }, res) {
        thought.findOneAndUpdate({_id: params.id }, body, { new: true })
        .then(data => {
            if(!data){
                res.status(404).json({message: 'No thought found with ID.'})
                return
            }
            res.json(data);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteThought({ params }, res) {
        thought.findOneAndDelete({ _id: params.id })
        .then((data) => {
            if(!data) {
                res.status(404).json({message: 'No thought found with ID.'})
                return
            }
            return user.findOneAndUpdate({ username: data.username }, { $pull: { thougths: params.id }}, { new: true })
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
    },

    createReaction({ params, body }, res) {
        thought.findOneAndUpdate({_id: params.id }, { $push: { reactions: body }}, { new: true })
        .then(data => {
            if(!data){
                res.status(404).json({ message: 'No thought found with ID.'});
                return;
            }
            res.json(data);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteReaction({ params }, res) {
        thought.findOneAndUpdate({ _id: params.id }, { $push: {reactions: {reactionId: params.rid}} }, {new: true})
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No thought found with that ID!' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.status(500).json(err));
    }
}

module.exports = thoughtController;