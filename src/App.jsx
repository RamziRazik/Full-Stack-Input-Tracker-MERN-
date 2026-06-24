import { useState } from 'react'

function App() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Create the submission handler
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the browser from reloading the entire page

    try {
      //  Make an asynchronous POST request to your local Express server
      const response = await fetch('http://localhost:5000/api/save-input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tells backend we are sending JSON data
        },
        body: JSON.stringify({ textData: inputValue }) // Converts JavaScript object to JSON string
      });

      const data = await response.json();
      console.log('Backend response:', data);

    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      <h2>React Input Tracker V2</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type something..."
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">Submit to Backend</button>
      </form>
      <span><strong>Live Preview:</strong> {inputValue}</span>
    </div>
  );
}

export default App;