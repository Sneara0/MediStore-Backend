"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const profileService_js_1 = require("../services/profileService.js");
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await (0, profileService_js_1.getProfileService)(userId);
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updated = await (0, profileService_js_1.updateProfileService)(userId, req.body);
        res.json({ message: "Profile updated", user: updated });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.updateProfile = updateProfile;
