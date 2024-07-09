import { Request, Response } from 'express';
import { addTeamMember, getTeamMembers, removeTeamMember } from '../api/teamMemberService';

export const addTeamMemberController = async (req: Request, res: Response) => {
    try {
        const { teamId, userId, role } = req.body;
        const result = await addTeamMember({ teamId, userId, role });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getTeamMembersController = async (req: Request, res: Response) => {
    try {
        const { teamId } = req.params;
        const members = await getTeamMembers(Number(teamId));
        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const removeTeamMemberController = async (req: Request, res: Response) => {
    try {
        const { teamId, userId } = req.body;
        const result = await removeTeamMember(Number(teamId), Number(userId));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
