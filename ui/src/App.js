
import './App.css';
import { useQuery, gql } from '@apollo/client';
import Todo from './Todo'
import AddToDo from './AddToDo'
export const TODOS_QUERY = gql`
  query TODOS_QUERY {
    todos {
      title
      id
    }
  }
`

const App = () => {

  const {data, loading, error } = useQuery(TODOS_QUERY)


  if(loading) {
    return <div>Loading...</div>
   } 

  return (
    <div className="App">
      <header className="App-header">
        <AddToDo />
        <ul>
          { data.todos.map((todo)=>{
            return <Todo key={todo.key} id={todo.id} title={todo.title} />
          })}
        </ul>
        
      </header>
    </div>
  );
}

export default App;
