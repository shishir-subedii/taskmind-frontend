// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { UserMinus, UserPlus } from 'lucide-react';
// import { toast } from 'sonner';
// import { useState, useEffect } from 'react';
// import { projectRepo } from '@/lib/repo/projectRepo';

// interface TeamMember {
//     id: string;
//     name: string;
//     email: string;
//     role: string;
//     createdAt: string;
//     updatedAt: string;
// }

// export default function ProjectManagerTeam() {
//     const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
//     const [managerEmail, setManagerEmail] = useState('');
//     const [projectId, setProjectId] = useState('');
//     const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

//     const fetchTeam = async () => {
//         // Simulated API call for team members
//         const mockTeam = [
//             { id: '23b1f1d4-8c3a-4e2b-9f1e-123456789abc', name: 'Member', email: 'member@taskmind.com', role: 'MEMBER', createdAt: '2025-10-13', updatedAt: '2025-10-13' },
//             { id: '721407ac-a5ae-40a5-a44c-f1008ed1887d', name: 'Shishir Subedi', email: 'shishirsubedi116@gmail.com', role: 'MEMBER', createdAt: '2025-10-13', updatedAt: '2025-10-17' },
//             { id: 'cbef1bd4-47a0-4a82-bcaf-3d241e9a8cf2', name: 'John Doe', email: 'shishirsubedi562@gmail.com', role: 'MEMBER', createdAt: '2025-10-13', updatedAt: '2025-10-13' },
//         ];
//         setTeamMembers(mockTeam);
//         toast.success('Team members fetched successfully');
//     };

//     const handleAssignManager = () => {
//         if (!projectId || !managerEmail) {
//             toast.error('Project ID and manager email are required');
//             return;
//         }
//         projectRepo.updateProject({
//             projectId,
//             payload: { managerEmail },
//             onSuccess: (message) => {
//                 toast.success(`Manager assigned: ${managerEmail}`);
//                 setManagerEmail('');
//                 setProjectId('');
//             },
//             onError: (message) => {
//                 toast.error(message);
//             },
//         });
//     };

//     const handleRemoveManager = () => {
        
//     };

//     const handleToggleTeamMember = (memberId: string) => {
//         if (!projectId) {
//             toast.error('Project ID is required');
//             return;
//         }
//         const updatedIds = selectedMemberIds.includes(memberId)
//             ? selectedMemberIds.filter((id) => id !== memberId)
//             : [...selectedMemberIds, memberId];
//         setSelectedMemberIds(updatedIds);

//         projectRepo.updateProject({
//             projectId,
//             payload: { teamMemberIds: updatedIds },
//             onSuccess: (message) => {
//                 toast.success('Team members updated');
//             },
//             onError: (message) => {
//                 toast.error(message);
//             },
//         });
//     };

//     useEffect(() => {
//         fetchTeam();
//     }, []);

//     return (
//         <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-slate-900">Team Management</h2>
//             <div className="grid gap-6 md:grid-cols-2">
//                 <Card className="transition-shadow duration-300 hover:shadow-lg hover:border-slate-300">
//                     <CardHeader>
//                         <CardTitle className="text-slate-900">Team Members</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-4">
//                             {teamMembers.map((member) => (
//                                 <div key={member.id} className="flex items-center justify-between">
//                                     <div>
//                                         <p className="text-sm text-slate-900">{member.name}</p>
//                                         <p className="text-sm text-slate-600">ID: {member.id}</p>
//                                         <p className="text-sm text-slate-600">Email: {member.email}</p>
//                                     </div>
//                                     <Button
//                                         variant={selectedMemberIds.includes(member.id) ? 'default' : 'outline'}
//                                         className="cursor-pointer transition-colors duration-300"
//                                         onClick={() => handleToggleTeamMember(member.id)}
//                                     >
//                                         {selectedMemberIds.includes(member.id) ? 'Remove' : 'Add'}
//                                     </Button>
//                                 </div>
//                             ))}
//                         </div>
//                     </CardContent>
//                 </Card>
//                 <Card className="transition-shadow duration-300 hover:shadow-lg hover:border-slate-300">
//                     <CardHeader>
//                         <CardTitle className="text-slate-900">Manage Project Manager</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-4">
//                             <div>
//                                 <Label htmlFor="projectId">Project ID</Label>
//                                 <Input
//                                     id="projectId"
//                                     value={projectId}
//                                     onChange={(e) => setProjectId(e.target.value)}
//                                     placeholder="Enter Project ID"
//                                 />
//                             </div>
//                             <div>
//                                 <Label htmlFor="managerEmail">Manager Email</Label>
//                                 <Input
//                                     id="managerEmail"
//                                     value={managerEmail}
//                                     onChange={(e) => setManagerEmail(e.target.value)}
//                                     placeholder="Enter Manager Email"
//                                 />
//                             </div>
//                             <div className="flex space-x-2">
//                                 <Button
//                                     className="cursor-pointer bg-slate-800 hover:bg-slate-900 transition-colors duration-300"
//                                     onClick={handleAssignManager}
//                                 >
//                                     <UserPlus className="w-4 h-4 mr-2" />
//                                     Assign Manager
//                                 </Button>
//                                 <Button
//                                     variant="destructive"
//                                     className="cursor-pointer transition-colors duration-300"
//                                     onClick={handleRemoveManager}
//                                 >
//                                     <UserMinus className="w-4 h-4 mr-2" />
//                                     Remove Manager
//                                 </Button>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }