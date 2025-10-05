export const cssTemplate = document.createElement('template')

cssTemplate.innerHTML = `
<style>
   #orderItem {
    display: flex;
    gap: 20px;
    background-color: aqua;
    margin: 10px;
    padding: 10px;
    justify-content: space-evenly;
}

:host {
    background-color: red;
}
</style>`
