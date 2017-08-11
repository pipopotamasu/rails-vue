class ListsController < ApplicationController
  def create
    List.bulk_create(lists_params)
    render json: :created
  end

  def all
    render json: List.all
  end

  private

  def lists_params
    params.require(:lists).map do |list|
      list.permit(:title, :order, cards_attributes: [:name, :order, :list_id])
    end
  end
end
