import Project from "./project.model";
import Task from "./task.model";
import User from "./user.model";

User.hasMany(Project, { foreignKey: "userId" });
Project.belongsTo(User, { foreignKey: "userId" });

Project.hasMany(Task, { foreignKey: "projectId" });
Task.belongsTo(Project, { foreignKey: "projectId" });

export { User, Project, Task };
