import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import { Header } from "./components/Header/Header";
import { Task } from "./components/Task/Task";

import styles from "./App.module.css";

import AddCircle from "./assets/add_circle.svg";

export function App() {
  const [tasks, setTasks] = useState<string[]>([]);

  const [newTasksText, setNewTasksText] = useState<string>("");

  const [completedTasks, setCompletedTasks] = useState<number>(0);

  function handleCreateNewTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTasks([...tasks, newTasksText]);
    setNewTasksText("");
  }

  function handleNewTasksChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTasksText(event.target.value);
  }

  function handleNewTasksInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório!");
  }

  function deleteTask(tasksToDelete: string) {
    const tasksWithoutDeleteOne = tasks.filter((task) => {
      return task !== tasksToDelete;
    });

    setTasks(tasksWithoutDeleteOne);
  }

  function handleAddCompletedTasks(number: number) {
    if (number === 1) {
      setCompletedTasks(completedTasks + 1);
    } else {
      setCompletedTasks(completedTasks - 1);
    }
  }

  const isNewTaskEmpty = newTasksText.length === 0;

  return (
    <div>
      <Header />
      <main className={styles.mainContet}>
        <form onSubmit={handleCreateNewTask} className={styles.newTask}>
          <input
            type="text"
            name="textTask"
            value={newTasksText}
            onChange={handleNewTasksChange}
            placeholder="Adicione uma nova tarefa"
            onInvalid={handleNewTasksInvalid}
            required={true}
          />
          <button type="submit" disabled={isNewTaskEmpty}>
            Criar
            <img src={AddCircle} alt="Add Circle" />
          </button>
        </form>
        <div className={styles.statusTasks}>
          <strong>
            Tarefas criadas <small>{tasks.length}</small>
          </strong>
          <strong>
            Concluídas <small>{completedTasks}</small>
          </strong>
        </div>
        <div className={styles.registeredTasks}>
          {tasks.length > 0 ? (
            tasks.map((content) => {
              return (
                <Task
                  key={content}
                  content={content}
                  onDeleteTask={deleteTask}
                  handleAddCompletedTasks={handleAddCompletedTasks}
                />
              );
            })
          ) : (
            <Task
              content={""}
              onDeleteTask={deleteTask}
              handleAddCompletedTasks={handleAddCompletedTasks}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
