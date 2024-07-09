import express from 'express';
import {
    addTeamMemberController,
    getTeamMembersController,
    removeTeamMemberController
} from '../controllers/teamMemberController';

const router = express.Router();

router.post('/team-members', addTeamMemberController);
router.get('/teams/:teamId/members', getTeamMembersController);
router.delete('/team-members', removeTeamMemberController);

export default router;
