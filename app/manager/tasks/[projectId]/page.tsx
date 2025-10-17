'use client';

import { useParams } from 'next/navigation';
import ManagerTaskManagement from '@/components/ManagerTaskManagement';

export default function TaskManagementPage() {
    const { projectId } = useParams<{ projectId: string }>();
    return <ManagerTaskManagement projectId={projectId} />;
}