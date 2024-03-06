import { useState } from "react";
import NewProject from "./component/NewProject";
import NoProject from "./component/NoProject";
import ProjectsSidebar from "./component/ProjectsSidebar";
import SelectedProject from "./component/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProject: undefined,

    projects: [],
    tasks: [],
  });

  function handlerAddTasks(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTasks = {
        text: text,
        projectId: prevState.selectedProject,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTasks],
      };
    });
  }

  function handlerDeleteTasks(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((tasks) => tasks.id !== id),
      };
    });
  }

  function handlerStartAddProjects() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: null,
      };
    });
  }
  function handlerCancelButton() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
      };
    });
  }
  function handlerSelectedProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: id,
      };
    });
  }

  function onDelete() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: prevState.projects.filter(
          (projects) => projects.id != prevState.selectedProject
        ),
      };
    });
  }

  function handlerAddProject(projectData) {
    const newProject = {
      ...projectData,
      id: Math.random(),
    };

    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProject: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  const selectedProjectId = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProject
  );

  let content = (
    <SelectedProject
      project={selectedProjectId}
      onDelete={onDelete}
      onDeleteTasks={handlerDeleteTasks}
      onAddTasks={handlerAddTasks}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProject === null) {
    content = (
      <NewProject onAdd={handlerAddProject} onCancel={handlerCancelButton} />
    );
  } else if (projectsState.selectedProject === undefined) {
    content = <NoProject onStartAddProject={handlerStartAddProjects} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        project={projectsState.projects}
        onStartAddProject={handlerStartAddProjects}
        onSelectedProject={handlerSelectedProject}
        selectedProject={projectsState.selectedProject}
      />
      {content}
    </main>
  );
}

export default App;
