const mongoose = require('mongoose');

const poepleSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, trim: true, lowercase: true },
		mobile: { type: String, required: true },
		password: { type: String, required: true },
		avatar: { type: String },
		role: { type: String, enum: ['user', 'admin'], default: 'user' },
	},
	{
		timestamps: true,
	},
);

const Poeple = mongoose.model('People', poepleSchema);
module.exports = Poeple;