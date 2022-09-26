import React from "react";
import "./App.css";
import { Content } from "./components/Content";
import { Course } from "./components/Course";
import { Header } from "./components/Header";
import { Notes } from "./components/Notes/Notes";
import { Part } from "./components/Part";
import { SumExercise } from "./components/SumExercise";
import { TelephoneGuide } from "./components/TelephoneGuide";
import { Countries } from "./components/Countries";

function App(props) {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };
  const sum = course.parts.reduce((prev, curr) => prev + curr.exercises, 0);

  return (
    <div className="App">
      <Notes />

      {/* <Course>
        <Header title={"Half stack application development"} />
        <Content>
          {course.parts.map(({ name, exercises, id }) => (
            <Part key={id} name={name} exercises={exercises} />
          ))}{" "}
          <SumExercise sum={sum} />
        </Content>
      </Course> */}

      <TelephoneGuide />
      <Countries />
    </div>
  );
}

export default App;
