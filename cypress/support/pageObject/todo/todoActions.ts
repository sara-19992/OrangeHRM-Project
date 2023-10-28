export default class todoList {

    elemnts = {
        newTodoInput: () => cy.get('.new-todo'),
        todoItems: () => cy.get('ul.todo-list li'),
        deleteTodoIcon: () => cy.get('.'),
        fiilterTodoButs: () => cy.get('ul.filters li'),
        clearCopmletedBut: () => cy.get('.clear-completed'),


    }

    verifyTodoLength(length: number) {
        this.elemnts.todoItems().should('have.length', length)
    }

    verifyTodoContain(todo: string) {
        this.elemnts.todoItems().contains(todo)
    }

    newTodo(todo: string) {
        this.elemnts.newTodoInput().type(`${todo}{enter}`)
        //assert new todo is added 
        this.verifyTodoLength(3)
        this.verifyTodoContain(todo)
    }

    deleteTodo(todo: string) {
        this.elemnts.todoItems().contains('li', todo).find('.destroy').invoke('show').click()
        //assert todo is deleted
        this.verifyTodoLength(1)
    }

    editTodo(todo: string, newTodo: string) {
        this.elemnts.todoItems().contains('li', todo).dblclick().type(`${newTodo}{enter}`)
    }

    filterTodo(filter: string) {
        this.elemnts.fiilterTodoButs().contains('a', filter).click()
    }

    completeTodo(todo: string) {
        this.elemnts.todoItems().contains('li', todo).find('.toggle').click()
    }

    unCompleteTodo(todo: string) {
        //toggle complete todo
        this.completeTodo(todo)
    }

    clearCompleteTodo() {
        this.elemnts.clearCopmletedBut().click()
    }
}