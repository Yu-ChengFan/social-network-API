const { user, thought } = require('../models');

const userController = {
    getAllUser(req, res) {
        user.find({})
        .then(data => res.json(data))
        .catch(err => {
            res.status(500).json(err)
        })
    },

    getUserById({ params }, res) {
        user.findOne({ _id: params.id })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No user found with that ID!' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.status(500).json(err));
    },

    createUser({ body }, res) {
        user.create(body)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
    },

    updateUser({ param, body }, res){
        user.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No user found with that ID.' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteUser({ params }, res) {
        user.findOneAndDelete({ _id: params.id })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No user found with that ID.' });
                return;
            }
            return thought.deleteMany({ _id: { $in: data.thoughts }})
            .then(data => res.json(data))
            .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
    },

    addFriend({ params }, res) {
        user.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.fid }}, {new: true})
        .then (data => {
            if (!data) {
                res.status(404).json({ message: 'No user found with that ID!' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteFriend({ params }, res) {
        user.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.fid }}, { new: true })
        .then(data => {
            if (!data) {
                res.status(404).json({ message: 'No user found with that ID!' });
                return;
            }
            res.json(data);
        })
        .catch(err => res.status(500).json(err));
    }
}

module.exports = userController