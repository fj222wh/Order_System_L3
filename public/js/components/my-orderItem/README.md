# &lt;my-quiz&gt;

A web component for my quiz designed to display quiz questions dynamically. This component supports both multiple-choice (radio buttons) and text-answer questions (text input fields). It dispatches custom events when the user interacts with it.

## Methods
`CreateInputElements(data)`
Generates input elements for the quiz based on the provided data.

**Parameters**
`data`: An object containg all the data and its options. If `data.alternatives` is found it will render all of the alternatives, minimum of 2 and a maximum of 10 options.

**Clear**
Clears all of the child elements in the option container, resetting the component.


## Events
`answerSubmitted`: A custom event dispatches when the user submits an answer

## Example
```html
<my-quiz-question></my-quiz-question>
```
![Example](./images/example.gif)
