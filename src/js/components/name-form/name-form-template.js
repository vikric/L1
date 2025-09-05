const template = document.createElement('template')
template.innerHTML = `
  <style>
    form {
      margin-top: 10px;
    }
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
  <button type="submit">Click me!</button>
</form>
`
export { template }
