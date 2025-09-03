const template = document.createElement('template')
template.innerHTML = `
  <style>
    button, input {
      padding: 10px;
      border: solid;
      border-radius: 10px;
      }
    button:active {
      background-color: grey;
      }
  </style>
    <form>
  <input type="text" id="name" name="name" placeholder="Enter your name" required="name">
  <button type="submit">Submit</button>
</form>
`
export { template }
