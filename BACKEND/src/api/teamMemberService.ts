import db from '../config/dbConfig';

interface TeamMember {
    teamId: number;
    userId: number;
    role: string;
}

export const addTeamMember = async (member: TeamMember) => {
    const [result] = await db.execute(
        'INSERT INTO team_members (team_id, user_id, role) VALUES (?, ?, ?)',
        [member.teamId, member.userId, member.role]
    );
    return result;
};

export const getTeamMembers = async (teamId: number) => {
    const [rows] = await db.execute(
        'SELECT * FROM team_members WHERE team_id = ?',
        [teamId]
    );
    return rows;
};

export const removeTeamMember = async (teamId: number, userId: number) => {
    const [result] = await db.execute(
        'DELETE FROM team_members WHERE team_id = ? AND user_id = ?',
        [teamId, userId]
    );
    return result;
};
