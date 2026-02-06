import { getProfileService, updateProfileService } from "../services/profileService";
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await getProfileService(userId);
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updated = await updateProfileService(userId, req.body);
        res.json({ message: "Profile updated", user: updated });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
//# sourceMappingURL=profileController.js.map