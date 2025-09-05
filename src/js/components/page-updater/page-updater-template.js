import '../name-form/index.js'
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .container {
      padding: 10px;
      border: solid;
      border-radius: 10px;
      max-width: 700px;
      margin: auto;
	    background: rgba(214, 185, 151, 1);
      }
  </style>
  <div class="container">
    <name-form></name-form>
    <div class="message">

      <pre></pre>
    </div>
    <h2></h2>
  </div>

`
export { template }
