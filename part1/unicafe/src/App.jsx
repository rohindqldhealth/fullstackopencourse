import { useState } from "react";

const Statistics = (props) => {
  const { good, neutral, bad } = props;
  const all = good + neutral + bad;
  return (
    <table>
      <tr>
        <td>good</td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{all}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{(good - bad) / all}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{(good / all) * 100} %</td>
      </tr>
    </table>
  );
};

const Feedback = (props) => {
  const { setGood, setNeutral, setBad } = props;
  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood((good) => good + 1)}>good</button>
      <button onClick={() => setNeutral((neutral) => neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad((bad) => bad + 1)}>bad</button>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const hasFeedback = good > 0 || neutral > 0 || bad > 0;
  return (
    <div>
      <Feedback setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
      {hasFeedback ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
