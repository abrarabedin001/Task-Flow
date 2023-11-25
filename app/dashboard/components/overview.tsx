
// OverviewPage.tsx

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/app/dashboard/tasks/components/data-table';
import { columns } from '@/app/dashboard/tasks/components/columns';
import { OverviewTasks } from '@/Database/firestore/firebaseDb';
import { useUserStore } from '@/Store/userStore';

export default function OverviewPage() {
  const teamId: any = useUserStore((state) => state.currrentTeam?.value);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    if (teamId) {
      OverviewTasks(teamId).then((res) => {
        setTasks(res);console.log('tasks',tasks)
      });
    } else {
      setTasks([]);
    }
  }, [teamId]);

  return (
<>
  <div className="flex h-full flex-1 flex-col p-8">
    <div className="overflow-x-auto">
      <table className="custom-table text-gray-700 dark:text-silver-700">
        <thead>
          <tr>
            <th className="owtable-header">Title</th>
            <th className="owtable-header">Priority</th>
            <th className="owtable-header">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((tasks, index) => (
            <tr key={index}>
              <td className="text-center owtable-header">{tasks.title}</td>
              <td className="text-center owtable-header">{tasks.priority}</td>
              <td className="text-center owtable-header">{tasks.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</>
  );
}
