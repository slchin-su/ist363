import './App.css'
    const students = [{suid: 123456, name: 'Sue Flay', year: 'senior', major: 'Applied Data Analytics'}, {suid: 234567, name: 'Ella Vader', year: 'junior', major: 'Information Management and Technology'}, {suid: 345678, name: 'Chris P Bacon', year: 'junior', major: 'Innovation, Society and Technology'}];     
    function App() {
    return (
      <div>
          <h1>Students</h1>
          <Students />
          <MyButton 
          myMessage="Hello this is my message."
          />
          <FilterSue />
      </div>
    );
  }  

  // Question 5 - Filtering
function FilterSue() {
  const output = 
        students.filter(students => students.name == 'Sue Flay');
            return (
            <div>
              <ul>
                {
                output.map(function(students){
                  return <li key={students.suid}>Name: {students.name}<br></br>
                  Year: {students.year}<br></br>
                  Major: {students.major}
                  </li>

                })}          
              </ul>
            </div>
          );
        }

// Question 3
  function Students() {
    return (
      <div>
        <ul>
          {
            students.map(function(students) {
            return <li key={students.suid}>Name: {students.name}<br></br>
            Year: {students.year}<br></br>
            Major: {students.major}
            </li>;
          })}
        </ul>
      </div>
    );
    }

// Question 4 - Event Handling
    function MyButton({myMessage}) {
      const message = () => {
        console.log({myMessage});
      }
      return (
        <button onClick={message}>Click Me!</button>
      );
    }
  export default App;


    
// Questions 1. & 2.
//     return (
//       <div>
//           <h1>Students</h1>
//           <ul>
//             {
//               students.map(function(students) {
//               return <li key={students.suid}>Name: {students.name}<br></br>
//               Year: {students.year}<br></br>
//               Major: {students.major}
//               </li>;
//             })}
//           </ul>
//       </div>
//     );

