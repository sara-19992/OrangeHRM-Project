import todoList from "../../../support/pageObject/todo/todoActions"

const myTodo: todoList = new todoList()

describe('Todo List Functinality', () => {

    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo')
    })

    it('Verify default todo length equal 2', () => {
        cy.get('ul.todo-list li').should('have.length', 2)
    })

    it('Add new todo', () => {
        myTodo.newTodo('Do Sport')
    })

    it('Delete todo', () => {
        myTodo.deleteTodo('Pay electric bill')
    })

    it('Edit Todo', () => {
        myTodo.editTodo('Pay electric bill', ' edited')
    })

    it('Complete todo', () => {
        myTodo.completeTodo('Pay electric bill')
    })

    it('Un complete todo', () => {
        myTodo.completeTodo('Pay electric bill')
        myTodo.unCompleteTodo('Pay electric bill')
    })

    it('Clear Complete todo', () => {
        myTodo.completeTodo('Pay electric bill')
        myTodo.clearCompleteTodo()
    })

    it('Filter Todo', () => {
        myTodo.completeTodo('Pay electric bill')
        myTodo.filterTodo('Active')
        myTodo.filterTodo('Completed')
        myTodo.filterTodo('All')
    })

})