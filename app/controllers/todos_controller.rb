class TodosController < ApplicationController
  def index
  end

  def create
    Todo.create(todo_params)
    render json: :created
  end

  private

  def todo_params
    params.require(:todo).permit(:body)
  end
end
