import { useGood, useNeutral, useBad } from "../store"



const Statistics = () => {
  const { value: good } = useGood()
  const { value: neutral } = useNeutral()
  const { value: bad } = useBad()
  const all = good + bad + neutral
  const average = all !== 0 ? (good - bad) / all : 0
  const positive = all !== 0 ? good * 100 / all : 0

  return (
    <div>
      <h2>statistics</h2>
      {all ? <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average.toFixed(2)}</td></tr>
          <tr><td>positive</td><td>{positive.toFixed(2)}%</td></tr>
        </tbody>
      </table>
        :
        <p>No feedback given</p>
      }
    </div>
  )
}

export default Statistics
