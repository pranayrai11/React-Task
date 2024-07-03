// src/App.tsx
import React, { useEffect, useState } from 'react';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css';
import './App.css'; 

interface Project {
  id: number;
  name: string;
}

interface WBS {
  id: number;
  name: string;
  projectId: number;
}

interface Task {
  id: number;
  name: string;
  projectId: number;
  wbsId: number;
}

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [wbsList, setWbsList] = useState<WBS[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('/project.json')
      .then(response => response.json())
      .then(data => setProjects(data));

    fetch('/wbs.json')
      .then(response => response.json())
      .then(data => setWbsList(data));

    fetch('/task.json')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  return (
    <div>
      
      {projects.map(project => (
        <TreeView key={project.id} nodeLabel={project.name} defaultCollapsed={false} >
          {wbsList
            .filter(wbs => wbs.projectId === project.id)
            .map(wbs => (
              <TreeView key={wbs.id} nodeLabel={wbs.name} defaultCollapsed={false}>
                <ul className="tasks">
                  {tasks
                    .filter(task => task.wbsId === wbs.id)
                    .map(task => (
                      <li key={task.id} >{task.name}</li>
                    ))}
                </ul>
              </TreeView>
            ))}
        </TreeView>
      ))}
    </div>
  );
}

export default App;
