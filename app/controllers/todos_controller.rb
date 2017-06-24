class TodosController < ApplicationController
  def index
  end

  def create
    Todo.create(todo_params)
    render json: :created
  end

  def destroy
    Todo.find(params[:id]).destroy
    render json: :deleted
  end

  def all
    render json: Todo.all
  end

  private

  def todo_params
    params.require(:todo).permit(:body)
  end
end
