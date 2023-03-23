import { useState } from "react";

import styles from "./Task.module.css";

import CheckBox1 from "../../assets/check1.svg";
import CheckBox2 from "../../assets/check2.svg";
import Trash from "../../assets/trash.svg";
import ClipBoard from "../../assets/clipboard.svg";

type Task = {
  content: string;
  onDeleteTask: (task: string) => void;
  handleAddCompletedTasks: (number: number) => void;
};

export function Task({ content, onDeleteTask, handleAddCompletedTasks }: Task) {
  function handleDeleteTask() {
    onDeleteTask(content);

    if (checkBox === CheckBox2) {
      handleAddCompletedTasks(2);
    }
  }

  const [checkBox, setcheckBox] = useState(CheckBox1);

  function handleTasksCompleted() {
    if (checkBox === CheckBox1) {
      setcheckBox(CheckBox2);
      handleAddCompletedTasks(1);
    } else {
      setcheckBox(CheckBox1);
      handleAddCompletedTasks(2);
    }
  }

  if (!content) {
    return (
      <div className={styles.empty}>
        <img src={ClipBoard} alt="Desenho de uma Prancheta" />
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <strong>Crie tarefas e organize seus itens a fazer</strong>
      </div>
    );
  } else {
    return (
      <div className={styles.task}>
        <img
          onClick={handleTasksCompleted}
          src={checkBox}
          alt="Icone de Check Box"
        />

        <p>{content}</p>

        <img onClick={handleDeleteTask} src={Trash} alt="Icone de Lixeira" />
      </div>
    );
  }
}
