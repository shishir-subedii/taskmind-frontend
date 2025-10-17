'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserMinus, UserPlus, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { projectRepo } from '@/lib/repo/projectRepo';

interface Manager {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface TeamMember {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    deadline: string;
    status: string;
    assets: string[];
    createdAt: string;
    updatedAt: string;
    tasks: any[];
    manager: Manager | null;
    teamMembers: TeamMember[];
}

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (payload: { name: string; description: string; deadline: string }) => void;
    project: Project | null;
}

export default function ProjectModal({ isOpen, onClose, onSubmit, project }: ProjectModalProps) {
    const [name, setName] = useState(project?.name || '');
    const [description, setDescription] = useState(project?.description || '');
    const [deadline, setDeadline] = useState(
        project?.deadline ? new Date(project.deadline).toISOString().split('T')[0] : ''
    );
    const [managerEmail, setManagerEmail] = useState('');
    const [teamMemberEmail, setTeamMemberEmail] = useState('');

    const handleSubmit = () => {
        if (!name || !description || !deadline) {
            toast.error('Name, description, and deadline are required');
            return;
        }
        onSubmit({ name, description, deadline });
    };

    const handleDeleteProject = () => {
        if (!project) return;
        projectRepo.deleteProject({
            projectId: project.id,
            onSuccess: (message) => {
                toast.success(message);
                onClose();
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    const handleAssignManager = () => {
        if (!project || !managerEmail) {
            toast.error('Project and manager email are required');
            return;
        }
        projectRepo.assignManagerToProject({
            projectId: project.id,
            managerEmail,
            onSuccess: (message) => {
                toast.success(message || `Manager assigned: ${managerEmail}`);
                setManagerEmail('');
                onSubmit({ name, description, deadline }); // Refresh project data
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    const handleAddTeamMember = () => {
        if (!project || !teamMemberEmail) {
            toast.error('Project and team member email are required');
            return;
        }
        projectRepo.addTeamMemberToProject({
            projectId: project.id,
            memberEmail: teamMemberEmail,
            onSuccess: (message) => {
                toast.success(message || `Team member added: ${teamMemberEmail}`);
                setTeamMemberEmail('');
                onSubmit({ name, description, deadline }); // Refresh project data
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    const handleRemoveTeamMember = (memberId: string) => {
        if (!project) {
            toast.error('Project is required');
            return;
        }
        projectRepo.removeTeamMemberFromProject({
            projectId: project.id,
            memberId,
            onSuccess: (message) => {
                toast.success(message || 'Team member removed');
                onSubmit({ name, description, deadline }); // Refresh project data
            },
            onError: (message) => {
                toast.error(message);
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{project ? project.name : 'Create Project'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid gap-4">
                        <h3 className="text-lg font-semibold text-slate-900">Project Details</h3>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="col-span-3"
                                placeholder="Enter project name"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="col-span-3"
                                placeholder="Enter project description"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="deadline" className="text-right">Deadline</Label>
                            <Input
                                id="deadline"
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                className="col-span-3"
                                placeholder="Select deadline"
                            />
                        </div>
                    </div>
                    {project && (
                        <>
                            <div className="grid gap-4">
                                <h3 className="text-lg font-semibold text-slate-900">Manager</h3>
                                <p className="text-sm text-slate-600">
                                    Current: {project.manager?.name || 'Unassigned'} ({project.manager?.email || 'N/A'})
                                </p>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="managerEmail" className="text-right">Manager Email</Label>
                                    <Input
                                        id="managerEmail"
                                        value={managerEmail}
                                        onChange={(e) => setManagerEmail(e.target.value)}
                                        placeholder="Enter Manager Email"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="flex space-x-2">
                                    <Button
                                        className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                                        onClick={handleAssignManager}
                                    >
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Assign Manager
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="cursor-pointer transition-colors duration-300"
                                        disabled
                                    >
                                        <UserMinus className="w-4 h-4 mr-2" />
                                        Remove Manager
                                    </Button>
                                </div>
                            </div>
                            <div className="grid gap-4">
                                <h3 className="text-lg font-semibold text-slate-900">Team Members</h3>
                                <div className="space-y-2">
                                    {project.teamMembers.map((member) => (
                                        <div key={member.id} className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-slate-900">{member.name}</p>
                                                <p className="text-sm text-slate-600">ID: {member.id}</p>
                                                <p className="text-sm text-slate-600">Email: {member.email}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="cursor-pointer text-red-600"
                                                onClick={() => handleRemoveTeamMember(member.id)}
                                            >
                                                <UserMinus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="teamMemberEmail" className="text-right">Add Team Member</Label>
                                    <Input
                                        id="teamMemberEmail"
                                        value={teamMemberEmail}
                                        onChange={(e) => setTeamMemberEmail(e.target.value)}
                                        placeholder="Enter Team Member Email"
                                        className="col-span-3"
                                    />
                                </div>
                                <Button
                                    className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                                    onClick={handleAddTeamMember}
                                >
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Add Team Member
                                </Button>
                            </div>
                            <div className="grid gap-4">
                                <h3 className="text-lg font-semibold text-slate-900">Assets</h3>
                                <p className="text-sm text-slate-600">
                                    {project.assets && project.assets.length ? project.assets.join(', ') : 'No assets'}
                                </p>
                            </div>
                            <div className="grid gap-4">
                                <h3 className="text-lg font-semibold text-slate-900">Metadata</h3>
                                <p className="text-sm text-slate-600">Status: {project.status}</p>
                                <p className="text-sm text-slate-600">Created: {new Date(project.createdAt).toLocaleDateString()}</p>
                                <p className="text-sm text-slate-600">Updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>
                    {project && (
                        <Button
                            variant="destructive"
                            className="cursor-pointer transition-colors duration-300"
                            onClick={handleDeleteProject}
                        >
                            <Trash className="w-4 h-4 mr-2" />
                            Delete Project
                        </Button>
                    )}
                    <Button
                        onClick={handleSubmit}
                        className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
                    >
                        {project ? 'Update Project' : 'Create Project'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}